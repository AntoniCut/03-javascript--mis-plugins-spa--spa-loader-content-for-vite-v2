/*
    *  --------------------------------------------------------------------  *
    *  -----  route-html-page.js  --  /src/routes/route-html-page.js  -----  *
    *  --------------------------------------------------------------------  *
*/


import { LayoutHeader } from '@components/layout/layout-header.js';
import { LayoutNavbar } from '@components/layout/layout-navbar.js';
import { LayoutMain } from '@components/layout/layout-main.js';
import { LayoutFooter } from '@components/layout/layout-footer.js';

import layoutHeader from '@components/layout/layout-header.html?raw';
import layoutNavbar from '@components/layout/layout-navbar.html?raw';
import layoutFooter from '@components/layout/layout-footer.html?raw';

import htmlPage from '@pages/html/html-page.html?raw';
import htmlPageRouteStyles from '@styles/scss/pages/html-page.scss?url';
import { mount as mountHtmlPage } from '@scripts/js/pages/html-page.esm.js';

import { base } from '@/config/base.js';
import htmlFavicon from '@assets/logos/html5.svg';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de HTML Page  -----` */
export const routeHtmlPage = {
    id: 'htmlPage',
    components: {
        layoutHeader: LayoutHeader(layoutHeader),
        layoutNavbar: LayoutNavbar(layoutNavbar),
        layoutMain: LayoutMain(htmlPage),
        layoutFooter: LayoutFooter(layoutFooter),
    },
    favicon: htmlFavicon,
    pageTitle: 'HTML5 — HyperText Markup Language',
    path: 'html-page',
    headerTitle: 'HTML5 — HyperText Markup Language',
    styles: htmlPageRouteStyles,
    scripts: [mountHtmlPage]
};
