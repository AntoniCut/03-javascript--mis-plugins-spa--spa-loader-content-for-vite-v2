/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-css-page.js  ----------------------------
    ------------------------------------------------------------
*/


import { Header } from '@components/layout/layout-header.js';
import { Navbar } from '@components/layout/layout-navbar.js';
import { Main } from '@components/layout/layout-main.js';
import { Footer } from '@components/layout/layout-footer.js';

import layoutHeader from '@components/layout/layout-header.html?raw';
import layoutNavbar from '@components/layout/layout-navbar.html?raw';
import layoutFooter from '@components/layout/layout-footer.html?raw';

import cssPage from '@pages/css/css-page.html?raw';
import cssPageRouteStyles from '@styles/scss/pages/css-page.scss?url';
import { mount as mountCssPage } from '@scripts/js/pages/css-page.esm.js';
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de CSS Page  -----` */
export const routeCssPage = {
    id: 'cssPage',
    components: {
        layoutHeader: Header(layoutHeader),
        layoutNavbar: Navbar(layoutNavbar),
        layoutMain: Main(cssPage),
        layoutFooter: Footer(layoutFooter),
    },
    favicon: `${base}/favicon/css-icon.svg`,
    pageTitle: 'CSS3 — Cascading Style Sheets',
    path: 'css-page',
    headerTitle: 'CSS3 — Cascading Style Sheets',
    styles: cssPageRouteStyles,
    scripts: [mountCssPage]
};
