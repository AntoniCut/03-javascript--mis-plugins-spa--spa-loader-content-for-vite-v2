/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-00-home.js  -----------------------------
    ------------------------------------------------------------
*/


//  -----  Importa los componentes de layout  -----
import { HeaderHome } from '@components/layout/layout-header-home.js';
import { Navbar } from '@components/layout/layout-navbar.js';
import { Main } from '@components/layout/layout-main.js';
import { Footer } from '@components/layout/layout-footer.js';


// -----  Importa las páginas  -----
import home from '@pages/home.html?raw';
import homeRouteStyles from '@styles/routes/home.css?url';

//  -----  Importa la base del proyecto  -----
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de inicio  -----` */
export const route00Home = {
    id: 'home',
    LayoutHeaderComponent: HeaderHome,
    LayoutNavbarComponent: Navbar,
    LayoutMainComponent: Main(home),
    LayoutFooterComponent: Footer,
    favicon: `${base}/favicon/javascript.svg`,
    pageTitle: 'Mi plugin "Spa Loader Content for Vite" - Version 2',
    path: '/',
    headerTitle: 'Mi plugin "Spa Loader Content for Vite" - Version 2',
    styles: homeRouteStyles,
    scripts: []
};
