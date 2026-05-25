/*
    -----------------------------------------------------
    ----------  /javascript.antonydev.tech/  ------------
    ----------  /src/routes/  ---------------------------
    ----------  /routes-implements-scripts.js  ----------
    -----------------------------------------------------
*/


//  -----  Components  -----
import { Header } from '@/components/layout/layout-header.js';
import { Navbar } from '@/components/layout/layout-navbar.js';
import { Footer } from '@/components/layout/layout-footer.js';

//  -----  Importa la base del proyecto  -----
import { base } from '@/config/base.js';
import implementsScriptsRouteStyles from '@styles/routes/implements-scripts.css?url';

//  -----  Pages  -----
import { ImplementsScripts } from '@pages/Implements-scripts.js';

//  -----  Scripts  -----
import { scriptHome } from '@scripts/script-home.js';
import { scriptHome2 } from '@/scripts/script-home-2.js';


/**@typedef {import('../types/route-types.js').Route} Route */


/**
 *  - `Array de rutas de la SPA`
 *  - rutas que demuestran diferentes formas de `implementar scripts`
 *  - El plugin SPA normaliza los paths internamente
 *  @type {Route[]}
 */

export const routesImplementsScripts = [

    {
        
        id: 'implementsScripts',
        LayoutHeaderComponent: Header,
        LayoutNavbarComponent: Navbar,
        LayoutMainComponent: ImplementsScripts,
        LayoutFooterComponent: Footer,
        favicon: `${base}/favicon/vite.svg`,
        pageTitle: 'Como implementar scripts en la SPA',
        path: 'implements-scripts',
        headerTitle: 'Implementación de Scripts en la SPA',
        styles: implementsScriptsRouteStyles,
        
        scripts: [
            scriptHome,                        
            scriptHome2
        ]

    },

   
];
