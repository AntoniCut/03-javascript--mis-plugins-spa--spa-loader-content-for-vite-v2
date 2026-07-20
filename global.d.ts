/// <reference lib="dom" />
/// <reference lib="es2022" />
/// <reference types="vite/client" />

/**
 * -----  global.d.ts  -----------------------------
 * -------------------------------------------------
 *  Tipos DOM extendidos para compatibilidad
 *  (por si tu versión de lib.dom.d.ts no los incluye)
 * -------------------------------------------------
 */

interface HTMLHeaderElement extends HTMLElement { }
interface HTMLFooterElement extends HTMLElement { }
interface HTMLMainElement extends HTMLElement { }
interface HTMLNavElement extends HTMLElement { }
interface HTMLSectionElement extends HTMLElement { }
interface HTMLArticleElement extends HTMLElement { }
interface HTMLAsideElement extends HTMLElement { }
interface HTMLFigureElement extends HTMLElement { }
interface HTMLFigcaptionElement extends HTMLElement { }


declare module '*.html?raw' {
    const content: string;
    export default content;
}

declare module '*.scss?url' {
    const href: string;
    export default href;
}

declare module '*.css?url' {
    const href: string;
    export default href;
}

declare module '*.scss' {
    const content: string;
    export default content;
}


// Assets como SVGs
declare module '*.svg' {
    const content: string;
    export default content;
}

// CSS Modules o CSS simple
declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

// Otros assets (opcional)
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';

interface ImportMetaEnv {
    readonly BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}


/** Promesas de una View Transition (Chromium / Safari recientes). */
interface ViewTransition {
    readonly updateCallbackDone: Promise<void>;
    readonly ready: Promise<void>;
    readonly finished: Promise<void>;
    skipTransition(): void;
}

interface Document {
    startViewTransition?: (updateCallback: () => void | Promise<void>) => ViewTransition;
}
