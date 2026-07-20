/*
    *  ----------------------------------------------  *
    *  -----  base.js  --  /src/config/base.js  -----  *
    *  ----------------------------------------------  *
*/


/**
 * --------------------
 * -----  `base`  -----
 * --------------------
 * - `Base pública` de la aplicación servida por Vite.
 * - `import.meta.env.BASE_URL` ya incluye la base configurada en `vite.config.js`.
 */

export const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL.slice(0, -1)
    : import.meta.env.BASE_URL;