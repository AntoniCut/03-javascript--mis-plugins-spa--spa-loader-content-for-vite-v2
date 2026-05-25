/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-header-jquery-ui-page.js  ---
    -------------------------------------------------
*/


import jqueryUiLogo from '@assets/logos/jquery-ui-icon.svg';
import javascriptLogo from '@assets/logos/javascript.svg';


/**
 * - Componente `Header para la página jQuery UI`
 */
export const HeaderJqueryUiPage = () => {
    
    const $layoutHeader = document.querySelector('#layoutHeader');

    if (!$layoutHeader) 
        throw new Error('No se encontró el elemento #layoutHeader');
        
    $layoutHeader.innerHTML = `
        
        <div class="header__container">
            
            <a href="https://jqueryui.com/" target="_blank" rel="noreferrer">
                <img src="${jqueryUiLogo}" class="logo" alt="jQuery UI logo"/>
            </a>
            
            <h1 id="headerTitle"> jQuery UI - Interacciones y Widgets </h1>
            
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
                <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo"/>
            </a>

        </div>
        
    `;

};
