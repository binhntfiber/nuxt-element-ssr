import Cleave from 'cleave.js'

export default defineNuxtPlugin((nuxtApp) =>
  nuxtApp.vueApp.directive('format', {
    mounted: (el, binding) => {
      el.cleave = new Cleave(el, binding.value || { numeral: true })
    },
    beforeUpdate: (el, binding) => {
      if (binding.value.numeralDecimalScale !== binding.oldValue.numeralDecimalScale) {
        el.cleave.destroy()
        el.cleave = new Cleave(el, binding.value || { numeral: true })
      }
    },
    updated: (el) => {
      const event = new Event('input', { bubbles: true })
      setTimeout(() => {
        el.value = el.cleave.properties.result
        el.dispatchEvent(event)
      }, 100)
    },
    beforeUnmount: (el) => {
      el.cleave.destroy()
    },
  })
)
