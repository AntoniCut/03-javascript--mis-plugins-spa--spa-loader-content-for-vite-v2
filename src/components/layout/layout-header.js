/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-header.js  ------------------
    -------------------------------------------------
*/


/**
 * - Componente `Header de la aplicación`
 * @param {string} html - HTML a renderizar dentro del Header
 * @returns {() => void} - Función que renderiza el contenido en el Header
 */
export const Header = (html = '') => {

    return () => {

        /**
         * - Selecciona el elemento Header del DOM
         * @type {HTMLElement|null}
         */
        const $layoutHeader = document.querySelector('#layoutHeader');

        if (!$layoutHeader)
            throw new Error('No se encontró el elemento #layoutHeader en el DOM.');

        $layoutHeader.innerHTML = html;
    };

};
