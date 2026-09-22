# Svgdad

Savage Dad streetwear storefront — Angular PWA deployed at https://svgdad.store.
Angular CLI + TypeScript + SCSS + Angular Material (Material 3 tokens), NgRx state,
lazy-loaded feature modules, service-worker PWA (`ngsw-config.json`).

## Savage Dad Design System (current, matches `src/assets/styles.scss`)

The live theme is **dark street mode** — NOT default Material indigo. All colors
are CSS custom properties (`--sd-*`) defined in `src/assets/styles.scss`:

| Token | Value | Use |
| :---- | :---- | :---- |
| `--sd-bg` | `#1F1B16` | Page background (street black) |
| `--sd-surface` | `#2B2723` | Surface |
| `--sd-surface-card` | `#25211D` (hover `#322D27`) | Cards |
| `--sd-border` | `#3E372E` (light `#524A3F`) | Borders |
| `--sd-primary` | `#FFB683` | Primary (Sunburn Orange, dark-mode value) |
| `--sd-primary-dark` | `#A63E00` | Sunburn Orange (light-mode / active) |
| `--sd-secondary` | `#DBC0A3` | Earthy Tan accents |
| `--sd-text-primary` | `#EBE1D9` | Body text |
| `--sd-text-muted` | `#A89F95` | Muted text |
| `--sd-success` | `#A8D773` | Success states |
| `--sd-error` | `#FFB4AB` | Error states |
| `--sd-cta-bg` / `--sd-cta-text` | `#FFB683` on `#1F1B16` | CTA buttons |

Typography: **Bangers** for display/headings (H1 48px, H2 32px), **Roboto**
(300/400/500/700) for all body, nav, and buttons (CTA 14px bold).

Full brand rules: see [The Savage Dad Style Guide.md](./The%20Savage%20Dad%20Style%20Guide.md)
(brand persona, tone tables, M3 token overrides, imagery rules). Imagery:
high-contrast desaturated street photography on charcoal/black backgrounds.

Legacy note: `styles.scss` still imports the prebuilt `indigo-pink.css` theme for
Material base styles — component SCSS overrides all indigo/pink defaults with the
`--sd-*` tokens. Do not introduce indigo (#3f51b5) / pink (#f44336, #ff4081)
anywhere in new code.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deployment

`./deploy.sh` — builds and ships to the production host (`/var/www/svgdad/html`,
nginx `svgdad.conf`, domains `svgdad.store` / `svgdad.shop`).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
