/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-header-javascript-page.js  --
    -------------------------------------------------
*/


import javascriptLogo from '@assets/logos/javascript.svg';


/**
 * - Componente `Header para la página JavaScript`
 */
export const HeaderJavascriptPage = () => {
    
    const $layoutHeader = document.querySelector('#layoutHeader');

    if (!$layoutHeader) 
        throw new Error('No se encontró el elemento #layoutHeader');
        
    $layoutHeader.innerHTML = `
        
        <div class="header__container">
            
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
                <img src="${javascriptLogo}" class="logo" alt="JavaScript logo"/>
            </a>
            
            <h1 id="headerTitle"> JavaScript - El Lenguaje de la Web </h1>
            
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
                <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo"/>
            </a>

        </div>
        
    `;

};
