/*
    *  ---------------------------------------------------------------------------------------  *
    *  -----  resolve-layout-html.js  --  /src/components/layout/resolve-layout-html.js  -----  *
    *  ---------------------------------------------------------------------------------------  *
*/


/*
    -----  Resuelve las URLs de los assets del layout.
    ----- Necesario porque el HTML llega con `?raw` y no pasa por el pipeline de assets.
*/


import javascriptLogo from '@assets/logos/javascript-logo.svg';
import viteLogo from '@assets/logos/vite.svg';


/** 
 * - URLs de los assets del layout.
 * @type {Record<string, string>} */
const layoutAssetUrls = {
    'src/assets/logos/javascript-logo.svg': javascriptLogo,
    'src/assets/logos/vite.svg': viteLogo,
};


/**
 * --------------------------------------------
 * -----  `resolveLayoutHtml(html = '')`  -----
 * --------------------------------------------
 * - Reescribe `src` de logos del layout a URLs resueltas por Vite.
 * - Necesario porque el HTML llega con `?raw` y no pasa por el pipeline de assets.
 * @param {string} html - Markup del layout
 * @returns {string}
 */
export const resolveLayoutHtml = (html = '') => {

    /** - html renderizado del layout */
    let resolved = html;

    for (const [relativePath, url] of Object.entries(layoutAssetUrls)) {
        resolved = resolved.replaceAll(`src="${relativePath}"`, `src="${url}"`);
    }

    return resolved;
};
