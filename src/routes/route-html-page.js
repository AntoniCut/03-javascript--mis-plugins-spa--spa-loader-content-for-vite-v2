/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-html-page.js  ---------------------------
    ------------------------------------------------------------
*/


import { HeaderHtmlPage } from '@components/layout/layout-header-html-page.js';
import { Navbar } from '@components/layout/layout-navbar.js';
import { Main } from '@components/layout/layout-main.js';
import { Footer } from '@components/layout/layout-footer.js';

import htmlPage from '@pages/html/html-page.html?raw';
import htmlPageRouteStyles from '@styles/scss/pages/html-page.scss?url';
import { mount as mountHtmlPage } from '@scripts/js/pages/html-page.esm.js';
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de HTML Page  -----` */
export const routeHtmlPage = {
    id: 'htmlPage',
    LayoutHeaderComponent: HeaderHtmlPage,
    LayoutNavbarComponent: Navbar,
    LayoutMainComponent: Main(htmlPage),
    LayoutFooterComponent: Footer,
    favicon: `${base}/favicon/html-icon.svg`,
    pageTitle: 'HTML5 — HyperText Markup Language',
    path: 'html-page',
    headerTitle: 'HTML5 — HyperText Markup Language',
    styles: htmlPageRouteStyles,
    scripts: [mountHtmlPage]
};
