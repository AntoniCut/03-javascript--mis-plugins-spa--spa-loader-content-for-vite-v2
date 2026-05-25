/*
    ---------------------------------------------------
    ----------  /javascript.antonydev.tech/  ----------
    ----------  /src/types/  --------------------------
    ----------  /route-types.js  ----------------------
    ---------------------------------------------------
*/


export {};


/**
 * Representa una ruta del sistema SPA: define componentes,
 * metadata, assets y scripts que deben cargarse dinámicamente.
 *
 * @typedef {Object} Route
 *
 * @property {string} id                        Identificador único de la ruta.
 * @property {string} path                      Path normalizado para navegación.
 *
 * @property {(() => void)|undefined} LayoutHeaderComponent   Función que inserta contenido enel header ya existente.
 * @property {(() => void)|undefined} LayoutNavbarComponent   Función que inserta contenido en la navbar ya existente.
 * @property {(() => void)|undefined} LayoutMainComponent     Función que inserta contenido en el main ya existente.
 * @property {(() => void)|undefined} LayoutFooterComponent   Función que inserta contenido en el footer ya existente.
 *
 * @property {string} favicon                   Ruta del favicon.
 * @property {string} pageTitle                 Título de la pestaña del navegador.
 * @property {string} headerTitle               Título visible de la página.
 *
 * @property {string|null} [styles]           Archivos CSS opcionales.
 *
 * @property {Function[]|null} scripts 
 * - Lista de scripts de tipo `function` que se ejecutan en orden justo después de
 * - renderizar el DOM. Pueden ser funciones síncronas o `async`.
 * 
 * @property {Object.<string,any>} [meta]       Metadata adicional opcional.
 */
