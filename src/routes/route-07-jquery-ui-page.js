/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-07-jquery-ui-page.js  -------------------
    ------------------------------------------------------------
*/


//  -----  Importa los componentes de layout  -----
import { HeaderJqueryUiPage } from '@/components/layout/layout-header-jquery-ui-page.js';
import { Navbar } from '@/components/layout/layout-navbar.js';
import { Main } from '@/components/layout/layout-main.js';
import { Footer } from '@/components/layout/layout-footer.js';


// -----  Importa las páginas  -----
import jqueryUiPage from '@pages/jquery-ui-page.html?raw';
import jqueryUiPageRouteStyles from '@styles/routes/jquery-ui-page.css?url';

//  -----  Importa la base del proyecto  -----
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de jQuery UI Page  -----` */
export const route07JqueryUiPage = {
    id: 'jqueryUiPage',
    LayoutHeaderComponent: HeaderJqueryUiPage,
    LayoutNavbarComponent: Navbar,
    LayoutMainComponent: Main(jqueryUiPage),
    LayoutFooterComponent: Footer,
    favicon: `${base}/favicon/javascript.svg`,
    pageTitle: 'jQuery UI - Interacciones y Widgets',
    path: 'jquery-ui-page',
    headerTitle: 'jQuery UI - Interacciones y Widgets',
    styles: jqueryUiPageRouteStyles,
    scripts: []
};
