/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-404-not-found-page.js  ------------------
    ------------------------------------------------------------
*/


import { Header } from '@components/layout/layout-header.js';
import { Navbar } from '@components/layout/layout-navbar.js';
import { Main } from '@components/layout/layout-main.js';
import { Footer } from '@components/layout/layout-footer.js';

import notFoundPage from '@pages/404/404-not-found-page.html?raw';
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta 404 Not Found  -----` */
export const route404NotFoundPage = {
    id: '404NotFoundPage',
    LayoutHeaderComponent: Header,
    LayoutNavbarComponent: Navbar,
    LayoutMainComponent: Main(notFoundPage),
    LayoutFooterComponent: Footer,
    favicon: `${base}/favicon/vite.svg`,
    pageTitle: '404 - Página no encontrada',
    path: '404-not-found-page',
    headerTitle: '404 - Página no encontrada',
    styles: null,
    scripts: []
};
