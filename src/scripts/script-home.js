/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/scripts/  ----------------------
    ----------  /script-home.js  --------------------
    -------------------------------------------------
*/

/**
 * - Script ejecutado automáticamente por el SPA loader.
 * - Se ejecuta SIN importar archivo, porque se pasa como función.
 */
export const scriptHome = () => {

    console.log('📌 script-home.js ejecutado correctamente');

    const $div = document.querySelector('#implementsScripts');
    
    if (!$div)
        throw new Error('Contenedor #implementsScripts no encontrado en el DOM.');
    
    const $mainTitle = document.querySelector('#mainTitle');

    if (!$mainTitle)
        throw new Error('Elemento #mainTitle no encontrado en el contenedor.');

    $mainTitle.textContent = 'Script de tipo función directa ejecutado al cargar la ruta.';

};


