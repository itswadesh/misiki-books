import { join } from 'path'
require("dotenv").config();
const { API_URL, head, HOST } = require("./config");
export default {
  mode: 'universal',
  head,
  css: [],
  plugins: [{ src: "~/plugins/lazy.js", mode: "client" }],
  buildModules: ['@nuxtjs/tailwindcss'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    "@nuxtjs/toast"
  ],
  toast: {
    singleton: true
  },
  axios: {
  },
  build: {
    extend(config, { isDev, isClient }) {
      config.node = { fs: 'empty' };
    },
    postcss: {
      plugins: {
        tailwindcss: join(__dirname, 'tailwind.config.js'),
        'postcss-pxtorem': {
          propList: [
            '*',
            '!border*',
          ]
        }
      }
    }
  }
}
