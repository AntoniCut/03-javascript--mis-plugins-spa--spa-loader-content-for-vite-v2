/*
    *  ---------------------------------------------------------------------------  *
    *  -----  route-scripts-types.js  --  /src/types/route-scripts-types.js  -----  *
    *  ---------------------------------------------------------------------------  *
*/


// Asegura que VS Code trate este archivo como módulo ES
export { };


/* 
    --------------------------------------------
    -----  1. Script como función directa  -----
    --------------------------------------------
 */

/**
 * Una función ejecutada automáticamente al cargar la ruta.
 * Ideal para inicialización ligera o acciones rápidas.
 *
 * @callback RouteScriptFunction
 * @returns {void | Promise<void>}
 */


/* 
    ---------------------------------------------------
    -----  2. Script como ruta string (ESModule)  -----
    ---------------------------------------------------
 */

/**
 * Ruta a un módulo ES que será cargado mediante `import(src)`.
 *
 * @typedef {string} RouteScriptPath
 * @example "/src/scripts/script-dashboard.js"
 */



/* 
    ---------------------------------------------------------------
    -----  3. Descriptor avanzado para módulos ES con export  -----
    ---------------------------------------------------------------
*/

/**
 * Permite cargar un módulo ES y ejecutar una exportación concreta.
 *
 * @typedef {Object} RouteScriptModuleDescriptor
 * @property {string} src          Ruta del archivo JS (ESModule)
 * @property {true} isModule       Forzar carga mediante import()
 * @property {string} [exportName] Nombre de la función exportada a ejecutar
 *
 * @example
 * {
 *   src: "/src/scripts/script-profile.js",
 *   isModule: true,
 *   exportName: "initProfile"
 * }
 */



/* 
    -------------------------------------------
    -----  4. Script clásico (no módulo)  -----
    -------------------------------------------
 */

/**
 * Descriptor para cargar scripts antiguos o de terceros sin ESModule.
 *
 * @typedef {Object} RouteScriptClassicDescriptor
 * @property {string} src     Ruta del script clásico
 * @property {false} isModule Indica que se insertará via <script>
 *
 * @example
 * {
 *   src: "/src/scripts/vendor/lib-old.js",
 *   isModule: false
 * }
 */



/* 
    ----------------------------------------------------------------
    -----  Tipo unificado aceptado por la propiedad `scripts`  -----
    ----------------------------------------------------------------
 */

/**
 * @typedef {(
     * RouteScriptFunction
     * | RouteScriptPath
     * | RouteScriptModuleDescriptor
     * | RouteScriptClassicDescriptor
     * )} RouteScript
 */

