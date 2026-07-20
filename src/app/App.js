/*
    *  -----------------------------------------  *
    *  -----  App.js  --  /src/spa/App.js  -----  *
    *  -----------------------------------------  *
*/


import { spa } from "@spa/spa.js";


/** @typedef {import('../types/layout').Layout} Layout */


/**
 * ---------------------
 * -----  `App()`  -----
 * ---------------------
 * - `Función que inicializa la aplicación`
 * - Crea la estructura base del layout, la monta en el contenedor raíz
 *   y después inicializa la SPA
 * @param {HTMLDivElement} $app - `Elemento principal de la aplicación`. Selecciona el elemento con id `app` del DOM
 * @returns {Layout} - `Objeto que representa la estructura base de la aplicación`
 */
 
export const App = ($app) => {

    $app.classList.add('layout');


    /*  
        --------------------
        -----  HEADER  -----
        --------------------
    */

    /** @type {HTMLHeaderElement} - `-----  Header de la aplicación  -----` */
    const $layoutHeader = document.createElement('header');

    $layoutHeader.id = 'layoutHeader';
    $layoutHeader.classList.add('layout__header');


    /*
        --------------------
        -----  NAVBAR  -----
        --------------------
    */

    /** @type {HTMLNavElement} - `-----  Navbar de la aplicación  -----`*/
    const $layoutNavbar = document.createElement('nav');

    $layoutNavbar.id = 'layoutNavbar';
    $layoutNavbar.classList.add('layout__navbar');
    

    /*  
        --------------------
        -----  MAIN  -----
        --------------------
    */

    /** @type {HTMLMainElement} - `-----  Main de la aplicación  -----` */
    const $layoutMain = document.createElement('main');

    $layoutMain.id = 'layoutMain';
    $layoutMain.classList.add('layout__main');


    /*  
        --------------------
        -----  FOOTER  -----
        --------------------
    */

    /** @type {HTMLFooterElement} - `-----  Footer de la aplicación  -----` */
    const $layoutFooter = document.createElement('footer');

    $layoutFooter.id = 'layoutFooter';
    $layoutFooter.classList.add('layout__footer');
   

    /** @type {Layout} - `Objeto que representa la estructura base de la aplicación` */
    const $layout = {
        $layoutHeader,
        $layoutNavbar,
        $layoutMain,
        $layoutFooter
    };


    //  ----------  Montamos la estructura base de la aplicación  ----------
    $app.appendChild($layoutHeader);
    $app.appendChild($layoutNavbar);
    $app.appendChild($layoutMain);
    $app.appendChild($layoutFooter);


    //  ----------  Inicializamos la SPA  ----------
    spa();

    return $layout;


};
