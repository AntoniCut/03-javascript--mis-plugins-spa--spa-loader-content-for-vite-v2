/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-06-jquery-page.js  ----------------------
    ------------------------------------------------------------
*/


//  -----  Importa los componentes de layout  -----
import { HeaderJqueryPage } from '@/components/layout/layout-header-jquery-page.js';
import { Navbar } from '@/components/layout/layout-navbar.js';
import { Main } from '@/components/layout/layout-main.js';
import { Footer } from '@/components/layout/layout-footer.js';


// -----  Importa las páginas  -----
import jqueryPage from '@pages/jquery-page.html?raw';
import jqueryPageRouteStyles from '@styles/routes/jquery-page.css?url';

//  -----  Importa la base del proyecto  -----
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de jQuery Page  -----` */
export const route06JqueryPage = {
    id: 'jqueryPage',
    LayoutHeaderComponent: HeaderJqueryPage,
    LayoutNavbarComponent: Navbar,
    LayoutMainComponent: Main(jqueryPage),
    LayoutFooterComponent: Footer,
    favicon: `${base}/favicon/javascript.svg`,
    pageTitle: 'jQuery - Write Less, Do More',
    path: 'jquery-page',
    headerTitle: 'jQuery - Write Less, Do More',
    styles: jqueryPageRouteStyles,
    scripts: []
};
