# spa-loader-content-for-vite (v2.1)

Plugin SPA para Vite: monta componentes JS en layouts fijos con lazy loading vía `import.meta.glob`.

## Forma de una ruta

```js
export const routeAstroPage = {
  id: 'astroPage',
  path: 'astro-page',
  components: {
    layoutHeader: Header,
    layoutNavbar: Navbar,
    layoutMain: Main(astroPage),
    layoutFooter: Footer,
  },
  favicon: `${base}/favicon/astro-official.svg`,
  pageTitle: 'Astro — Framework de Sitios Estáticos',
  headerTitle: 'Astro — Framework de Sitios Estáticos',
  styles: astroPageRouteStyles,
  scripts: [mountAstroPage],
};
```

Las claves de `components` son slots de layout (`layoutHeader`, …). El plugin itera el mapa y monta cada factory en el selector definido en la config del mismo nombre.

## Uso

```js
import { spaLoaderContentForVite } from '@plugins/spa-loader-content-for-vite/spa-loader-content-for-vite.js';

spaLoaderContentForVite({
  routeManifest,
  routeModules, // import.meta.glob('./route-*.js')
  base: import.meta.env.BASE_URL.replace(/\/$/, ''),
});
```

## Eventos del ciclo de vida

| Evento | Cuándo | `detail` |
|--------|--------|----------|
| `spa:route-loaded` | Tras renderizar DOM + scripts de una ruta | `{ id, path }` |
| `spa:first-route-loaded` | Una sola vez (éxito o error de la primera carga) | — |
| `spa:route-load-error` | Fallo al cargar ruta / 404 no configurado | `{ id, path, source, message }` |

El loader inicial (`effectLoadingPage`) espera `spa:first-route-loaded` (o `spa:route-load-error` / timeout) antes de ocultarse.

```js
document.addEventListener('spa:route-loaded', (e) => {
  console.log(e.detail.id, e.detail.path);
});
```

## Navegación

- Enlaces: `a[data-id]` (y opcionalmente `data-route` con el nombre de archivo del módulo).
- 404 en `init`, `click` y `popstate` si la ruta no existe.
- `history.state`: `{ id, path, routeFile, favicon }`.
- Favicon con clave estable por sesión (sin parpadeo al volver atrás).

## Estilos por página

`route.styles` (string, típico `?url` de Vite) se inserta como `link[data-page-style="true"]`.

- Title y favicon se aplican al inicio de la navegación (sin esperar al paint).
- El CSS se descarga en paralelo al DOM; el link nuevo se inserta antes de quitar el anterior (sin FOUC).
- Con View Transitions se espera `updateCallbackDone` (DOM listo), no `finished` (fin de animación).

## Qué no hace (a propósito)

- No hace `fetch` de HTML (usa factories de componentes + `?raw`).
- No usa `routeModulesBase` ni scripts por URL; los scripts son funciones bundladas.

## Mejoras respecto a v2.0 (alineadas con el plugin HTML v3)

- Emisión real de eventos de ciclo de vida (las demos ya los escuchaban).
- Fallback 404 en click y popstate.
- History/favicon más robustos.
- Swap de CSS por página.
- Await de View Transitions + títulos en header y footer (`#headerTitle`, `#footerTitle`).
