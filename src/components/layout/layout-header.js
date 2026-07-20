/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-header.js  ------------------
    -------------------------------------------------
*/


import javascriptLogo from '@assets/logos/javascript-logo.svg';


/**
 * - Componente `Header de la aplicación` (markup v3)
 */
export const Header = () => {

    const $layoutHeader = document.querySelector('#layoutHeader');

    if (!$layoutHeader)
        throw new Error('No se encontró el elemento #layoutHeader');

    $layoutHeader.innerHTML = `

        <div class="header__container">

            <button class="navbar__btn-open" type="button" aria-label="Abrir menú de navegación">
                <div class="btn__icon-open"> </div>
                <div class="btn__icon-open"> </div>
                <div class="btn__icon-open"> </div>
            </button>

            <a class="header__brand header__brand--spa" href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
                <span class="header__logo-shell">
                    <img
                        class="header__logo-javascript"
                        src="${javascriptLogo}"
                        alt="Logo JavaScript"
                    >
                </span>
                <span class="header__brand-copy">
                    <span class="header__eyebrow"> Plugin SPA </span>
                    <span class="header__brand-name"> spa-loader </span>
                </span>
            </a>

            <div class="header__content">
                <p class="header__badge"> Plugin SPA </p>
                <h1 class="header__title">
                    &lt; spa-loader-content-for-vite-v2 /&gt;
                </h1>
                <p id="headerTitle" class="header__dynamic-title">
                </p>
            </div>

            <a class="header__brand header__brand--javascript" href="https://developer.mozilla.org/es/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">
                <span class="header__brand-copy">
                    <span class="header__eyebrow"> Vanilla JS </span>
                    <span class="header__brand-name"> JavaScript </span>
                </span>
                <span class="header__logo-shell">
                    <img
                        class="header__logo-javascript"
                        src="${javascriptLogo}"
                        alt="Logo JavaScript"
                    >
                </span>
            </a>

        </div>

    `;

};
