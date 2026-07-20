/*
    *  -----------------------------------------  *
    *  -----  spa.js  --  /src/spa/spa.js  -----  *
    *  -----------------------------------------  *
*/


/**
 * @typedef {import('../types/route-types.js').Route} Route
 * @typedef {import('../types/route-manifest-types.js').RouteManifest} RouteManifest
 * @typedef {import('../types/config-option-spa-types.js').ConfigOptionsSPA} ConfigOptionsSPA
 */


import { routeManifest } from "@routes/route-manifest.js";
import { routeModules } from "@routes/route-modules.js";

import { base } from "@/config/base.js";
import { spaLoaderContentForVite } from "@plugins/spa-loader-content-for-vite/spa-loader-content-for-vite.js";




/**
 * - `Función principal` que `inicializa` la `SPA` utilizando el plugin `spaLoaderContentForVite`
 * - Usa lazy loading con manifiesto de rutas y import.meta.glob de Vite
 */

export const spa = () => {

    
    //  ----------  Documento Cargado  ----------
    console.log('\n');
    console.warn('-----  spa.js - Cargado (lazy loading con import.meta.glob)  -----');
    console.log('\n')
       
    
    //  ----------  Opciones que le pasamos al plugin (lazy loading con manifest)  ----------

    /** @type {import("../types/config-option-spa-types.js").ConfigOptionsSPA} - `-----  Configuración para el plugin spa-loader-content-for-vite.js  -----` */

    const configOptionsSpa = {
        routeManifest,
        routeModules,
        base,
    }


    //  ----------  Invocamos el Plugins  --  spa-loader-content-for-vite.js  ----------
    spaLoaderContentForVite(configOptionsSpa);

}
