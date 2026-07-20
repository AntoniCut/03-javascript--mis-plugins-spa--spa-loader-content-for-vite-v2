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
            <a href="#" data-id="htmlPage"> HTML5 </a> <br> <br>
            <a href="#" data-id="cssPage"> CSS3 </a> <br> <br>
            <a href="#" data-id="javascriptPage"> JavaScript ES6+ </a> <br> <br>
            <a href="#" data-id="jqueryPage"> jQuery </a> <br> <br>
            <a href="#" data-id="jqueryUiPage"> jQuery UI </a> <br> <br>
            <a href="#" data-id="reactPage"> React </a> <br> <br>
            <a href="#" data-id="astroPage"> Astro </a>
        </div>
                
    `;
 
    

};
