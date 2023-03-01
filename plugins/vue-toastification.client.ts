import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css' // if needed

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: POSITION.BOTTOM_RIGHT,
    icon: false,
    toastClassName: 'base-toast',
    closeButton: false,
    hideProgressBar: true,
  })
})
