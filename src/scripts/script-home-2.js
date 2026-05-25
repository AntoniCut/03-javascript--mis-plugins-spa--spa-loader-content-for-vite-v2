/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/scripts/  ----------------------
    ----------  /script-home-2.js  ------------------
    -------------------------------------------------
*/

/**
 * - Script ejecutado automáticamente por el SPA loader.
 * - Se ejecuta SIN importar archivo, porque se pasa como función.
 */
export const scriptHome2 = () => {

    console.log('📌 script-home2.js ejecutado correctamente');

    const $div = document.querySelector('#implementsScripts');
    
    if (!$div)
        throw new Error('Contenedor #implementsScripts no encontrado en el DOM.');
    
    const $mainTitle2 = document.querySelector('#mainTitle2');

    if (!$mainTitle2)
        throw new Error('Elemento #mainTitle2 no encontrado en el contenedor.');

    $mainTitle2.textContent = 'Script Home 2.';

    const $btnScript2 = document.querySelector('#btnScript2');

    if (!$btnScript2)
        throw new Error('Botón #btnScript2 no encontrado en el contenedor.');

    $btnScript2.addEventListener('click', () => {
        alert('¡Botón del Script Home 2 clickeado!');
    });

};


