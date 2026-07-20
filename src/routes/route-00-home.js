/*
    *  ----------------------------------------------------------------  *
    *  -----  route-00-home.js  --  /src/routes/route-00-home.js  -----  *
    *  ----------------------------------------------------------------  *
*/


//  -----  Importa los componentes de layout  -----
import { LayoutHeader } from '@components/layout/layout-header.js';
import { LayoutNavbar } from '@components/layout/layout-navbar.js';
import { LayoutMain } from '@components/layout/layout-main.js';
import { LayoutFooter } from '@components/layout/layout-footer.js';

import layoutHeader from '@components/layout/layout-header.html?raw';
import layoutNavbar from '@components/layout/layout-navbar.html?raw';
import layoutFooter from '@components/layout/layout-footer.html?raw';


// -----  Importa las páginas  -----
import home from '@pages/home.html?raw';
import homeRouteStyles from '@styles/scss/pages/home.scss?url';

//  -----  Scripts ESM  -----
import { mount as mountHome } from '@scripts/js/pages/home.esm.js';

//  -----  Importa la base del proyecto  -----
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de inicio  -----` */
export const route00Home = {
    id: 'home',
    components: {
        layoutHeader: LayoutHeader(layoutHeader),
        layoutNavbar: LayoutNavbar(layoutNavbar),
        layoutMain: LayoutMain(home),
        layoutFooter: LayoutFooter(layoutFooter),
    },
    favicon: `${base}/favicon/javascript.svg`,
    pageTitle: 'spa-loader-content-for-vite — Plugin SPA v2',
    path: '/',
    headerTitle: 'spa-loader-content-for-vite — Plugin SPA v2',
    styles: homeRouteStyles,
    scripts: [mountHome]
};
