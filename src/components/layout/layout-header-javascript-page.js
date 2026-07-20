/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-header-javascript-page.js  --
    -------------------------------------------------
*/


import javascriptLogo from '@assets/logos/javascript.svg';
import viteLogo from '@assets/logos/vite.svg';


/**
 * - Componente `Header para la página JavaScript`
 */
export const HeaderJavascriptPage = () => {

    const $layoutHeader = document.querySelector('#layoutHeader');

    if (!$layoutHeader)
        throw new Error('No se encontró el elemento #layoutHeader');

    $layoutHeader.innerHTML = `

        <div class="header__container">

            <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                <img src="${viteLogo}" class="logo" alt="Vite logo"/>
            </a>

            <h1 id="headerTitle"> JavaScript ES6+ — El Lenguaje de la Web </h1>

            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
                <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo"/>
            </a>

        </div>

    `;

};
