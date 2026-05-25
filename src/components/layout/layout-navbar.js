/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-navbar.js  ------------------
    -------------------------------------------------
*/



/**
 * - Componente `Navbar de la aplicación`
 */
export const Navbar = () => {
    
    /**
     * - `Navbar de la aplicación`
     * @type {HTMLNavElement|null}
     */
    const $layoutNavbar = document.querySelector('#layoutNavbar');
    
    if (!$layoutNavbar) 
        throw new Error('No se encontró el elemento #layoutNavbar');
    
    
    
    $layoutNavbar.innerHTML = `

        <div class="navbar__container">
            <a href="#" data-id="home"> Home </a> <br> <br>
            <a href="#" data-id="implementsScripts"> Implementación de Scripts </a> <br> <br>
            <a href="#" data-id="cursoJavascriptJonMircha"> Curso JavaScript Jon Mircha </a>
        </div>
                
    `;
 
    

};

