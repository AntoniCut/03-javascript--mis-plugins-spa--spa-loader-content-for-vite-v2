/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/spa/spa.js  --------------------
    -------------------------------------------------
*/



/**
 * @typedef {import('../types/route-types.js').Route} Route
 * @typedef {import('../types/config-option-spa-types.js').ConfigOptionsSPA} ConfigOptionsSPA
 */


import { routesJavaScriptAntonydevTech } from "@routes/routes-javascript-antonydev-tech.js";
import { routesImplementsScripts } from "@/routes/routes-implements-scripts.js";

import { base } from "@/config/base.js";
import { spaLoaderContentForVite } from "@plugins/spa-loader-content-for-vite/spa-loader-content-for-vite.js";




/**
 * - `Función principal` que `inicializa` la `SPA` utilizando el plugin `spaLoaderContentForVite`
 */

export const spa = () => {

    
    //  ----------  Documento Cargado  ----------
    console.log('\n');
    console.warn('-----  content-loader-spa.js  -----');
    console.log('\n')
       
    
    //  ----------  Arrays con la informacion del contenido a cargar de las rutas del proyecto ----------
    
    /**
     * - `Todas las rutas del proyecto`
     * @type {Route[]}
     */
    
    const allRoutes = [
        
        ...routesJavaScriptAntonydevTech,
        ...routesImplementsScripts,

    ];

  
    //  ----------  Opciones que le pasamos al plugins  ----------

    /**
     * - `Opciones de configuración para la SPA`
     * @type {ConfigOptionsSPA}
     */

    const configOptions = {
        routes: allRoutes,
        base,
        layoutHeader: '#layoutHeader',
        layoutNavbar: '#layoutNavbar',
        layoutMain: '#layoutMain',
        layoutFooter: '#layoutFooter',
    }


    //  ----------  Invocamos el Plugins  --  content-loader-spa.js  ----------
    spaLoaderContentForVite(configOptions);

}
