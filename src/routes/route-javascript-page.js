/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-javascript-page.js  ---------------------
    ------------------------------------------------------------
*/


import { Header } from '@components/layout/layout-header.js';
import { Navbar } from '@components/layout/layout-navbar.js';
import { Main } from '@components/layout/layout-main.js';
import { Footer } from '@components/layout/layout-footer.js';

import javascriptPage from '@pages/javascript/javascript-page.html?raw';
import javascriptPageRouteStyles from '@styles/scss/pages/javascript-page.scss?url';
import { mount as mountJavascriptPage } from '@scripts/js/pages/javascript-page.esm.js';
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de JavaScript Page  -----` */
export const routeJavascriptPage = {
    id: 'javascriptPage',
    components: {
        layoutHeader: Header,
        layoutNavbar: Navbar,
        layoutMain: Main(javascriptPage),
        layoutFooter: Footer,
    },
    favicon: `${base}/favicon/javascript-icon.svg`,
    pageTitle: 'JavaScript ES6+ — El Lenguaje de la Web',
    path: 'javascript-page',
    headerTitle: 'JavaScript ES6+ — El Lenguaje de la Web',
    styles: javascriptPageRouteStyles,
    scripts: [mountJavascriptPage]
};
