/*
    *  ---------------------------------------------  *
    *  -----  home.js  --  /src/pages/home.js  -----  *
    *  ---------------------------------------------  *
*/


/**
 * - Página/Componente `Home`
 * @returns {HTMLDivElement}
 */
export const Home = () => {
    
    /**
     * - `Div principal de la página`
     * @type {HTMLDivElement}
     */
    const $div = document.createElement('div');
    
    $div.id = 'home';
    $div.className = 'layout__main';
    
    $div.innerHTML = `
        
        <h2 class="main__title">  </h2>

        <p> 
            Bienvenido a la página de inicio de mis desarrollos con JavaScript. 
            Aquí encontrarás una variedad de proyectos y recursos relacionados con el desarrollo web utilizando JavaScript. 
            Explora y disfruta del contenido que he preparado para ti. 
        </p>
    `;

    // alert("Home page loaded");
    
    return $div;

};

