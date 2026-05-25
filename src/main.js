/*
    
    *  ---------------------------------------  *
    *  -----  main.js  --  /src/main.js  -----  *
    *  ---------------------------------------  *
*/


import '@styles/view-transition.css';
import '@styles/style.css';
import { App } from "@app/App.js";


/** @type {HTMLDivElement|null} - `Elemento principal de la aplicación`. Selecciona el elemento con id `app` del DOM */
const $app = document.querySelector('#app');


//  ----------  Validamos que el elemento #app exista en el DOM  ----------
if (!$app)
    throw new Error('No se ha encontrado el elemento #app');


//  ----------  Inicializamos la aplicación  ----------
App($app);




