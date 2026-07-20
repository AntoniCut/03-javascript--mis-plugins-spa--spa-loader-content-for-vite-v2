/*
    *  -----------------------------------------------------------------------------------  *
    *  -----  config-option-spa-types.js  --  /src/types/config-option-spa-types.js  -----  *
    *  -----------------------------------------------------------------------------------  *
*/


/**
 * @typedef {import('../types/route-types.js').Route } Route
 * @typedef {import('../types/route-manifest-types.js').RouteManifest } RouteManifest
 */


//  ----------  Esto asegura que VS Code lo trate como módulo  ----------
export {}; 




/**
 * Selectores CSS de los contenedores de layout.
 * Las mismas claves se usan en `Route.components` para mapear slot → factory.
 *
 * @typedef {Object} LayoutSlots
 * @property {string} [layoutHeader] - Selector CSS del contenedor de la cabecera.
 * @property {string} [layoutNavbar] - Selector CSS del contenedor de la barra de navegación.
 * @property {string} [layoutMain] - Selector CSS del contenedor principal donde se cargan las vistas.
 * @property {string} [layoutFooter] - Selector CSS del contenedor del pie de página.
 */


/**
 * Loader de módulo de ruta (`import.meta.glob`).
 * @typedef {() => Promise<Record<string, Route>>} RouteModuleImporter
 */


/**
 * Objeto de configuración del plugin `spaLoaderContentForVite` (entrada parcial).
 *
 * @typedef {Object} ConfigOptionsSPA
 * @property {Route[]} [routes] - Conjunto de rutas (modo eager loading).
 * @property {RouteManifest[]} [routeManifest] - Manifiesto ligero para lazy loading (id, path, file).
 * @property {Record<string, RouteModuleImporter>} [routeModules] - Mapa de módulos (`import.meta.glob`).
 * @property {string} [base] - Base path de la app (vacío si no hay history/hash routing).
 * @property {string} [layoutHeader] - Selector CSS del contenedor de la cabecera.
 * @property {string} [layoutNavbar] - Selector CSS del contenedor de la barra de navegación.
 * @property {string} [layoutMain] - Selector CSS del contenedor principal.
 * @property {string} [layoutFooter] - Selector CSS del contenedor del pie de página.
 */


/**
 * Configuración ya normalizada dentro del plugin (defaults aplicados).
 *
 * @typedef {Object} ResolvedConfigOptionsSPA
 * @property {Route[]} routes
 * @property {RouteManifest[]} routeManifest
 * @property {Record<string, RouteModuleImporter>} routeModules
 * @property {string} base
 * @property {string} layoutHeader
 * @property {string} layoutNavbar
 * @property {string} layoutMain
 * @property {string} layoutFooter
 */
