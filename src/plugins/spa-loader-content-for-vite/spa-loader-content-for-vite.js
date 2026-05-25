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


/**
 * -------------------------------------
 * ----- spaLoaderContentForVite() -----
 * -------------------------------------
 * @version  1.0.0
 * @author Antonio Francisco Cutillas García
 * 
 * - Plugin SPA para cargar contenido dinámico en layouts definidos.
 * - Respeta transiciones de View Transition si el navegador lo soporta.
 * - Carga dinámicamente componentes JS en los layouts definidos
 * - Solo soporta scripts de tipo función directa
 * - Respeta transiciones de View Transition si el navegador lo soporta
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
     * - Normaliza un path dejando "/" inicial y sin slash final (excepto raíz "/")
     * @param {string} path
     * @returns {string}
     */

    const normalizePath = (path = '/') => {

        let normalizedPath = `${path}`.trim();

        if (!normalizedPath) {
            normalizedPath = '/';
        }

        // Evita barras duplicadas consecutivas en los paths.
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


    // Normaliza `base` y todos los `path` de `routes` dentro del plugin.
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
     * - Mantiene slash final solo para la home cuando existe `base` (requisito de Vite en dev).
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
     * ----------------------------------
     * -----  Actualiza el favicon  -----
     * ----------------------------------
     * 
     * `updateFavicon`
     * - Actualiza el favicon de la página
     * @param {string} favicon
     */

    const updateFavicon = (favicon) => {
        if (!favicon) return;

        /** @type {HTMLLinkElement|null} */
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
     * `loadStylesheet`
     * - Carga una hoja de estilos en el documento
     * - Retorna una promesa que resuelve cuando el link ha sido añadido (no espera a que la hoja cargue)
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
     * 
     * `processScriptEntry`
     * 
     * - Procesa un script de la lista
     * - Solo ejecuta funciones directas (sync o async)
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
     * 
     * `processScriptsList`
     * 
     * - Procesa una lista de scripts en orden
     * - Ejecuta funciones directas respetando orden y await si devuelven Promise
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
     * 
     * `renderComponent`
     * 
     * - Renderiza un componente en un selector dado
     * @param {Route} route
     * @param {string} selector
     * @param {(() => void)|undefined} Component
     */

    const renderComponent = (route, selector, Component) => {

        const container = document.querySelector(selector);

        if (container && typeof Component === 'function') {

            container.innerHTML = '';

            try {

                /** @type {any} - Renderiza el componente */
                const el = Component();

                /** @type {HTMLHeadingElement|null} - Actualiza el título del header si existe y la ruta define headerTitle */
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
     * 
     * `loadContentDOM`
     * 
     * - Inserta los componentes de la ruta en los contenedores del layout
     * - Llama a un callback opcional después de insertar el DOM
     * @param {Route} route
     * @param {Function} [afterDOMInserted] - Callback opcional
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
     * 
     * `loadContent`
     * 
     * - Función principal que carga el contenido de una ruta
     * - Scripts se ejecutan justo después de insertar el DOM
     * @param {Route} route
     * @param {boolean} [pushHistory=true] - Si true, añade entrada al history
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


        //  ----- 1 - DOM update con callback  -----
        if (document.startViewTransition) 
            document.startViewTransition(() => loadContentDOM(route, () => runScripts()));
        
        else 
            loadContentDOM(route, () => runScripts());
        

        //  ----- 2 - Title, favicon, styles  -----
        
        document.title = route.pageTitle || 'Página sin título';
        updateFavicon(route.favicon);

        // Permite estilos por ruta usando selectores de tipo body[data-route-id="..."]
        document.body.setAttribute('data-route-id', route.id || '');

        if (route.styles) {
            try { await loadStylesheet(route.styles); }
            catch (e) { console.error(e); }
        }

        //  ----- 3 - Actualizar URL  -----
        if (pushHistory) {
            
            /**
             * - Nueva URL canónica de navegador
             * @type {string}
             */
            const newUrl = getRouteBrowserPath(route.path);
            
            /**
             * - Path actual
             * @type {string}
             */
            const currentPath = window.location.pathname;
            
            if (currentPath !== newUrl) {
                history.pushState({ path: newUrl }, '', newUrl);
            }

        }

    };



    /**
     * -----------------------------------
     * -----  Configura eventos SPA  -----
     * -----------------------------------
     * 
     * `setupEventListeners`
     * 
     * - Configura eventos de navegación SPA
     */
    const setupEventListeners = () => {


        //  -----  Maneja clicks en enlaces SPA  -----
        document.addEventListener('click', (e) => {

            if (!(e.target instanceof Element))
                return;

            /**@type {HTMLAnchorElement|null} - Busca el enlace más cercano con data-id */
            const link = e.target.closest('a[data-id]');

            if (!link)
                return;

            //  -----  Previene comportamiento por defecto  -----
            e.preventDefault();


            /** @type {Route|undefined} - Ruta asociada al enlace*/
            const route = settings.routes.find(r => r.id === link.dataset.id);
            
            if (route) 
                loadContent(route, true)
                    .catch(console.error);

        });


        //  -----  Maneja navegación con back/forward  -----
        window.addEventListener('popstate', (e) => {
            
            /** @type {string} - Path normalizado de la entrada en el history */
            const path = stripBaseFromPath(e.state?.path || window.location.pathname);
            
            /** @type {Route|undefined} - Ruta asociada al path */
            const route = settings.routes.find(r => normalizePath(r.path) === path);
            
            if (route) 
                loadContent(route, false)
                    .catch(console.error);
        });

    };



    /**
     * -----------------------------------
     * -----  Inicializa el plugin  -----
     * -----------------------------------
     * 
     * `init`
     * 
     * - Inicializa el plugin SPA
     * - Carga la ruta inicial y configura listeners
     */

    const init = () => {
        
        
        console.warn('✅ Plugin SPA cargado correctamente (solo funciones directas)');

        /** @type {string} * - Path inicial normalizado */
        const initialPath = stripBaseFromPath(window.location.pathname);
        
        /** @type {Route|undefined} * - Ruta inicial a cargar */
        const initialRoute = settings.routes.find(r => normalizePath(r.path) === initialPath);

        //  -----  Carga la ruta inicial sin añadir al history  -----
        if (initialRoute) 
            loadContent(initialRoute, false)
                .catch(console.error);
        
        /** @type {string} - URL canónica inicial para el history */
        const canonicalInitialUrl = initialRoute
            ? getRouteBrowserPath(initialRoute.path)
            : window.location.pathname;

        history.replaceState({ path: canonicalInitialUrl }, '', canonicalInitialUrl);

        //  -----  Configura listeners de navegación  -----
        setupEventListeners();

    };


    //  -----  Inicialización automática  -----
    init();


};
