export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    html.head.push('<script >window.global = window </script>')
    html.head.push(`<script type="module">
        import { Buffer } from '/buffer.js'

        window.Buffer = Buffer || []
        window.process = window.process || { env: {} }

      </script>`)
  })
})
