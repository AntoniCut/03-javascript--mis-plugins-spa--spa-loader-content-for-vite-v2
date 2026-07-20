/*
    ---------------------------------------------------
    ----------  /javascript.antonydev.tech/  ----------
    ----------  /src/types/  --------------------------
    ----------  /route-types.js  ----------------------
    ---------------------------------------------------
*/


export {};


/**
 * @typedef {import('./route-scripts-types.js').RouteScriptFunction} RouteScriptFunction
 */


/**
 * Factory que monta contenido en un slot de layout.
 * En este plugin las factories mutan el contenedor in-place (return void).
 * Si devolvieran un `Node`, el plugin lo haría `appendChild`.
 *
 * @callback RouteComponentFactory
 * @returns {void|Node|null|undefined}
 */


/**
 * Mapa slot → factory. Las claves deben coincidir con los slots de
 * `ConfigOptionsSPA` (`layoutHeader`, `layoutNavbar`, `layoutMain`, `layoutFooter`).
 * Cada valor es una factory; `undefined` omite / limpia ese slot.
 *
 * @typedef {Object.<string, RouteComponentFactory|undefined>} RouteComponents
 */


/**
 * Representa una ruta del sistema SPA: define componentes,
 * metadata, assets y scripts que deben cargarse dinámicamente.
 *
 * @typedef {Object} Route
 *
 * @property {string} id                        Identificador único de la ruta.
 * @property {string} path                      Path normalizado para navegación.
 *
 * @property {RouteComponents} [components]     Slot de layout → factory de componente.
 *
 * @property {string} favicon                   Ruta del favicon.
 * @property {string} pageTitle                 Título de la pestaña del navegador.
 * @property {string} headerTitle               Título visible de la página.
 *
 * @property {string|null} [styles]             CSS de página (URL, típico `?url` de Vite).
 *
 * @property {RouteScriptFunction[]|null} [scripts]
 * - Funciones (sync o async) que se ejecutan en orden tras renderizar el DOM.
 *
 * @property {Object.<string, any>} [meta]      Metadata adicional opcional.
 */
