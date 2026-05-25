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
 * @version  2.0.0
 * @author Antonio Francisco Cutillas García
 * 
 * - Plugin SPA para cargar contenido dinámico en layouts definidos.
 * - Soporta dos modos: eager loading (routes array) y lazy loading (routeManifest + routeModules).
 * - Usa `import.meta.glob` de Vite para lazy loading compatible con producción.
 * - Respeta transiciones de View Transition si el navegador lo soporta.
 * - Carga dinámicamente componentes JS en los layouts definidos
 * - Solo soporta scripts de tipo función directa
 * - Maneja estilos dinámicos y actualización de history
 * 
 * @param {Partial<ConfigOptionsSPA>} options - Opciones de configuración del plugin
 */

export const spaLoaderContentForVite = (options = {}) => {


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
     * - Set para evitar recargar varias veces el mismo stylesheet
     * @type {Set<string>}
     */

    const _loadedStyles = new Set();


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
     * - Obtiene la entrada 404 del manifest.
     * @returns {RouteManifest|undefined}
     */
    const findNotFoundRoute = () => {

        return settings.routeManifest?.find(entry =>
            entry?.id === '404NotFoundPage' ||
            normalizePath(entry?.path) === '404' ||
            normalizePath(entry?.path) === '404-not-found' ||
            /404/i.test(String(entry?.id || ''))
        );

    };


    /**
     * - Carga la ruta 404 dinámicamente desde el manifest.
     * @param {'init'|'click'|'popstate'} source - Origen del intento de carga
     */
    const loadNotFoundRoute = async (source) => {

        const entry404 = findNotFoundRoute();

        if (!entry404) {
            console.error(`No existe ruta 404 configurada (source: ${source}).`);
            return;
        }

        const route = await loadRouteModule(entry404.file);

        if (route) {
            await loadContent(route);
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

        let link = document.querySelector('link[rel~="icon"]');

        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/x-icon';
            document.head.appendChild(link);
        }

        link.href = `${favicon}?t=${Date.now()}`;
    };


    /**
     * -----------------------------------
     * -----  Carga hoja de estilos  -----
     * -----------------------------------
     * @param {string} href
     * @returns {Promise<void>}
     */

    const loadStylesheet = async (href) => {
        if (!href || _loadedStyles.has(href)) return;

        if (!document.querySelector(`link[href*="${href}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `${href}?t=${Date.now()}`;
            document.head.appendChild(link);
        }

        _loadedStyles.add(href);
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

                const $headerTitle = document.querySelector('#headerTitle');

                if ($headerTitle && route.headerTitle) {
                    $headerTitle.innerHTML = route.headerTitle;
                }

                if (el)
                    container.appendChild(el);

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
     * @param {Function} [afterDOMInserted]
     */

    const loadContentDOM = (route, afterDOMInserted) => {

        if (!route)
            throw new Error('loadContentDOM: route inválida');

        renderComponent(route, settings.layoutHeader, route.LayoutHeaderComponent);
        renderComponent(route, settings.layoutNavbar, route.LayoutNavbarComponent);
        renderComponent(route, settings.layoutMain, route.LayoutMainComponent);
        renderComponent(route, settings.layoutFooter, route.LayoutFooterComponent);

        if (typeof afterDOMInserted === 'function') afterDOMInserted();
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

        if (!route)
            throw new Error('loadContent: route inválida');

        const runScripts = async () => {
            
            if (route.scripts) {
                try { 
                    await processScriptsList(route.scripts); 
                }
                catch (e) { 
                    console.error('❌ Error ejecutando scripts:', e); 
                }
            }
        };


        if (document.startViewTransition) 
            document.startViewTransition(() => loadContentDOM(route, () => runScripts()));
        else 
            loadContentDOM(route, () => runScripts());
        

        document.title = route.pageTitle || 'Página sin título';
        updateFavicon(route.favicon);

        document.body.setAttribute('data-route-id', route.id || '');

        if (route.styles) {
            try { await loadStylesheet(route.styles); }
            catch (e) { console.error(e); }
        }

        if (pushHistory) {
            const newUrl = getRouteBrowserPath(route.path);
            const currentPath = window.location.pathname;
            
            if (currentPath !== newUrl) {
                history.pushState({ path: newUrl }, '', newUrl);
            }
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

            if (!(e.target instanceof Element))
                return;

            const link = e.target.closest('a[data-id]');

            if (!link)
                return;

            e.preventDefault();

            const route = settings.routes.find(r => r.id === link.dataset.id);
            
            if (route) 
                loadContent(route, true).catch(console.error);

        });


        window.addEventListener('popstate', (e) => {
            
            const path = stripBaseFromPath(e.state?.path || window.location.pathname);
            const route = settings.routes.find(r => normalizePath(r.path) === path);
            
            if (route) 
                loadContent(route, false).catch(console.error);
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

            if (!(e.target instanceof Element))
                return;

            const link = e.target.closest('a[data-id]');

            if (!link)
                return;

            e.preventDefault();

            const entry = settings.routeManifest?.find(r => r.id === link.dataset.id);
            
            if (entry) {
                loadRouteModule(entry.file)
                    .then(route => {
                        if (route) {
                            return loadContent(route, true);
                        }
                    })
                    .catch(console.error);
            }

        });


        window.addEventListener('popstate', (e) => {
            
            const path = stripBaseFromPath(e.state?.path || window.location.pathname);
            const entry = settings.routeManifest?.find(r => normalizePath(r.path) === path);
            
            if (entry) {
                loadRouteModule(entry.file)
                    .then(route => {
                        if (route) {
                            return loadContent(route, false);
                        }
                    })
                    .catch(console.error);
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

        const initialPath = stripBaseFromPath(window.location.pathname);
        const initialRoute = settings.routes.find(r => normalizePath(r.path) === initialPath);

        if (initialRoute) 
            loadContent(initialRoute, false).catch(console.error);
        
        const canonicalInitialUrl = initialRoute
            ? getRouteBrowserPath(initialRoute.path)
            : window.location.pathname;

        history.replaceState({ path: canonicalInitialUrl }, '', canonicalInitialUrl);

        setupEventListeners();

    };


    /**
     * -----------------------------------
     * -----  Inicializa el plugin  -----
     * -----  (modo lazy loading)  -----
     * -----------------------------------
     */

    const initLazy = async () => {
        
        console.warn('✅ Plugin SPA cargado correctamente (lazy loading con import.meta.glob)');

        const initialEntry = findManifestEntryByPath(window.location.pathname);

        if (initialEntry) {
            const route = await loadRouteModule(initialEntry.file);

            if (route) {
                await loadContent(route, false);
                
                const canonicalInitialUrl = getRouteBrowserPath(route.path);
                history.replaceState(
                    { id: route.id, path: canonicalInitialUrl, routeFile: initialEntry.file }, 
                    '', 
                    canonicalInitialUrl
                );
            } else {
                await loadNotFoundRoute('init');
            }
        } else {
            await loadNotFoundRoute('init');
            
            history.replaceState(
                { id: null, path: window.location.pathname },
                '',
                window.location.pathname
            );
        }

        setupLazyEventListeners();

    };


    if (useLazyLoading) {
        initLazy();
    } else {
        init();
    }


};
