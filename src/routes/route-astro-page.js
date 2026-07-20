/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-astro-page.js  --------------------------
    ------------------------------------------------------------
*/


import { Header } from '@components/layout/layout-header.js';
import { Navbar } from '@components/layout/layout-navbar.js';
import { Main } from '@components/layout/layout-main.js';
import { Footer } from '@components/layout/layout-footer.js';

import astroPage from '@pages/astro/astro-page.html?raw';
import astroPageRouteStyles from '@styles/scss/pages/astro-page.scss?url';
import { mount as mountAstroPage } from '@scripts/js/pages/astro-page.esm.js';
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de Astro Page  -----` */
export const routeAstroPage = {
    id: 'astroPage',
    LayoutHeaderComponent: Header,
    LayoutNavbarComponent: Navbar,
    LayoutMainComponent: Main(astroPage),
    LayoutFooterComponent: Footer,
    favicon: `${base}/favicon/astro-official.svg`,
    pageTitle: 'Astro — Framework de Sitios Estáticos',
    path: 'astro-page',
    headerTitle: 'Astro — Framework de Sitios Estáticos',
    styles: astroPageRouteStyles,
    scripts: [mountAstroPage]
};
