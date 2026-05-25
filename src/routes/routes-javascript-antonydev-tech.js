/*
    ------------------------------------------------------------
    ----------  /javascript.antonydev.tech/  -------------------
    ----------  /src/routes/  ----------------------------------
    ----------  /routes-javascript-antonydev-tech.js  ----------
    ------------------------------------------------------------
*/



//  -----  Importa los componentes de layout  -----
import { Header } from '@/components/layout/layout-header.js';
import { Navbar } from '@/components/layout/layout-navbar.js';
import { Main } from '@/components/layout/layout-main.js';
import { Footer } from '@/components/layout/layout-footer.js';


// -----  Importa las páginas  -----
import home from '@pages/home.html?raw';
import cursoJavascriptJonMircha from '@pages/curso-javascript-jon-mircha.html?raw';
import homeRouteStyles from '@styles/routes/home.css?url';
import cursoJavascriptJonMirchaRouteStyles from '@styles/routes/curso-javascript-jon-mircha.css?url';

//  -----  Importa la base del proyecto  -----
import { base } from '@/config/base.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/**
 *  - `Array de rutas de la SPA`
 *  - Cada ruta define los componentes y la configuración necesaria para renderizar la vista
 *  - El plugin SPA normaliza los paths internamente
 *  @type {Route[]}
 */ 

export const routesJavaScriptAntonydevTech = [

    {
        id: 'home',
        LayoutHeaderComponent: Header,
        LayoutNavbarComponent: Navbar,
        LayoutMainComponent: Main(home),
        LayoutFooterComponent: Footer,
        favicon: `${base}/favicon/javascript.svg`,
        pageTitle: 'Mi plugin "Spa Loader Content for Vite" - Version 1',
        path: '/',
        headerTitle: 'Mi plugin "Spa Loader Content for Vite" - Version 1',
        styles: homeRouteStyles,
        scripts: []
    },

    
    {
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
    },

    
];
