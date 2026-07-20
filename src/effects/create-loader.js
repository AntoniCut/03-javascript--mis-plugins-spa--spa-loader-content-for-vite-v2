/*
    *  -----------------------------------------------------------------  *
    *  -----  create-loader.js  --  /src/effects/create-loader.js  -----  *
    *  -----------------------------------------------------------------  *
*/


import javascriptLogo from '@assets/logos/javascript-logo.svg';


/**
 * --------------------------------
 * -----  `createLoader()`  -----
 * --------------------------------
 * Monta el loader inicial desde JS (filosofía Vite: shell HTML mínimo).
 * Los estilos viven en `globals.scss` → `_loader.scss`; importar SCSS
 * en `main.js` antes de llamar a esta función.
 *
 * @returns {HTMLDivElement} Elemento `#loader` insertado en el body.
 */
export const createLoader = () => {

    const existing = document.querySelector('#loader');

    if (existing instanceof HTMLDivElement) {
        return existing;
    }

    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.className = 'loader__container';
    loader.setAttribute('aria-busy', 'true');
    loader.setAttribute('aria-live', 'polite');

    loader.innerHTML = `
        <h1 class="loader__title">
            &lt; spa-loader-content-for-vite-v2 /&gt;
        </h1>

        <img
            class="loader__icon-javascript"
            src="${javascriptLogo}"
            alt="JavaScript Animation Loader"
            width="300"
            height="300"
        >

        <div class="spinner" role="presentation"></div>

        <h2 class="loader__title">
            &lt; javascript.antonydev.tech /&gt;
        </h2>
    `;

    const app = document.querySelector('#app');

    if (app?.parentNode) {
        app.parentNode.insertBefore(loader, app);
    } else {
        document.body.prepend(loader);
    }

    return loader;
};
