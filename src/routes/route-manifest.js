/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-manifest.js  ----------------------------
    ------------------------------------------------------------
*/


/** 
 * - `Manifiesto ligero de rutas: solo id, path y nombre de archivo (sin imports)`
 * - Se usa para lazy loading: el módulo de cada ruta se importa dinámicamente bajo demanda.
 * @type {import("../types/route-manifest-types.js").RouteManifest[]} 
 */

export const routeManifest = [

    //  ----------  00 - Home  ----------
    { 
        id: 'home', 
        path: '/', 
        file: 'route-00-home' 
    },

    //  ----------  01 - Curso JavaScript Jon Mircha  ----------
    { 
        id: 'cursoJavascriptJonMircha', 
        path: 'curso-javascript-jon-mircha', 
        file: 'route-01-curso-javascript-jon-mircha' 
    },

    //  ----------  02 - Implements Scripts  ----------
    { 
        id: 'implementsScripts', 
        path: 'implements-scripts', 
        file: 'route-02-implements-scripts' 
    },

    //  ----------  03 - HTML Page  ----------
    { 
        id: 'htmlPage', 
        path: 'html-page', 
        file: 'route-03-html-page' 
    },

    //  ----------  04 - CSS Page  ----------
    { 
        id: 'cssPage', 
        path: 'css-page', 
        file: 'route-04-css-page' 
    },

    //  ----------  05 - JavaScript Page  ----------
    { 
        id: 'javascriptPage', 
        path: 'javascript-page', 
        file: 'route-05-javascript-page' 
    },

    //  ----------  06 - jQuery Page  ----------
    { 
        id: 'jqueryPage', 
        path: 'jquery-page', 
        file: 'route-06-jquery-page' 
    },

    //  ----------  07 - jQuery UI Page  ----------
    { 
        id: 'jqueryUiPage', 
        path: 'jquery-ui-page', 
        file: 'route-07-jquery-ui-page' 
    },

];
