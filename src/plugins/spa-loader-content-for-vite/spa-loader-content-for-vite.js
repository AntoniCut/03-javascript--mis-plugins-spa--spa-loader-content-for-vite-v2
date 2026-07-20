/* 
    ----------------------------------------------------- 
    ---------- javascript.antonydev.tech  ---------------
    ---------- /src/plugins/ ---------------------------- 
    ---------- /spa-loader-content-for-vite/ ------------ 
    ---------- /spa-loader-content-for-vite.js ---------- 
    ----------------------------------------------------- 
*/


/** @typedef {import('../../types/config-option-spa-types.js').ConfigOptionsSPA} ConfigOptionsSPA */
/** @typedef {import('../../types/route-types.js').Route} Route */
/** @typedef {import('../../types/route-manifest-types.js').RouteManifest} RouteManifest */


/**
 * -------------------------------------
 * ----- spaLoaderContentForVite() -----
 * -------------------------------------
 * @version  2.1.0
 * @author Antonio Francisco Cutillas García
 * 
 * - Plugin SPA para cargar contenido dinámico en layouts definidos.
 * - Soporta dos modos: eager loading (routes array) y lazy loading (routeManifest + routeModules).
 * - Usa `import.meta.glob` de Vite para lazy loading compatible con producción.
 * - Respeta transiciones de View Transition si el navegador lo soporta.
 * - Carga dinámicamente componentes JS en los layouts definidos
 * - Solo soporta scripts de tipo función directa
 * - Maneja estilos dinámicos (swap por página) y actualización de history
 * - Emite eventos: spa:route-loaded, spa:first-route-loaded, spa:route-load-error
 * 
 * @param {Partial<ConfigOptionsSPA>} options - Opciones de configuración del plugin
 */

export const spaLoaderContentForVite = (options = {}) => {


    /** @type {Window & { __spaFirstRouteLoaded?: boolean }} */
    const browserWindow = window;


    /** Indica si la navegación es por popstate (atrás/adelante) */
    let isPopNavigation = false;


    /**
     * Clave de cache-busting ESTABLE durante la sesión (solo para favicon no hasheado).
     * No se aplica a CSS de Vite (ya lleva hash en la URL).
     */
    const _faviconSessionKey = Date.now();


    /**
     * - Configuración por defecto del plugin
     * @type {ConfigOptionsSPA}
     */
    const settings = {
        routes: [],
        routeManifest: [],
        routeModules: {},
        base: '',
        layoutHeader: '#layoutHeader',
        layoutNavbar: '#layoutNavbar',
        layoutMain: '#layoutMain',
        layoutFooter: '#layoutFooter',
        ...options
    };


    /**
     * - Cache de módulos de ruta ya importados dinámicamente (solo para lazy loading)
     * @type {Map<string, Route>}
     */
    const routeCache = new Map();


    /**
     * - Indica si se usa el modo lazy loading con manifest
     * @type {boolean}
     */
    const useLazyLoading = Array.isArray(settings.routeManifest) && settings.routeManifest.length > 0 && typeof settings.routeModules === 'object' && Object.keys(settings.routeModules).length > 0;


    /**
     * - Normaliza un path dejando "/" inicial y sin slash final (excepto raíz "/")
     * @param {string} path
     * @returns {string}
     */

    const normalizePath = (path = '/') => {

        let normalizedPath = `${path}`.trim();

        if (!normalizedPath) {
            normalizedPath = '/';
        }

        normalizedPath = normalizedPath.replace(/\/+/g, '/');

        if (!normalizedPath.startsWith('/')) {
            normalizedPath = `/${normalizedPath}`;
        }

        if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
            normalizedPath = normalizedPath.slice(0, -1);
        }

        return normalizedPath;
    };


    /**
     * - Normaliza el base path removiendo slash final (excepto raíz).
     * @param {string} basePath
     * @returns {string}
     */
    const normalizeBasePath = (basePath = '') => {

        let normalizedBasePath = `${basePath}`.trim();

        if (!normalizedBasePath || normalizedBasePath === '/') {
            return '';
        }

        if (!normalizedBasePath.startsWith('/')) {
            normalizedBasePath = `/${normalizedBasePath}`;
        }

        if (normalizedBasePath.endsWith('/')) {
            normalizedBasePath = normalizedBasePath.slice(0, -1);
        }

        return normalizedBasePath;
    };


    settings.base = normalizeBasePath(settings.base);
    settings.routes = (Array.isArray(settings.routes) ? settings.routes : []).map(route => ({
        ...route,
        path: normalizePath(route.path || '/'),
    }));


    /**
     * - Elimina el `base` del path recibido para compararlo contra rutas internas.
     * @param {string} path
     * @returns {string}
     */
    const stripBaseFromPath = (path = '/') => {

        const normalizedInputPath = normalizePath(path);

        if (!settings.base) {
            return normalizedInputPath;
        }

        const normalizedBasePath = normalizePath(settings.base);

        if (normalizedInputPath === normalizedBasePath) {
            return '/';
        }

        if (normalizedInputPath.startsWith(`${normalizedBasePath}/`)) {
            return normalizePath(normalizedInputPath.slice(normalizedBasePath.length));
        }

        return normalizedInputPath;
    };


    /**
     * - Construye la URL de navegador para una ruta.
     * @param {string} routePath
     * @returns {string}
     */
    const getRouteBrowserPath = (routePath = '/') => {

        const normalizedRoutePath = normalizePath(routePath);

        if (!settings.base) {
            return normalizedRoutePath;
        }

        if (normalizedRoutePath === '/') {
            return settings.base;
        }

        return `${settings.base}${normalizedRoutePath}`;
    };


    /**
     * --------------------------------------
     * -----  Lazy Loading Functions  -----
     * --------------------------------------
     */


    /**
     * - Busca una entrada en el manifest por path normalizado.
     * @param {string} rawPathname - Pathname sin normalizar
     * @returns {RouteManifest|undefined}
     */
    const findManifestEntryByPath = (rawPathname = '/') => {

        const normalized = stripBaseFromPath(rawPathname);

        return settings.routeManifest?.find(entry => normalizePath(entry.path) === normalized);

    };


    /**
     * - Busca una entrada en el manifest por id.
     * @param {string} id - Identificador de la ruta
     * @returns {RouteManifest|undefined}
     */
    const findManifestEntryById = (id) => {

        return settings.routeManifest?.find(entry => entry.id === id);

    };


    /**
     * - Importa dinámicamente un módulo de ruta usando el glob map de Vite.
     * @param {string} file - Nombre del archivo de ruta sin extensión
     * @returns {Promise<Route|undefined>}
     */
    const loadRouteModule = async (file) => {

        if (routeCache.has(file)) {
            return routeCache.get(file);
        }

        try {

            const globKey = `./${file}.js`;

            const importFn = settings.routeModules[globKey];

            if (!importFn) {
                console.error(`❌ Módulo de ruta no encontrado en glob: ${globKey}`);
                return undefined;
            }

            const mod = await importFn();

            const route = Object.values(mod)[0];

            if (route) {
                routeCache.set(file, route);
            }

            console.log(`📦 Ruta cargada dinámicamente: ${file}`);

            return route;

        } catch (e) {
            console.error(`❌ Error importando módulo de ruta: ${file}`, e);
            return undefined;
        }

    };


    /**
     * - Obtiene la entrada 404 del manifest (lazy) o de routes (eager).
     * @returns {{ id: string, path: string, file?: string, route?: Route }|undefined}
     */
    const findNotFoundRoute = () => {

        if (useLazyLoading) {
            return settings.routeManifest?.find(entry =>
                entry?.id === '404NotFoundPage' ||
                normalizePath(entry?.path) === '404' ||
                normalizePath(entry?.path) === '404-not-found' ||
                /404/i.test(String(entry?.id || ''))
            );
        }

        const route = settings.routes.find(r =>
            r?.id === '404NotFoundPage' ||
            normalizePath(r?.path) === '/404' ||
            normalizePath(r?.path) === '/404-not-found' ||
            /404/i.test(String(r?.id || ''))
        );

        return route ? { id: route.id, path: route.path, route } : undefined;

    };


    /**
     * - Carga la ruta 404 dinámicamente desde el manifest o routes.
     * @param {'init'|'click'|'popstate'} source - Origen del intento de carga
     */
    const loadNotFoundRoute = async (source) => {

        const entry404 = findNotFoundRoute();

        if (!entry404) {
            console.error(`No existe ruta 404 configurada (source: ${source}).`);
            notifyRouteLoadError(undefined, new Error('No existe ruta 404 configurada.'), source);
            return;
        }

        const pushHistory = source === 'click';

        try {
            if (useLazyLoading && entry404.file) {
                const route = await loadRouteModule(entry404.file);

                if (route) {
                    await loadContent(route, pushHistory);
                } else {
                    notifyRouteLoadError(undefined, new Error('No se pudo importar la ruta 404.'), source);
                }
            } else if (entry404.route) {
                await loadContent(entry404.route, pushHistory);
            } else {
                notifyRouteLoadError(undefined, new Error('No se pudo cargar la ruta 404.'), source);
            }
        } catch (error) {
            notifyRouteLoadError(undefined, error, source);
        }

    };


    /**
     * ----------------------------------------
     * -----  `notifyRouteLoaded(route)`  -----
     * ----------------------------------------
     * @param {Route} route
     */
    const notifyRouteLoaded = (route) => {

        document.dispatchEvent(
            new CustomEvent('spa:route-loaded', {
                detail: {
                    id: route?.id || null,
                    path: route?.path || window.location.pathname
                }
            })
        );

        if (!browserWindow.__spaFirstRouteLoaded) {
            browserWindow.__spaFirstRouteLoaded = true;
            document.dispatchEvent(new CustomEvent('spa:first-route-loaded'));
        }

    };


    /**
     * ----------------------------------------------------------
     * -----  `notifyRouteLoadError(route, error, source)`  -----
     * ----------------------------------------------------------
     * @param {Route|undefined} route
     * @param {unknown} error
     * @param {string} source
     */
    const notifyRouteLoadError = (route, error, source) => {

        console.error('❌ Error cargando ruta SPA:', error);

        document.dispatchEvent(
            new CustomEvent('spa:route-load-error', {
                detail: {
                    id: route?.id || null,
                    path: route?.path || window.location.pathname,
                    source,
                    message: error instanceof Error ? error.message : String(error || 'Error desconocido')
                }
            })
        );

        if (!browserWindow.__spaFirstRouteLoaded) {
            browserWindow.__spaFirstRouteLoaded = true;
            document.dispatchEvent(new CustomEvent('spa:first-route-loaded'));
        }

    };


    /**
     * ----------------------------------
     * -----  Actualiza el favicon  -----
     * ----------------------------------
     * @param {string} favicon
     */

    const updateFavicon = (favicon) => {
        if (!favicon) return;

        const newAbsolute = new URL(favicon, document.baseURI).href;
        const newHref = `${favicon}?v=${_faviconSessionKey}`;

        /** @type {HTMLLinkElement|null} */
        const existing = /** @type {HTMLLinkElement|null} */ (document.querySelector('link[rel~="icon"]'));

        if (existing) {
            if (existing.href.split('?')[0] === newAbsolute) {
                return;
            }

            existing.href = newHref;

            document.querySelectorAll('link[rel~="icon"]').forEach(link => {
                if (link !== existing) {
                    link.remove();
                }
            });

            return;
        }

        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/x-icon';
        link.href = newHref;
        document.head.appendChild(link);
    };


    /**
     * -------------------------------------------
     * -----  `addTitleHeaderFooter(title)`  -----
     * -------------------------------------------
     * @param {string} title
     */
    const addTitleHeaderFooter = (title) => {

        const headerTitle = document.querySelector('#layoutHeader #headerTitle');
        if (headerTitle) {
            headerTitle.innerHTML = title;
        }

        const footerTitle = document.querySelector('#layoutFooter #footerTitle');
        if (footerTitle) {
            footerTitle.innerHTML = title;
        }

    };


    /**
     * ---------------------------------------------
     * -----  `loadStylesheetsByPage(href)`  -----
     * ---------------------------------------------
     * - Swap de estilos por página (marca data-page-style).
     * - Sin cache-bust: las URLs de Vite ya llevan hash.
     * @param {string|null|undefined} href
     */
    const loadStylesheetsByPage = (href) => {

        document.querySelectorAll('link[data-page-style="true"]').forEach(l => l.remove());

        if (!href) {
            return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.dataset.pageStyle = 'true';
        document.head.appendChild(link);

    };


    /**
     * ----------------------------------
     * -----  Procesa un script  -------
     * ----------------------------------
     * @param {Function} scriptEntry
     * @returns {Promise<void>}
     */

    const processScriptEntry = async (scriptEntry) => {

        if (typeof scriptEntry === 'function') {

            try {
                const res = scriptEntry();
                if (res instanceof Promise) await res;
            } catch (e) {
                console.error('❌ Error ejecutando función script:', e);
            }
        }
    };


    /**
     * --------------------------------------
     * -----  Procesa lista de scripts  -----
     * --------------------------------------
     * @param {Function[]} scripts
     * @returns {Promise<void>}
     */

    const processScriptsList = async (scripts) => {

        if (!scripts || !Array.isArray(scripts)) return;

        for (const s of scripts) {
            await processScriptEntry(s);
        }
    };


    /**
     * --------------------------------------
     * -----  Renderiza un componente  -----
     * --------------------------------------
     * @param {Route} route
     * @param {string} selector
     * @param {(() => void)|undefined} Component
     */

    const renderComponent = (route, selector, Component) => {

        const container = document.querySelector(selector);

        if (container && typeof Component === 'function') {

            container.innerHTML = '';

            try {

                const el = Component();

                if (el) {
                    container.appendChild(el);
                }

            } catch (e) {
                console.error(`❌ Error renderizando componente en ${selector}:`, e);
            }
        }
    };


    /**
     * --------------------------------------
     * -----  Carga contenido DOM  ---------
     * --------------------------------------
     * @param {Route} route
     */

    const loadContentDOM = (route) => {

        if (!route) {
            throw new Error('loadContentDOM: route inválida');
        }

        renderComponent(route, settings.layoutHeader, route.LayoutHeaderComponent);
        renderComponent(route, settings.layoutNavbar, route.LayoutNavbarComponent);
        renderComponent(route, settings.layoutMain, route.LayoutMainComponent);
        renderComponent(route, settings.layoutFooter, route.LayoutFooterComponent);
    };


    /**
     * - Construye el state del history para una ruta.
     * @param {Route} route
     * @param {string} browserPath
     * @returns {{ id: string|null, path: string, routeFile: string|null, favicon: string|null }}
     */
    const buildHistoryState = (route, browserPath) => {

        const manifestEntry = route?.id ? findManifestEntryById(route.id) : undefined;

        return {
            id: route?.id || null,
            path: browserPath,
            routeFile: manifestEntry?.file || null,
            favicon: route?.favicon || null,
        };
    };


    /**
     * --------------------------------------
     * -----  Carga el contenido  ---------
     * --------------------------------------
     * @param {Route} route
     * @param {boolean} [pushHistory=true]
     * @returns {Promise<void>}
     */

    const loadContent = async (route, pushHistory = true) => {

        if (!route) {
            throw new Error('loadContent: route inválida');
        }

        try {

            /** @type {Promise<void>} */
            let domPromise;

            if (document.startViewTransition) {
                const viewTransition = document.startViewTransition(() => {
                    loadContentDOM(route);
                });
                domPromise = viewTransition?.finished || Promise.resolve();
            } else {
                loadContentDOM(route);
                domPromise = Promise.resolve();
            }

            await domPromise;

            document.title = route.pageTitle || 'Página sin título';
            updateFavicon(route.favicon);
            document.body.setAttribute('data-route-id', route.id || '');

            if (route.headerTitle) {
                addTitleHeaderFooter(route.headerTitle);
            }

            loadStylesheetsByPage(route.styles);

            if (route.scripts) {
                try {
                    await processScriptsList(route.scripts);
                } catch (e) {
                    console.error('❌ Error ejecutando scripts:', e);
                }
            }

            const shouldPush = pushHistory && !isPopNavigation;
            const newUrl = getRouteBrowserPath(route.path);
            const currentPath = window.location.pathname;

            if (shouldPush && currentPath !== newUrl) {
                history.pushState(buildHistoryState(route, newUrl), '', newUrl);
            }

            isPopNavigation = false;

            notifyRouteLoaded(route);

        } catch (error) {
            isPopNavigation = false;
            notifyRouteLoadError(route, error, 'loadContent');
            throw error;
        }

    };


    /**
     * -----------------------------------
     * -----  Configura eventos SPA  -----
     * -----  (modo eager loading)  -----
     * -----------------------------------
     */
    const setupEventListeners = () => {

        document.addEventListener('click', (e) => {

            if (!(e.target instanceof Element)) {
                return;
            }

            const link = e.target.closest('a[data-id]');

            if (!link) {
                return;
            }

            e.preventDefault();

            const route = settings.routes.find(r => r.id === link.dataset.id);

            if (route) {
                loadContent(route, true).catch(console.error);
            } else {
                loadNotFoundRoute('click').catch(console.error);
            }

        });


        window.addEventListener('popstate', (e) => {

            isPopNavigation = true;

            if (e.state?.favicon) {
                updateFavicon(e.state.favicon);
            }

            const path = stripBaseFromPath(e.state?.path || window.location.pathname);
            const route = settings.routes.find(r => normalizePath(r.path) === path);

            if (route) {
                loadContent(route, false).catch(console.error);
            } else {
                loadNotFoundRoute('popstate').catch(console.error);
            }
        });

    };


    /**
     * -----------------------------------
     * -----  Configura eventos SPA  -----
     * -----  (modo lazy loading)  -----
     * -----------------------------------
     */
    const setupLazyEventListeners = () => {

        document.addEventListener('click', (e) => {

            if (!(e.target instanceof Element)) {
                return;
            }

            const link = e.target.closest('a[data-id]');

            if (!link) {
                return;
            }

            e.preventDefault();

            const routeFile = link.dataset.route;
            const routeId = link.dataset.id;

            if (routeFile) {
                loadRouteModule(routeFile)
                    .then(route => {
                        if (route) {
                            return loadContent(route, true);
                        }
                        return loadNotFoundRoute('click');
                    })
                    .catch(() => loadNotFoundRoute('click'));
            } else if (routeId) {
                const entry = findManifestEntryById(routeId);

                if (entry) {
                    loadRouteModule(entry.file)
                        .then(route => {
                            if (route) {
                                return loadContent(route, true);
                            }
                            return loadNotFoundRoute('click');
                        })
                        .catch(() => loadNotFoundRoute('click'));
                } else {
                    loadNotFoundRoute('click').catch(console.error);
                }
            }

        });


        window.addEventListener('popstate', (e) => {

            isPopNavigation = true;

            if (e.state?.favicon) {
                updateFavicon(e.state.favicon);
            }

            const routeFile = e.state?.routeFile;
            const raw = e.state?.path ?? window.location.pathname;

            if (routeFile) {
                loadRouteModule(routeFile)
                    .then(route => {
                        if (route) {
                            return loadContent(route, false);
                        }
                        return loadNotFoundRoute('popstate');
                    })
                    .catch(() => loadNotFoundRoute('popstate'));
            } else {
                const entry = findManifestEntryByPath(raw);

                if (entry) {
                    loadRouteModule(entry.file)
                        .then(route => {
                            if (route) {
                                return loadContent(route, false);
                            }
                            return loadNotFoundRoute('popstate');
                        })
                        .catch(() => loadNotFoundRoute('popstate'));
                } else {
                    loadNotFoundRoute('popstate').catch(console.error);
                }
            }
        });

    };


    /**
     * -----------------------------------
     * -----  Inicializa el plugin  -----
     * -----  (modo eager loading)  -----
     * -----------------------------------
     */

    const init = () => {

        console.warn('✅ Plugin SPA cargado correctamente (eager loading)');

        setupEventListeners();

        const initialPath = stripBaseFromPath(window.location.pathname);
        const initialRoute = settings.routes.find(r => normalizePath(r.path) === initialPath);

        if (initialRoute) {
            loadContent(initialRoute, false)
                .then(() => {
                    const canonicalInitialUrl = getRouteBrowserPath(initialRoute.path);
                    history.replaceState(
                        buildHistoryState(initialRoute, canonicalInitialUrl),
                        '',
                        canonicalInitialUrl
                    );
                })
                .catch(console.error);
        } else {
            loadNotFoundRoute('init')
                .then(() => {
                    history.replaceState(
                        { id: null, path: window.location.pathname, routeFile: null, favicon: null },
                        '',
                        window.location.pathname
                    );
                })
                .catch(console.error);
        }

    };


    /**
     * -----------------------------------
     * -----  Inicializa el plugin  -----
     * -----  (modo lazy loading)  -----
     * -----------------------------------
     */

    const initLazy = async () => {

        console.warn('✅ Plugin SPA cargado correctamente (lazy loading con import.meta.glob)');

        setupLazyEventListeners();

        const initialEntry = findManifestEntryByPath(window.location.pathname);

        if (initialEntry) {
            try {
                const route = await loadRouteModule(initialEntry.file);

                if (route) {
                    await loadContent(route, false);

                    const canonicalInitialUrl = getRouteBrowserPath(route.path);
                    history.replaceState(
                        buildHistoryState(route, canonicalInitialUrl),
                        '',
                        canonicalInitialUrl
                    );
                } else {
                    await loadNotFoundRoute('init');
                }
            } catch (error) {
                notifyRouteLoadError(undefined, error, 'init');
                await loadNotFoundRoute('init');
            }
        } else {
            await loadNotFoundRoute('init');

            history.replaceState(
                { id: null, path: window.location.pathname, routeFile: null, favicon: null },
                '',
                window.location.pathname
            );
        }

    };


    if (useLazyLoading) {
        initLazy();
    } else {
        init();
    }


};
