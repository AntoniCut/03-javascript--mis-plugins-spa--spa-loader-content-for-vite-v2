/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-05-javascript-page.js  ------------------
    ------------------------------------------------------------
*/


//  -----  Importa los componentes de layout  -----
import { HeaderJavascriptPage } from '@/components/layout/layout-header-javascript-page.js';
import { Navbar } from '@/components/layout/layout-navbar.js';
import { Main } from '@/components/layout/layout-main.js';
import { Footer } from '@/components/layout/layout-footer.js';


// -----  Importa las páginas  -----
import javascriptPage from '@pages/javascript-page.html?raw';
import javascriptPageRouteStyles from '@styles/routes/javascript-page.css?url';

//  -----  Importa la base del proyecto  -----
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de JavaScript Page  -----` */
export const route05JavascriptPage = {
    id: 'javascriptPage',
    LayoutHeaderComponent: HeaderJavascriptPage,
    LayoutNavbarComponent: Navbar,
    LayoutMainComponent: Main(javascriptPage),
    LayoutFooterComponent: Footer,
    favicon: `${base}/favicon/javascript.svg`,
    pageTitle: 'JavaScript - El Lenguaje de la Web',
    path: 'javascript-page',
    headerTitle: 'JavaScript - El Lenguaje de la Web',
    styles: javascriptPageRouteStyles,
    scripts: []
};
