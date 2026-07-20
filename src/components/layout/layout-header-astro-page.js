/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-header-astro-page.js  -------
    -------------------------------------------------
*/


import astroLogo from '@assets/logos/astro.svg';
import javascriptLogo from '@assets/logos/javascript.svg';


/**
 * - Componente `Header para la página Astro`
 */
export const HeaderAstroPage = () => {

    const $layoutHeader = document.querySelector('#layoutHeader');

    if (!$layoutHeader)
        throw new Error('No se encontró el elemento #layoutHeader');

    $layoutHeader.innerHTML = `

        <div class="header__container">

            <a href="https://astro.build/" target="_blank" rel="noreferrer">
                <img src="${astroLogo}" class="logo" alt="Astro logo"/>
            </a>

            <h1 id="headerTitle"> Astro — Framework de Sitios Estáticos </h1>

            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
                <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo"/>
            </a>

        </div>

    `;

};
