/*
    *  ---------------------------------------------------------------------  *
    *  -----  spa-events-types.js  --  /src/types/spa-events-types.js  -----  *
    *  ---------------------------------------------------------------------  *
*/


//  ----------  Esto asegura que VS Code lo trate como módulo  ----------
export {};


/**
 * -------------------------------------------------
 * -----  `WaitForFirstSpaRouteLoadedOptions`  -----
 * -------------------------------------------------
 * @typedef {Object} WaitForFirstSpaRouteLoadedOptions
 * @property {number} [timeoutMs=6000] Tiempo maximo de espera antes de activar fallback.
 */


/**
 * -------------------------------------
 * -----  `SpaRouteLoadedDetail`  -----
 * -------------------------------------
 * @typedef {Object} SpaRouteLoadedDetail
 * @property {string|null} id
 * @property {string} path
 */


/**
 * ----------------------------------------
 * -----  `SpaRouteLoadErrorDetail`  -----
 * ----------------------------------------
 * @typedef {Object} SpaRouteLoadErrorDetail
 * @property {string|null} id
 * @property {string} path
 * @property {string} source
 * @property {string} message
 */
