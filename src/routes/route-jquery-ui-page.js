/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-jquery-ui-page.js  ----------------------
    ------------------------------------------------------------
*/


import { HeaderJqueryUiPage } from '@components/layout/layout-header-jquery-ui-page.js';
import { Navbar } from '@components/layout/layout-navbar.js';
import { Main } from '@components/layout/layout-main.js';
import { Footer } from '@components/layout/layout-footer.js';

import jqueryUiPage from '@pages/jquery-ui/jquery-ui-page.html?raw';
import jqueryUiPageRouteStyles from '@styles/scss/pages/jquery-ui-page.scss?url';
import { mount as mountJqueryUiPage } from '@scripts/js/pages/jquery-ui-page.esm.js';
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de jQuery UI Page  -----` */
export const routeJqueryUiPage = {
    id: 'jqueryUiPage',
    LayoutHeaderComponent: HeaderJqueryUiPage,
    LayoutNavbarComponent: Navbar,
    LayoutMainComponent: Main(jqueryUiPage),
    LayoutFooterComponent: Footer,
    favicon: `${base}/favicon/jquery-ui-icon.svg`,
    pageTitle: 'jQuery UI — Interactions, Widgets & Effects',
    path: 'jquery-ui-page',
    headerTitle: 'jQuery UI — Interactions, Widgets & Effects',
    styles: jqueryUiPageRouteStyles,
    scripts: [mountJqueryUiPage]
};
