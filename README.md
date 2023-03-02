# Nuxt 3 Starter

a Nuxt 3 starter template or boilerplate with a lot of useful features. and integrated with WindiCSS 3.

> **NOTES**
>
> -   This Project using "yarn" as package manager.
> -   Nuxt 3 now in stable version
> -   Breaking changes tracker can be found [here](https://github.com/nuxt/framework/discussions/2883)
> -   Roadmap can be found [here](https://v3.nuxtjs.org/community/roadmap)

## Features

-   [x] 💨 [Tailwind CSS v3](https://tailwindcss.com/) with [Windicss](https://windicss.org/)
-   [x] ✨ [Headless UI](https://headlessui.dev/)
-   [x] 🔔 [Icon Pack Component (unplugin-icons)](https://icones.js.org/)
-   [x] 🛹 [State & Store Management (Pinia)](https://pinia.vuejs.org/)
-   [x] 🚩 [Localization (i18n) by @intlify](https://github.com/intlify/nuxt3) & Auto Generate Locales
-   [x] 📦 [Vue Composition Collection (Vueuse)](https://vueuse.org/)
-   [x] 🌙 Switch Theme (light, dark, system, realtime)
-   [x] 🇮🇩 Language Switcher
-   [x] 🪝 Built-in Component & Layout
-   [x] Eslint & Prettier 
-   [x] Husky & Commitlint
-   [x] Custom Workspace Snippets
-   [x] Built-in Unit Test
-   [x] Configurable Theme
    -   [x] Primary Colors
    -   [x] Font

## To Do

-   [ ] Adding HTTP Client

## Table of Contents

-   [Nuxt 3 Awesome Starter](#nuxt-3-awesome-starter)
    -   [Features](#features)
    -   [To Do](#to-do)
    -   [Preview](#preview)
    -   [Table of Contents](#table-of-contents)
    -   [Quick Start](#quick-start)
        -   [Start with this template](#start-with-this-template)
        -   [Deploy as Static Site](#deploy-as-static-site)
    -   [Built-in Components](#built-in-components)
    -   [Notes](#notes)
        -   [Custom Workspace Snippets](#custom-workspace-snippets)
        -   [Styles](#styles)
        -   [Theme (Dark Mode)](#theme-dark-mode)
        -   [Localization](#localization)
        -   [Generate Locales](#generate-locales)
        -   [Icons](#icons)
        -   [Precommit and Postmerge](#precommit-and-postmerge)

## Quick Start

### Start with this template

-   This project using `yarn` as package manager.
-   Clone this project to your computer `git clone https://github.com/fiberblock/nuxt3-template`
-   Install dependencies `yarn install`
-   Run `yarn dev` to start development server and open `http://localhost:3000` in your browser

### Deploy as Static Site

-   Run `yarn generate` to build the project
-   Serve `dist/` folder
    Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).

## Built-in Components

-   [x] Footer
-   [x] Button
-   [x] Anchor (link)
-   [x] Alert
-   [x] Card
-   [x] Action Sheet
-   [x] Theme Toggle / Switcher
-   [x] Navbar
    -   [x] Navbar Builder
    -   [x] Drawer (on mobile)
    -   [x] Options (on mobile)
-   [x] Page Layout
    -   [x] Wrapper
    -   [x] Header
        -   [x] Title
    -   [x] Body
        -   [x] Section
            -   [x] Section Wrapper
            -   [x] Section Title
-   [x] Dashboard Layout
    -   [x] Sidebar
-   [ ] Modal

## Notes

### Styles

Tailwindcss import managed by windicss.
and you can add custom styles in :

```
/path/to/assets/sass/app.scss
```

### Theme (Dark Mode)

ThemeManager is a plugin that allows you to switch between themes. this lib in :

```
/path/to/utils/theme.ts
```

`Thememanager` is a function-class construct when app.vue before mounted. theme construct inside `AppSetup()` in `/path/to/app.vue` :

```vue
<!-- /path/to/app.vue -->
<script lang="ts" setup>
import { AppSetup } from '~/utils/app';
// app setup
AppSetup();
</script>
```

To change theme, you can direct set theme from state `theme.setting`, example :

```vue
<script lang="ts" setup>
import { IThemeSettingOptions } from '~/utils/theme';
const themeSetting = useState<IThemeSettingOptions>('theme.setting');
themeSetting.value = 'dark';
</script>
```

When you change state `theme.setting`, it will automatically change theme.

Theme Setting have 4 options :

-   `light`
-   `dark`
-   `system` (operating system theme)
-   `realtime` (realtime theme, if 05:00 - 17:00, it will change to light theme, otherwise dark)

We have state `theme.current`, this state return `light` or `dark` theme. basically it's process from `theme.setting`.
dont change theme with this state.

### Localization

Localization is a plugin that allows you to switch between languages. this lib in :

```
/path/to/utils/lang.ts
```

`LanguageManager` is a function-class construct when app.vue before mounted.
this lib depend on [@intlify/nuxt3](https://github.com/intlify/nuxt3)
lang construct inside `AppSetup()` in `/path/to/app.vue` :

<!-- /path/to/app.vue -->
<script lang="ts" setup>
import { AppSetup } from '~/utils/app';
// app setup
AppSetup()
</script>

To change language, you can direct set language from state `lang.setting`, example :

```vue
<script lang="ts" setup>
const langSetting = useState<string>('locale.setting');
langSetting.value = 'en';
</script>
```

When you change state `locale.setting`, it will automatically change language.

### Generate Locales

I made an automatic tool to automatically translate to all languages ​​that have been prepared in the ./locales/ folder
So, you can just update "locales/en.yml" and run this tools, it will automatically translate to all languages.

You can just run :

```
pnpm generate:locales

# or :

node ./tools/translator.js ./locales en.yml
```

### Icons

This project using unplugin-icons for auto generate and import icon as component.

You can see collection icon list in : [https://icones.js.org/](https://icones.js.org/)

you can use `<prefix-collection:icon />` or `<PrefixCollection:Icon />`.

in this project, configuration prefix as a "icon", you can see in `nuxt.config.ts` :

```js
export default defineNuxtConfig({
    ...

    vite: {
        plugins: [
            UnpluginComponentsVite({
                dts: true,
                resolvers: [
                    IconsResolver({
                        prefix: 'Icon',
                    }),
                ],
            }),
        ],
    },

    ...
})
```

Example :

```vue
// use icon from collection "Simple Icons" and name icon is "nuxtdotjs"
<IconSimpleIcons:nuxtdotjs />

// use icon from collection "Unicons" and name icon is "sun"
<IconUil:sun />
```

### Precommit and Postmerge

This project using husky and commitlint for precommit and postmerge.
when you commit, it will check your commit message and running "pnpm lint-staged" to check your staged files.
configuration in : `/path/to/.husky/pre-commit` and `/path/to/commitlint.config.js`

And when Postmerge, it will run "pnpm" to automatically install new dependencies.
configuration in `/path/to/.husky/post-merge`
