/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-04-css-page.js  -------------------------
    ------------------------------------------------------------
*/


//  -----  Importa los componentes de layout  -----
import { HeaderCssPage } from '@/components/layout/layout-header-css-page.js';
import { Navbar } from '@/components/layout/layout-navbar.js';
import { Main } from '@/components/layout/layout-main.js';
import { Footer } from '@/components/layout/layout-footer.js';


// -----  Importa las páginas  -----
import cssPage from '@pages/css-page.html?raw';
import cssPageRouteStyles from '@styles/routes/css-page.css?url';

//  -----  Importa la base del proyecto  -----
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de CSS Page  -----` */
export const route04CssPage = {
    id: 'cssPage',
    LayoutHeaderComponent: HeaderCssPage,
    LayoutNavbarComponent: Navbar,
    LayoutMainComponent: Main(cssPage),
    LayoutFooterComponent: Footer,
    favicon: `${base}/favicon/javascript.svg`,
    pageTitle: 'CSS - Cascading Style Sheets',
    path: 'css-page',
    headerTitle: 'CSS - Cascading Style Sheets',
    styles: cssPageRouteStyles,
    scripts: []
};
