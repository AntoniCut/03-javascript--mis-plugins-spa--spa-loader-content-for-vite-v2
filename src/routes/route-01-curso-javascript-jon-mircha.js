/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /route-01-curso-javascript-jon-mircha.js  ------
    ------------------------------------------------------------
*/


//  -----  Importa los componentes de layout  -----
import { Header } from '@/components/layout/layout-header.js';
import { Navbar } from '@/components/layout/layout-navbar.js';
import { Main } from '@/components/layout/layout-main.js';
import { Footer } from '@/components/layout/layout-footer.js';


// -----  Importa las páginas  -----
import cursoJavascriptJonMircha from '@pages/curso-javascript-jon-mircha.html?raw';
import cursoJavascriptJonMirchaRouteStyles from '@styles/routes/curso-javascript-jon-mircha.css?url';

//  -----  Importa la base del proyecto  -----
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/** @type {Route} - `-----  Ruta del Curso de JavaScript con Jon Mircha  -----` */
export const route01CursoJavascriptJonMircha = {
    id: 'cursoJavascriptJonMircha',
    LayoutHeaderComponent: Header,
    LayoutNavbarComponent: Navbar,
    LayoutMainComponent: Main(cursoJavascriptJonMircha),
    LayoutFooterComponent: Footer,
    favicon: `${base}/favicon/javascript.svg`,
    pageTitle: 'Curso de JavaScript con Jon Mircha',
    path: 'curso-javascript-jon-mircha',
    headerTitle: 'Curso de JavaScript con Jon Mircha',
    styles: cursoJavascriptJonMirchaRouteStyles,
    scripts: []
};
