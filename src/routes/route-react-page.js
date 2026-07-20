/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-react-page.js  --------------------------
    ------------------------------------------------------------
*/


import { Header } from '@components/layout/layout-header.js';
import { Navbar } from '@components/layout/layout-navbar.js';
import { Main } from '@components/layout/layout-main.js';
import { Footer } from '@components/layout/layout-footer.js';

import layoutHeader from '@components/layout/layout-header.html?raw';
import layoutNavbar from '@components/layout/layout-navbar.html?raw';
import layoutFooter from '@components/layout/layout-footer.html?raw';

import reactPage from '@pages/react/react-page.html?raw';
import reactPageRouteStyles from '@styles/scss/pages/react-page.scss?url';
import { mount as mountReactPage } from '@scripts/js/pages/react-page.esm.js';
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de React Page  -----` */
export const routeReactPage = {
    id: 'reactPage',
    components: {
        layoutHeader: Header(layoutHeader),
        layoutNavbar: Navbar(layoutNavbar),
        layoutMain: Main(reactPage),
        layoutFooter: Footer(layoutFooter),
    },
    favicon: `${base}/favicon/react-icon.svg`,
    pageTitle: 'React — Biblioteca UI Declarativa',
    path: 'react-page',
    headerTitle: 'React — Biblioteca UI Declarativa',
    styles: reactPageRouteStyles,
    scripts: [mountReactPage]
};
