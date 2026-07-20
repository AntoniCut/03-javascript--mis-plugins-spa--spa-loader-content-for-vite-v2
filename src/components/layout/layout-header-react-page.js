/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-header-react-page.js  -------
    -------------------------------------------------
*/


import reactLogo from '@assets/logos/react.svg';
import javascriptLogo from '@assets/logos/javascript.svg';


/**
 * - Componente `Header para la página React`
 */
export const HeaderReactPage = () => {

    const $layoutHeader = document.querySelector('#layoutHeader');

    if (!$layoutHeader)
        throw new Error('No se encontró el elemento #layoutHeader');

    $layoutHeader.innerHTML = `

        <div class="header__container">

            <a href="https://react.dev/" target="_blank" rel="noreferrer">
                <img src="${reactLogo}" class="logo" alt="React logo"/>
            </a>

            <h1 id="headerTitle"> React — Biblioteca UI Declarativa </h1>

            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
                <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo"/>
            </a>

        </div>

    `;

};
