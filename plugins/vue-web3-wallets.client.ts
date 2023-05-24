import ConnectPlugin from 'vue-web3-wallets'

export default defineNuxtPlugin((nuxtApp) => ConnectPlugin.install(nuxtApp.vueApp as any))
