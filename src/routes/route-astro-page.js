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

import layoutHeader from '@components/layout/layout-header.html?raw';
import layoutNavbar from '@components/layout/layout-navbar.html?raw';
import layoutFooter from '@components/layout/layout-footer.html?raw';

import astroPage from '@pages/astro/astro-page.html?raw';
import astroPageRouteStyles from '@styles/scss/pages/astro-page.scss?url';
import { mount as mountAstroPage } from '@scripts/js/pages/astro-page.esm.js';
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de Astro Page  -----` */
export const routeAstroPage = {
    id: 'astroPage',
    components: {
        layoutHeader: Header(layoutHeader),
        layoutNavbar: Navbar(layoutNavbar),
        layoutMain: Main(astroPage),
        layoutFooter: Footer(layoutFooter),
    },
    favicon: `${base}/favicon/astro-official.svg`,
    pageTitle: 'Astro — Framework de Sitios Estáticos',
    path: 'astro-page',
    headerTitle: 'Astro — Framework de Sitios Estáticos',
    styles: astroPageRouteStyles,
    scripts: [mountAstroPage]
};
