/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-header-jquery-page.js  ------
    -------------------------------------------------
*/


import jqueryLogo from '@assets/logos/jquery.svg';
import javascriptLogo from '@assets/logos/javascript.svg';


/**
 * - Componente `Header para la página jQuery`
 */
export const HeaderJqueryPage = () => {
    
    const $layoutHeader = document.querySelector('#layoutHeader');

    if (!$layoutHeader) 
        throw new Error('No se encontró el elemento #layoutHeader');
        
    $layoutHeader.innerHTML = `
        
        <div class="header__container">
            
            <a href="https://jquery.com/" target="_blank" rel="noreferrer">
                <img src="${jqueryLogo}" class="logo" alt="jQuery logo"/>
            </a>
            
            <h1 id="headerTitle"> jQuery - Write Less, Do More </h1>
            
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
                <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo"/>
            </a>

        </div>
        
    `;

};
