/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-00-home.js  -----------------------------
    ------------------------------------------------------------
*/


//  -----  Importa los componentes de layout  -----
import { Header } from '@components/layout/layout-header.js';
import { Navbar } from '@components/layout/layout-navbar.js';
import { Main } from '@components/layout/layout-main.js';
import { Footer } from '@components/layout/layout-footer.js';


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
        layoutHeader: Header,
        layoutNavbar: Navbar,
        layoutMain: Main(home),
        layoutFooter: Footer,
    },
    favicon: `${base}/favicon/javascript.svg`,
    pageTitle: 'spa-loader-content-for-vite — Plugin SPA v2',
    path: '/',
    headerTitle: 'spa-loader-content-for-vite — Plugin SPA v2',
    styles: homeRouteStyles,
    scripts: [mountHome]
};
