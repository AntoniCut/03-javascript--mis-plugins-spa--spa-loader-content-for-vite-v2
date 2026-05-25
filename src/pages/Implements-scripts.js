/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/pages/  ------------------------
    ----------  /implements-scripts.js  -------------
    -------------------------------------------------
*/


/**
 * - Página/Componente `Home`
 * @returns {HTMLDivElement}
 */
export const ImplementsScripts = () => {
    
    /**
     * - `Div principal de la página`
     * @type {HTMLDivElement}
     */
    const $div = document.createElement('div');
    
    $div.id = 'implementsScripts';
    $div.className = 'layout__main';
    
    $div.innerHTML = `
        
        <h1> Implementación de Scripts en la SPA </h1>
        <p> 
            Bienvenido a la página de Implementación de Scripts.
            <br>
            Aquí aprenderás cómo integrar y gestionar scripts en una SPA utilizando diferentes métodos.
        </p>
        <br> <hr> <br>
        
        <h2> 1 - Script Home </h2>
        <h3 id="mainTitle">  </h3>
        <br> <hr> <br>

        <h2> 2 - Script Home 2 </h2>
        <h3 id="mainTitle2">  </h3>
        <button id="btnScript2"> Ejecutar Script Home 2 </button>

        <br> <hr> <br>
     
        
    `;

    console.log('📄 Componente ImplementsScripts cargado correctamente.');

    return $div;

};

