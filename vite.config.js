/*
    *  -------------------------------------------------  *
    *  -----  vite.config.js  --  /vite.config.js  -----  *
    *  -------------------------------------------------  *
*/


import { defineConfig } from 'vite';
import path from 'path';

/** @type {string} - `-----  Base pública de la aplicación servida por Vite  -----` */
const appBase = '/mis-plugins-spa/spa-loader-content-for-vite-v2/';

/** @typedef {{ url?: string }} RewriteRequest */
/** @typedef {unknown} RewriteResponse */
/** @typedef {(error?: unknown) => void} RewriteNext */
/** @typedef {(req: RewriteRequest, _res: RewriteResponse, next: RewriteNext) => void} RewriteHandler */
/** @typedef {{ use: (handler: RewriteHandler) => void }} MiddlewaresServer */


/** - `-----  Base pública de la aplicación servida por Vite sin slash final  -----` */
const appBaseWithoutTrailingSlash = appBase.endsWith('/')
    ? appBase.slice(0, -1)
    : appBase;


/**
 * -------------------------------------------------------
 * -----  `rewriteBaseWithoutTrailingSlashPlugin()`  -----
 * -------------------------------------------------------
 * Plugin de Vite para reescribir internamente la URL sin slash final en la base  -----
 * Esto permite que Vite sirva el contenido correctamente sin mostrar error 404
 * cuando se accede a la base sin slash final.
 * @returns {import('vite').Plugin}
 */
const rewriteBaseWithoutTrailingSlashPlugin = () => {

    /**
     * Reescribe internamente la URL sin slash final en la base
     * para que Vite sirva el contenido sin mostrar error.
     * @param {MiddlewaresServer} middlewares
     */
    const addRewriteMiddleware = (middlewares) => {

        /** @type {RewriteHandler} */
        const rewriteHandler = (req, _res, next) => {

            const currentUrl = req.url || '';
            const [pathname, ...queryParts] = currentUrl.split('?');

            if (pathname === appBaseWithoutTrailingSlash) {
                const query = queryParts.length > 0 ? `?${queryParts.join('?')}` : '';
                req.url = `${appBase}${query}`;
            }

            next();
        };

        middlewares.use(rewriteHandler);
    };


    return {
        
        name: 'rewrite-base-without-trailing-slash',
        
        /** @param {import('vite').ViteDevServer} server */
        configureServer(server) {
            addRewriteMiddleware(server.middlewares);
        },
        /** @param {import('vite').ViteDevServer} server */
        configurePreviewServer(server) {
            addRewriteMiddleware(server.middlewares);
        }
    };
};


export default defineConfig({

    base: appBase,

    plugins: [
        rewriteBaseWithoutTrailingSlashPlugin(),
    ],

    resolve: {
                
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@app': path.resolve(__dirname, './src/app'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@plugins': path.resolve(__dirname, './src/plugins'),
            '@routes': path.resolve(__dirname, './src/routes'),
            '@scripts': path.resolve(__dirname, './src/scripts'),
            '@spa': path.resolve(__dirname, './src/spa'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@types': path.resolve(__dirname, './src/types'),
            '@utils': path.resolve(__dirname, './src/utils')
        }
    }
    
});
