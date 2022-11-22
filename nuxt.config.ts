import { isProduction } from './helpers'

// Needed to keep `ant-design-vue` running as of latest RC.8, see https://github.com/nuxt/framework/issues/6941#issuecomment-1229739856
const transpile = ['lodash-es', '@heroicons/vue', '@headlessui/vue']
if (isProduction) {
  // For production build via rollup, we need to also transpile babel
  transpile.push('@babel/runtime')
}

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available within server-side
    API_URL: process.env.API_URL,
    API_AUTH_TOKEN: process.env.API_AUTH_TOKEN,
    BUSINESS_ID: process.env.BUSINESS_ID,
    MASCOT_COSTUME_ID: process.env.MASCOT_COSTUME_ID,
    HEAD_ONLY_ID: process.env.HEAD_ONLY_ID,
    BASE_URL: process.env.BASE_URL,
    SITE_URL: process.env.SITE_URL,
    // Keys within public, will be also exposed to the client-side
    public: {
    },
  },

  // Needed to keep `ant-design-vue` running as of latest RC.8, see https://github.com/nuxt/framework/issues/6941#issuecomment-1229739856
  alias: {
    dayjs: 'dayjs/esm/',
  },
  typescript: {
    // We enable `Volar Takeover Mode`, so we can disable the shim `*.vue` generation
    // see https://v3.nuxtjs.org/getting-started/introduction#prerequisites
    shim: false,
  },
  build: { transpile: ['@heroicons/vue', '@headlessui/vue'] },

  modules: [
    'nuxt-security',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/critters',
    '@nuxtjs/fontaine',
    '@nuxtjs/html-validator',
    '@nuxtjs/partytown',
    '@kevinmarrec/nuxt-pwa',
  ],

  pwa: {
    workbox: {
      enabled: false,
    },
    meta: {
      name: 'Progress INDOMASCOT',
      author: 'Jamaluddin Rumi',
      description: 'Progress INDOMASCOT',
      theme_color: '#000000',
      lang: 'id',
      appleStatusBarStyle: 'black',
      ogHost: process.env.BASE_URL,
    },
    manifest: {
      name: 'Progress INDOMASCOT',
      short_name: 'Progress INDOMASCOT',
      description:
        'INDOMASCOT melayani pembuatan kostum badut maskot untuk branding produk atau instansi anda dengan desain dari anda sendiri. (WA 0822-2155-6633)',
      lang: 'id',
      useWebmanifestExtension: false,
    },
  },

  tailwindcss: {
    viewer: false,
  },
})
