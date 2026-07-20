# spa-loader-content-for-vite-v2

Plugin SPA con Vite. Lazy loading de rutas con `import.meta.glob` y componentes JS en layouts fijos.

## Scripts

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Plugin

Documentación del plugin y eventos: [`src/plugins/spa-loader-content-for-vite/README.md`](src/plugins/spa-loader-content-for-vite/README.md).

## v2.1 — mejoras portadas desde spa-loader-content-html v3

- Eventos `spa:route-loaded`, `spa:first-route-loaded`, `spa:route-load-error`
- 404 en init / click / popstate
- History state rico + favicon sin flicker
- Swap de estilos por página (`data-page-style`)
- View Transitions awaited + títulos header/footer
- Loader inicial (`effectLoadingPage`)
