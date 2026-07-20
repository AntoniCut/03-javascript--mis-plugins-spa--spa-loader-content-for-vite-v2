/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-footer.js  ------------------
    -------------------------------------------------
*/


/**
 * - Componente `Footer de la aplicación`
 * @param {string} html - HTML a renderizar dentro del Footer
 * @returns {() => void} - Función que renderiza el contenido en el Footer
 */
export const Footer = (html = '') => {

    return () => {

        /**
         * - Selecciona el elemento Footer del DOM
         * @type {HTMLElement|null}
         */
        const $layoutFooter = document.querySelector('#layoutFooter');

        if (!$layoutFooter)
            throw new Error('No se encontró el elemento #layoutFooter en el DOM.');

        $layoutFooter.innerHTML = html;
    };

};
