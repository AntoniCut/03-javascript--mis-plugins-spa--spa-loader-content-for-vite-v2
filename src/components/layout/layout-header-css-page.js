/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-header-css-page.js  ---------
    -------------------------------------------------
*/


import css3Logo from '@assets/logos/css3.svg';
import javascriptLogo from '@assets/logos/javascript.svg';


/**
 * - Componente `Header para la página CSS`
 */
export const HeaderCssPage = () => {
    
    const $layoutHeader = document.querySelector('#layoutHeader');

    if (!$layoutHeader) 
        throw new Error('No se encontró el elemento #layoutHeader');
        
    $layoutHeader.innerHTML = `
        
        <div class="header__container">
            
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noreferrer">
                <img src="${css3Logo}" class="logo" alt="CSS3 logo"/>
            </a>
            
            <h1 id="headerTitle"> CSS - Cascading Style Sheets </h1>
            
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noreferrer">
                <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo"/>
            </a>

        </div>
        
    `;

};
