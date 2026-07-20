/*
    
    *  ---------------------------------------  *
    *  -----  main.js  --  /src/main.js  -----  *
    *  ---------------------------------------  *
*/


// Estilos globales primero → el loader nace ya estilado
import '@styles/scss/globals.scss';

import { createLoader } from '@/effects/create-loader.js';
import { effectLoadingPage } from '@/effects/effect-loading-page.js';
import { App } from '@app/App.js';


//  ----------  Loader montado desde JS (sin markup en index.html)  ----------
createLoader();


/** @type {HTMLDivElement|null} */
const $app = document.querySelector('#app');

if (!$app) {
    throw new Error('No se ha encontrado el elemento #app');
}


//  ----------  Loader: espera spa:first-route-loaded y hace fade-out  ----------
effectLoadingPage();


//  ----------  Inicializamos la aplicación  ----------
App($app);
