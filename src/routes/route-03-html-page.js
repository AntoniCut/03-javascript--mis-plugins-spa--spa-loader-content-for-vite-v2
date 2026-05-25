/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-03-html-page.js  ------------------------
    ------------------------------------------------------------
*/


//  -----  Importa los componentes de layout  -----
import { HeaderHtmlPage } from '@/components/layout/layout-header-html-page.js';
import { Navbar } from '@/components/layout/layout-navbar.js';
import { Main } from '@/components/layout/layout-main.js';
import { Footer } from '@/components/layout/layout-footer.js';


// -----  Importa las páginas  -----
import htmlPage from '@pages/html-page.html?raw';
import htmlPageRouteStyles from '@styles/routes/html-page.css?url';

//  -----  Importa la base del proyecto  -----
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta de HTML Page  -----` */
export const route03HtmlPage = {
    id: 'htmlPage',
    LayoutHeaderComponent: HeaderHtmlPage,
    LayoutNavbarComponent: Navbar,
    LayoutMainComponent: Main(htmlPage),
    LayoutFooterComponent: Footer,
    favicon: `${base}/favicon/javascript.svg`,
    pageTitle: 'HTML - HyperText Markup Language',
    path: 'html-page',
    headerTitle: 'HTML - HyperText Markup Language',
    styles: htmlPageRouteStyles,
    scripts: []
};
