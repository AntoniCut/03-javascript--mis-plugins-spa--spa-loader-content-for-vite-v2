/*
    *  ---------------------------------------------------------------------------  *
    *  -----  layout-navbar.js  --  /src/components/layout/layout-navbar.js  -----  *
    *  ---------------------------------------------------------------------------  *
*/


import { bindNavbarMenu } from '@components/layout/bind-navbar-menu.js';
import { resolveLayoutHtml } from '@components/layout/resolve-layout-html.js';


/**
 * - Componente `Navbar de la aplicación`
 * @param {string} html - HTML a renderizar dentro del Navbar
 * @returns {() => void} - Función que renderiza el contenido en el Navbar
 */
export const LayoutNavbar = (html = '') => {

    return () => {

        /**
         * - Selecciona el elemento Navbar del DOM
         * @type {HTMLElement|null}
         */
        const $layoutNavbar = document.querySelector('#layoutNavbar');

        if (!$layoutNavbar)
            throw new Error('No se encontró el elemento #layoutNavbar en el DOM.');

        $layoutNavbar.innerHTML = resolveLayoutHtml(html);

        bindNavbarMenu();
    };

};
