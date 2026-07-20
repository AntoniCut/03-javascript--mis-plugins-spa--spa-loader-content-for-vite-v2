/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-header-html-page.js  --------
    -------------------------------------------------
*/


import html5Logo from '@assets/logos/html5.svg';
import javascriptLogo from '@assets/logos/javascript.svg';


/**
 * - Componente `Header para la página HTML`
 */
export const HeaderHtmlPage = () => {

    const $layoutHeader = document.querySelector('#layoutHeader');

    if (!$layoutHeader)
        throw new Error('No se encontró el elemento #layoutHeader');

    $layoutHeader.innerHTML = `

        <div class="header__container">

            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noreferrer">
                <img src="${html5Logo}" class="logo" alt="HTML5 logo"/>
            </a>

            <h1 id="headerTitle"> HTML5 — HyperText Markup Language </h1>

            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
                <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo"/>
            </a>

        </div>

    `;

};
