import type { TransactionReceipt } from 'ethers'

import { useConnectWallet } from './useConnectWallet'
import { useModals } from './useModals'
import NotificationError from '~~/components/Notification/NotificationTxError.vue'
import NotificationSuccess from '~~/components/Notification/NotificationTxSuccess.vue'
import type { SendTxOptions } from '~/types'

export const useSendTx = async (options: SendTxOptions) => {
  const { address, provider, APP_CHAIN_ID } = useConnectWallet()
  const { setModalTxSubmitted, setModalWaitingTxState, setModalTxRejected } = useModals()
  const { toastError, toast, toastSuccess } = useToastification()
  const receipt = ref<TransactionReceipt>()
  const loadingUserConfirm = ref(false)
  const loadingTx = ref(false)
  const txHashesPending = useState<string[]>('txHashesPending', () => [])
  const action = async () => {
    try {
      setModalWaitingTxState(true, options.txConfirmContent)
      const txHashCallback = (hash: string) => {
        loadingTx.value = true
        loadingUserConfirm.value = false
        setModalWaitingTxState(false)
        setModalTxSubmitted(true, hash)
        txHashesPending.value.push(hash)
      }
      if (options.call) {
        const txReceipt = await options.call({
          ...options.params,
          getTxHashCallback: txHashCallback,
          account: address.value,
          provider: provider.value,
          chainId: APP_CHAIN_ID.value,
        })
        receipt.value = txReceipt

        loadingTx.value = false
        setModalTxSubmitted(false)
        txHashesPending.value = txHashesPending.value.filter((el) => el !== receipt.value?.hash)
        toast({
          component: NotificationSuccess,
          props: {
            title: options.txSuccessContent,
            txHash: receipt.value?.hash,
          },
        })
      }
    } catch (error: any) {
      loadingUserConfirm.value = false
      loadingTx.value = false
      txHashesPending.value = txHashesPending.value.filter((el) => el !== receipt.value?.hash)

      receipt.value = undefined
      console.error(error)
      console.debug({ error })
      setModalWaitingTxState(false)
      if (error && (error.code === 4001 || error.code === 'ACTION_REJECTED')) {
        setModalTxRejected(true)
      } else {
        toast({
          component: NotificationError,
          props: {
            error: error && error.message ? error.message : error,
          },
        })
      }
    }
  }
  await action()
}
