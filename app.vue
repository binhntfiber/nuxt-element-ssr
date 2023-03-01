<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import { AppSetup } from './utils/app'
import { ITheme } from './utils/theme'
import type { ConnectorResponse } from '@/types'
import Error from '~~/components/Error.vue'

AppSetup()
const theme = useState<ITheme>('theme.current')
const locale = useState<string>('locale.setting')
const app = useAppConfig() as AppConfigInput
const { $swal } = useNuxtApp()
const { toastError, toast } = useToastification()
const { t } = useLang()
const {
  showModalConnect,
  APP_CHAIN_ID,
  cachedConnector,
  updateState,
  resetState,
  address,
  chainId,
} = useConnectWallet()
useHead({
  title: app.name,
  titleTemplate: '%s - Nuxt 3 Starter',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Nuxt 3 Starter',
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})

const onConnectResponse = (data: ConnectorResponse) => {
  const { account, chainId, id: connectorId, provider, connect } = data
  updateState({
    connectedAddress: account,
    connectedProvider: provider,
    connectedChainId: chainId,
    connector: connectorId,
    connectorFunc: connect,
  })
}

const onConnectError = (error: any) => {
  resetState()
  let message = ''
  if (error?.code === 4001) {
    message = t('message.connect-wallet-rejected-error')
  } else if (error?.message) {
    message = error?.message
  } else {
    message = error
  }

  toast({
    component: Error,
    message: 'Transaction failed',
  })
}
</script>

<template>
  <Html :class="`${theme === 'dark' ? 'dark' : ''}`" :lang="locale">
    <Body
      class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900"
    >
      <NuxtLayout>
        <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
        <NuxtPage />
        <ClientOnly>
          <ConnectComponent
            v-model="showModalConnect"
            :chain="APP_CHAIN_ID"
            :cached-connector="cachedConnector"
            @response="onConnectResponse"
            @error="onConnectError"
          />
          <ModalLogout />
          <ModalTxRejected />
          <ModalTxSubmitted />
          <ModalWaitingTx />
        </ClientOnly>
      </NuxtLayout>
    </Body>
  </Html>
</template>
