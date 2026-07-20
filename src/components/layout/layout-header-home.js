/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-header-home.js  -------------
    -------------------------------------------------
*/


import javascriptLogo from '@assets/logos/javascript.svg';
import viteLogo from '@assets/logos/vite.svg';


/**
 * - Componente `Header para la página Home`
 */
export const HeaderHome = () => {
    
    const $layoutHeader = document.querySelector('#layoutHeader');

    if (!$layoutHeader) 
        throw new Error('No se encontró el elemento #layoutHeader');
        
    $layoutHeader.innerHTML = `
        
        <div class="header__container">
            
            <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                <img src="${viteLogo}" class="logo" alt="Vite logo"/>
            </a>
            
            <h1 id="headerTitle"> spa-loader-content-for-vite — Plugin SPA v2 </h1>
            
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
                <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo"/>
            </a>

        </div>
        
    `;

};
