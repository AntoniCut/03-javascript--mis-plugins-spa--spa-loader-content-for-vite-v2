/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-navbar.js  ------------------
    -------------------------------------------------
*/


import javascriptLogo from '@assets/logos/javascript-logo.svg';
import typescriptLogo from '@assets/logos/typescript-logo.svg';
import { bindNavbarMenu } from '@components/layout/bind-navbar-menu.js';


/**
 * - Componente `Navbar de la aplicación` (markup v3)
 * @returns {void}
 */
export const Navbar = () => {

    const $layoutNavbar = document.querySelector('#layoutNavbar');

    if (!$layoutNavbar)
        throw new Error('No se encontró el elemento #layoutNavbar');

    $layoutNavbar.innerHTML = `

        <div class="navbar__container">

            <button class="navbar__btn-close" type="button" aria-label="Cerrar menú de navegación">
                <div class="btn__icon-close"> </div>
                <div class="btn__icon-close"> </div>
            </button>

            <ul class="navbar__list">

                <li class="navbar__title">
                    <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
                        <img class="navbar__logo-typescript"
                            src="${typescriptLogo}"
                            alt="Logo TypeScript">
                    </a>
                    <h3> HOME </h3>
                    <a href="https://developer.mozilla.org/es/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">
                        <img class="navbar__logo-javascript"
                            src="${javascriptLogo}"
                            alt="Logo JavaScript">
                    </a>
                </li>

                <li class="navbar__item">
                    <a href="#" data-id="home" data-route="route-00-home"> Home </a>
                </li>

            </ul>

            <ul class="navbar__list">

                <li class="navbar__title">
                    <a href="https://developer.mozilla.org/es/docs/Web/HTML" target="_blank" rel="noopener noreferrer">
                        <img class="navbar__logo-typescript"
                            src="${typescriptLogo}"
                            alt="Logo TypeScript">
                    </a>
                    <h3> Páginas </h3>
                    <a href="https://developer.mozilla.org/es/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">
                        <img class="navbar__logo-javascript"
                            src="${javascriptLogo}"
                            alt="Logo JavaScript">
                    </a>
                </li>

                <li class="navbar__item">
                    <a href="#" data-id="htmlPage" data-route="route-html-page"> HTML5 </a>
                </li>
                <li class="navbar__item">
                    <a href="#" data-id="cssPage" data-route="route-css-page"> CSS3 </a>
                </li>
                <li class="navbar__item">
                    <a href="#" data-id="javascriptPage" data-route="route-javascript-page"> JavaScript ES6+ </a>
                </li>
                <li class="navbar__item">
                    <a href="#" data-id="jqueryPage" data-route="route-jquery-page"> jQuery </a>
                </li>
                <li class="navbar__item">
                    <a href="#" data-id="jqueryUiPage" data-route="route-jquery-ui-page"> jQuery UI </a>
                </li>
                <li class="navbar__item">
                    <a href="#" data-id="reactPage" data-route="route-react-page"> React </a>
                </li>
                <li class="navbar__item">
                    <a href="#" data-id="astroPage" data-route="route-astro-page"> Astro </a>
                </li>

            </ul>

        </div>

    `;

    bindNavbarMenu();

};
