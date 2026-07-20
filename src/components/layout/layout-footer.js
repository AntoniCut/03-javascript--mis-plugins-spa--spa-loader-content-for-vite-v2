/*
    *  ---------------------------------------------------------------------------  *
    *  -----  layout-footer.js  --  /src/components/layout/layout-footer.js  -----  *
    *  ---------------------------------------------------------------------------  *
*/


import { resolveLayoutHtml } from '@components/layout/resolve-layout-html.js';


/**
 * - Componente `Footer de la aplicación`
 * @param {string} html - HTML a renderizar dentro del Footer
 * @returns {() => void} - Función que renderiza el contenido en el Footer
 */
export const LayoutFooter = (html = '') => {

    return () => {

        /**
         * - Selecciona el elemento Footer del DOM
         * @type {HTMLElement|null}
         */
        const $layoutFooter = document.querySelector('#layoutFooter');

        if (!$layoutFooter)
            throw new Error('No se encontró el elemento #layoutFooter en el DOM.');

        $layoutFooter.innerHTML = resolveLayoutHtml(html);
    };

};
