/*
    *  ------------------------------------------------------------------------------  *
    *  -----  route-jquery-ui-page.js  --  /src/routes/route-jquery-ui-page.js  -----  *
    *  ------------------------------------------------------------------------------  *
*/


import { LayoutHeader } from '@components/layout/layout-header.js';
import { LayoutNavbar } from '@components/layout/layout-navbar.js';
import { LayoutMain } from '@components/layout/layout-main.js';
import { LayoutFooter } from '@components/layout/layout-footer.js';

import layoutHeader from '@components/layout/layout-header.html?raw';
import layoutNavbar from '@components/layout/layout-navbar.html?raw';
import layoutFooter from '@components/layout/layout-footer.html?raw';

import jqueryUiPage from '@pages/jquery-ui/jquery-ui-page.html?raw';
import jqueryUiPageRouteStyles from '@styles/scss/pages/jquery-ui-page.scss?url';
import { mount as mountJqueryUiPage } from '@scripts/js/pages/jquery-ui-page.esm.js';
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de jQuery UI Page  -----` */
export const routeJqueryUiPage = {
    id: 'jqueryUiPage',
    components: {
        layoutHeader: LayoutHeader(layoutHeader),
        layoutNavbar: LayoutNavbar(layoutNavbar),
        layoutMain: LayoutMain(jqueryUiPage),
        layoutFooter: LayoutFooter(layoutFooter),
    },
    favicon: `${base}/favicon/jquery-ui-icon.svg`,
    pageTitle: 'jQuery UI — Interactions, Widgets & Effects',
    path: 'jquery-ui-page',
    headerTitle: 'jQuery UI — Interactions, Widgets & Effects',
    styles: jqueryUiPageRouteStyles,
    scripts: [mountJqueryUiPage]
};
