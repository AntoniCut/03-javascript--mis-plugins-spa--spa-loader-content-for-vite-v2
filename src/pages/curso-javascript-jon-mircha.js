/*
    -------------------------------------------------------
    ----------  javascript.antonydev.tech  ----------------
    ----------  /src/pages/  ------------------------------
    ----------  /curso-javascript-jon-mircha.js  ----------
    -------------------------------------------------------
*/


/**
 * - Página/componente `Curso de JavaScript con Jon Mircha`
 * @returns {HTMLDivElement}
 */

export const CursoJavascriptJonMircha = () => {
    
    /**
     * - `Div principal de la página`
     * @type {HTMLDivElement}
     */
    const $div = document.createElement('div');
    
    $div.id = 'cursoJavascriptJonMircha';
    $div.className = 'layout__main';
    
    $div.innerHTML = `
        
        <h2> Curso de JavaScript con Jon Mircha </h2>

        <p> 
            Bienvenido a la página del curso de JavaScript con Jon Mircha. 
            Aquí encontrarás recursos y materiales relacionados con el curso impartido por Jon Mircha. 
            Explora y aprovecha al máximo este contenido para mejorar tus habilidades en JavaScript.
        </p>
    `;

    return $div;

};
