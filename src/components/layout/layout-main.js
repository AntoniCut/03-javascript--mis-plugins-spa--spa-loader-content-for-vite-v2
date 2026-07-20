/*
    *  -----------------------------------------------------------------------  *
    *  -----  layout-main.js  --  /src/components/layout/layout-main.js  -----  *
    *  -----------------------------------------------------------------------  *
*/


/**
 * - Componente `Main de la aplicación`
 * @param {string} html - HTML a renderizar dentro del Main
 * @returns {() => void} - Función que renderiza el contenido en el Main
 */

export const LayoutMain = (html = '') => {

    return () => {

        /**
         * - Selecciona el elemento Main del DOM
         * @type {HTMLMainElement|null}
         */
        const $layoutMain = document.querySelector('#layoutMain');

        if (!$layoutMain)
            throw new Error('No se encontró el elemento #layoutMain en el DOM.');

        $layoutMain.innerHTML = html;
    };

};
