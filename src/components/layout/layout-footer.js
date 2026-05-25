/*
    -------------------------------------------------
    ----------  javascript.antonydev.tech  ----------
    ----------  /src/components/layout/  ------------
    ----------  /layout-footer.js  ------------------
    -------------------------------------------------
*/


/**
 * - Componente `Footer de la aplicación`
 */
export const Footer = () => {
    
    /**
     * - `Footer de la aplicación`
     * @type {HTMLFooterElement|null}
     */
    
    const $layoutFooter = document.querySelector('#layoutFooter');
    
    if (!$layoutFooter) 
        throw new Error('No se encontró el elemento #layoutFooter');
    
    $layoutFooter.innerHTML = `
        
        <div class="footer__container">
            
            <span> Todos los derechos reservados </span>
            <h2> javascript.antonydev.tech </h2>
            
        </div>
                
  `;

};
