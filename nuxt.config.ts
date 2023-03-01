import path from 'path'
import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { CHAIN } from './types'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // server side rendering mode
  ssr: true,
  runtimeConfig: {
    public: {
      DEFAULT_CHAIN: process.env.NUXT_DEFAULT_CHAIN,
      METAMASK_DAPP_LINK: process.env.NUXT_METAMASK_DAPP_LINK,
      API_BASE_URL: process.env.NUXT_API_BASE_URL,
      DEFAULT_GAS_LIMIT: process.env.NUXT_DEFAULT_GAS_LIMIT,
      GAS_LIMIT_BUFFER_RATIO: process.env.NUXT_GAS_LIMIT_BUFFER_RATIO,
      GAS_PRICE_BUFFER_RATIO: process.env.NUXT_GAS_PRICE_BUFFER_RATIO,
      BLOCKS_PER_YEAR: process.env.NUXT_BLOCKS_PER_YEAR,
      APP_SUPPORTED_CHAINS: (process.env.NUXT_SUPPORTED_CHAINS as string)
        .split(',')
        .map((el) => Number(el.trim()) as CHAIN),
    },
  },
  // typescripts
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // css
  css: [
    'virtual:windi-base.css',
    'virtual:windi-components.css',
    'virtual:windi-utilities.css',
    '~/assets/sass/vendor.scss',
    '~/assets/sass/app.scss',
    'vue-web3-wallets/styles.css',
  ],

  // plugins
  plugins: ['~/plugins/navbar.ts', '~/plugins/vue-web3-wallets.client.ts'],

  // build
  build: {
    transpile: ['@headlessui/vue', 'vue-toastification'],
  },

  // modules
  modules: [
    'unplugin-icons/nuxt',
    '@intlify/nuxt3',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-windicss',
    '@element-plus/nuxt',
  ],

  // experimental features
  experimental: {
    reactivityTransform: false,
  },

  // auto import components
  components: true,

  // vite plugins
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
    resolve: {
      alias: {
        process: 'process/browser',
        stream: 'stream-browserify',
        zlib: 'browserify-zlib',
        util: 'util',
        '@': path.resolve(__dirname, ''),
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
        // plugins: [NodeGlobalsPolyfillPlugin()],
      },
    },
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
    //     },
    //   },
    // },
  },

  // app config
  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },

  // localization - i18n config
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'en',
      fallbackLocale: 'en',
      availableLocales: ['en', 'id', 'ja', 'ko'],
    },
  },

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // windicss
  windicss: {
    analyze: {
      analysis: {
        interpretUtilities: false,
      },
      server: {
        port: 4000,
        open: false,
      },
    },
    scan: true,
  },
  // vuestic: {
  //   config: {
  //     colors: {
  //       variables: {
  //         // Default colors
  //         primary: '#F56435',
  //         secondary: '#002c85',
  //         success: '#40e583',
  //         info: '#2c82e0',
  //         danger: '#e34b4a',
  //         warning: '#ffc200',
  //         gray: '#babfc2',
  //         dark: '#34495e',

  //         // Custom colors
  //         yourCustomColor: '#d0f55d',
  //       },
  //     },
  //   },
  // },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },
})
