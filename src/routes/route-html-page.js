/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-html-page.js  ---------------------------
    ------------------------------------------------------------
*/


import { Header } from '@components/layout/layout-header.js';
import { Navbar } from '@components/layout/layout-navbar.js';
import { Main } from '@components/layout/layout-main.js';
import { Footer } from '@components/layout/layout-footer.js';

import layoutHeader from '@components/layout/layout-header.html?raw';
import layoutNavbar from '@components/layout/layout-navbar.html?raw';
import layoutFooter from '@components/layout/layout-footer.html?raw';

import htmlPage from '@pages/html/html-page.html?raw';
import htmlPageRouteStyles from '@styles/scss/pages/html-page.scss?url';
import { mount as mountHtmlPage } from '@scripts/js/pages/html-page.esm.js';
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de HTML Page  -----` */
export const routeHtmlPage = {
    id: 'htmlPage',
    components: {
        layoutHeader: Header(layoutHeader),
        layoutNavbar: Navbar(layoutNavbar),
        layoutMain: Main(htmlPage),
        layoutFooter: Footer(layoutFooter),
    },
    favicon: `${base}/favicon/html-icon.svg`,
    pageTitle: 'HTML5 — HyperText Markup Language',
    path: 'html-page',
    headerTitle: 'HTML5 — HyperText Markup Language',
    styles: htmlPageRouteStyles,
    scripts: [mountHtmlPage]
};
