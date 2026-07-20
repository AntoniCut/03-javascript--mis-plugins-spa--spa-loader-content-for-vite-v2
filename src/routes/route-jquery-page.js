/*
    *  ------------------------------------------------------------------------  *
    *  -----  route-jquery-page.js  --  /src/routes/route-jquery-page.js  -----  *
    *  ------------------------------------------------------------------------  *
*/


import { LayoutHeader } from '@components/layout/layout-header.js';
import { LayoutNavbar } from '@components/layout/layout-navbar.js';
import { LayoutMain } from '@components/layout/layout-main.js';
import { LayoutFooter } from '@components/layout/layout-footer.js';

import layoutHeader from '@components/layout/layout-header.html?raw';
import layoutNavbar from '@components/layout/layout-navbar.html?raw';
import layoutFooter from '@components/layout/layout-footer.html?raw';

import jqueryPage from '@pages/jquery/jquery-page.html?raw';
import jqueryPageRouteStyles from '@styles/scss/pages/jquery-page.scss?url';
import { mount as mountJqueryPage } from '@scripts/js/pages/jquery-page.esm.js';
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de jQuery Page  -----` */
export const routeJqueryPage = {
    id: 'jqueryPage',
    components: {
        layoutHeader: LayoutHeader(layoutHeader),
        layoutNavbar: LayoutNavbar(layoutNavbar),
        layoutMain: LayoutMain(jqueryPage),
        layoutFooter: LayoutFooter(layoutFooter),
    },
    favicon: `${base}/favicon/jquery-icon.svg`,
    pageTitle: 'jQuery — The Write Less, Do More Library',
    path: 'jquery-page',
    headerTitle: 'jQuery — The Write Less, Do More Library',
    styles: jqueryPageRouteStyles,
    scripts: [mountJqueryPage]
};
