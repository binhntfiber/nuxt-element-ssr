import type { CHAIN } from '@/types/chain.type'
import { AvailableConnectors } from '@/types/connector.type'
import { useStorage } from '@vueuse/core'
import { SAVED_CONNECTOR_KEY, CHAIN_INFO } from '@/constants'
const provider = ref<any>(null)

export const useConnectWallet = () => {
  const cachedConnector = useStorage(SAVED_CONNECTOR_KEY, () => '')
  const address = useState('address', () => '')
  const chainId = useState<CHAIN | null>('CONNECTED_CHAIN', () => null)
  const showModalConnect = useState('showModalConnect', () => false)
  const connectFunc = ref<Function | null>(null)
  const config = useRuntimeConfig()
  const APP_CHAIN_ID = computed(() => Number(chainId.value || config.public.DEFAULT_CHAIN) as CHAIN)
  const APP_CHAIN_DATA = computed(() => CHAIN_INFO[APP_CHAIN_ID.value])
  const resetState = () => {
    if (provider.value) {
      if (provider.value.close) {
        provider.value.close()
      }
      if (provider.value.removeAllListeners) {
        provider.value.removeAllListeners()
      }
    }
    address.value = ''
    cachedConnector.value = ''
    provider.value = null
    connectFunc.value = null
    window.localStorage.removeItem(SAVED_CONNECTOR_KEY)
    if (window.localStorage.getItem('walletconnect')) {
      window.localStorage.removeItem('walletconnect')
    }
    if (window.localStorage.getItem('WALLETCONNECT_DEEPLINK_CHOICE')) {
      window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE')
    }
  }

  const subscribe = () => {
    if (provider.value) {
      provider.value.on('accountsChanged', (accounts: string[]) => {
        if (accounts && accounts.length !== 0) {
          if (address.value === accounts[0]) return
          return (address.value = accounts[0])
        }
        resetState()
      })
      provider.value.on('chainChanged', (networkId: string) => {
        const networkIdParsed = Number(networkId)
        if (networkIdParsed === Number(chainId.value)) return
        if (config.public.APP_SUPPORTED_CHAINS.includes(networkIdParsed)) {
          chainId.value = networkIdParsed
          if (connectFunc.value) {
            connectFunc.value(networkIdParsed)
          }
        } else {
          resetState()
        }
      })

      provider.value.on('disconnect', (error: Error) => {
        if (cachedConnector.value === 'metamask') return
        console.error(error)
        resetState()
      })
    }
  }
  const updateState = ({
    connectedAddress,
    connectedProvider,
    connectedChainId,
    connector,
    connectorFunc,
  }: {
    connectedAddress: string
    connectedProvider: any
    connectedChainId: number
    connector: string
    connectorFunc: Function
  }) => {
    address.value = connectedAddress
    provider.value = connectedProvider
    chainId.value = connectedChainId
    connectFunc.value = connectorFunc
    cachedConnector.value = connector
    window.localStorage.setItem(SAVED_CONNECTOR_KEY, connector)
    subscribe()
  }
  const switchChainFunc = computed(() => {
    if (address.value && cachedConnector.value === AvailableConnectors.METAMASK) {
      return connectFunc.value
    }
    return null
  })
  const setModalConnectState = (show: boolean) => {
    showModalConnect.value = show
  }
  const updateChainId = (chain: number) => {
    chainId.value = chain
  }
  return {
    updateState,
    address,
    provider,
    chainId,
    resetState,
    cachedConnector,
    showModalConnect,
    setModalConnectState,
    connectFunc,
    switchChainFunc,
    updateChainId,
    APP_CHAIN_ID,
    APP_CHAIN_DATA,
  }
}
