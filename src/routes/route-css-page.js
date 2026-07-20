/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-css-page.js  ----------------------------
    ------------------------------------------------------------
*/


import { HeaderCssPage } from '@components/layout/layout-header-css-page.js';
import { Navbar } from '@components/layout/layout-navbar.js';
import { Main } from '@components/layout/layout-main.js';
import { Footer } from '@components/layout/layout-footer.js';

import cssPage from '@pages/css/css-page.html?raw';
import cssPageRouteStyles from '@styles/scss/pages/css-page.scss?url';
import { mount as mountCssPage } from '@scripts/js/pages/css-page.esm.js';
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de CSS Page  -----` */
export const routeCssPage = {
    id: 'cssPage',
    LayoutHeaderComponent: HeaderCssPage,
    LayoutNavbarComponent: Navbar,
    LayoutMainComponent: Main(cssPage),
    LayoutFooterComponent: Footer,
    favicon: `${base}/favicon/css-icon.svg`,
    pageTitle: 'CSS3 — Cascading Style Sheets',
    path: 'css-page',
    headerTitle: 'CSS3 — Cascading Style Sheets',
    styles: cssPageRouteStyles,
    scripts: [mountCssPage]
};
