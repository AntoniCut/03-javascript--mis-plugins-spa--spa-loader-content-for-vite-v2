/*
    *  ----------------------------------------------------------------  *
    *  -----  route-modules.js  --  /src/routes/route-modules.js  -----  *
    *  ----------------------------------------------------------------  *
*/


/**
 * - Mapa de módulos de ruta usando `import.meta.glob` de Vite.
 * - Esto permite lazy loading tanto en dev como en producción.
 * - `eager: false` = carga diferida (lazy loading real)
 */
export const routeModules = import.meta.glob('./route-*.js', { eager: false });
