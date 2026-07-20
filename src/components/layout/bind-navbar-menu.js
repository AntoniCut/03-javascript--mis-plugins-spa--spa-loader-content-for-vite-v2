/*
    *  ---------------------------------------------------------------------------------  *
    *  -----  bind-navbar-menu.js  --  /src/components/layout/bind-navbar-menu.js  -----  *
    *  ---------------------------------------------------------------------------------  *
*/


/**
 * --------------------------------
 * -----  `slideDown()`  ----------
 * --------------------------------
 * - Despliega el navbar animando `margin-top` (-100% → 0), igual que el plugin SPA v3.
 * @param {HTMLElement} element
 * @param {number} [duration=300]
 */
const slideDown = (element, duration = 300) => {

    if (window.getComputedStyle(element).display !== 'none')
        return;

    element.style.removeProperty('display');

    let display = window.getComputedStyle(element).display;
    if (display === 'none')
        display = 'flex';

    element.style.display = display;
    element.style.marginTop = '-100%';
    element.style.transitionProperty = 'margin-top';
    element.style.transitionDuration = `${duration}ms`;
    element.style.transitionTimingFunction = 'cubic-bezier(0.22, 1, 0.36, 1)';
    element.style.willChange = 'margin-top';

    element.offsetHeight;

    requestAnimationFrame(() => {
        element.style.marginTop = '0';
    });

    window.setTimeout(() => {
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
        element.style.removeProperty('transition-timing-function');
        element.style.removeProperty('will-change');
    }, duration);
};


/**
 * --------------------------------
 * -----  `slideUp()`  ------------
 * --------------------------------
 * - Oculta el navbar animando `margin-top` (0 → -100%), igual que el plugin SPA v3.
 * @param {HTMLElement} element
 * @param {number} [duration=300]
 */
const slideUp = (element, duration = 300) => {

    if (window.getComputedStyle(element).display === 'none')
        return;

    element.style.transitionProperty = 'margin-top';
    element.style.transitionDuration = `${duration}ms`;
    element.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 1, 1)';
    element.style.willChange = 'margin-top';

    element.offsetHeight;

    requestAnimationFrame(() => {
        element.style.marginTop = '-100%';
    });

    window.setTimeout(() => {
        element.style.display = 'none';
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
        element.style.removeProperty('transition-timing-function');
        element.style.removeProperty('will-change');
    }, duration);
};


/**
 * ------------------------------------
 * -----  `bindNavbarMenu()`  ---------
 * ------------------------------------
 * - Enlaza el menú hamburguesa (open/close) al estilo del plugin SPA v3.
 * - Seguro de llamar tras cada re-render del layout.
 */
export const bindNavbarMenu = () => {

    const OPEN_DURATION = 560;
    const CLOSE_DURATION = 360;

    const navbar = document.querySelector('.navbar__container');
    const btnOpen = document.querySelector('.navbar__btn-open');
    const btnClose = document.querySelector('.navbar__btn-close');

    if (!navbar || !btnOpen || !btnClose)
        return;

    const lockBodyScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const unlockBodyScroll = () => {
        document.body.style.removeProperty('overflow');
    };

    const newBtnOpen = /** @type {HTMLElement} */ (btnOpen.cloneNode(true));
    btnOpen.parentNode?.replaceChild(newBtnOpen, btnOpen);

    const newBtnClose = /** @type {HTMLElement} */ (btnClose.cloneNode(true));
    btnClose.parentNode?.replaceChild(newBtnClose, btnClose);

    navbar.style.display = 'none';
    newBtnClose.style.display = 'none';

    newBtnOpen.addEventListener('click', (e) => {
        e.stopPropagation();
        newBtnOpen.style.display = 'none';
        newBtnClose.style.display = 'flex';
        lockBodyScroll();
        slideDown(navbar, OPEN_DURATION);
    });

    newBtnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        newBtnClose.style.display = 'none';
        newBtnOpen.style.display = 'flex';
        slideUp(navbar, CLOSE_DURATION);
        unlockBodyScroll();
    });

    if (!document.body.dataset._spaClickBound) {
        document.addEventListener('click', () => {
            try {
                const currentNavbar = document.querySelector('.navbar__container');
                const currentBtnClose = document.querySelector('.navbar__btn-close');
                const currentBtnOpen = document.querySelector('.navbar__btn-open');

                if (!currentNavbar || !currentBtnClose || !currentBtnOpen)
                    return;

                if (window.getComputedStyle(currentNavbar).display === 'none')
                    return;

                slideUp(currentNavbar, CLOSE_DURATION);
                currentBtnClose.style.display = 'none';
                currentBtnOpen.style.display = 'flex';
                unlockBodyScroll();
            } catch {
                // navbar ausente en alguna vista
            }
        });

        document.body.dataset._spaClickBound = '1';
    }
};
