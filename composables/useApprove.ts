import type { WatchSource } from 'vue'
import { DEFAULT_APPROVE_AMOUNT } from '@/constants'
import { checkAllowance, approve } from '@/services/blockchain/erc20'
import { BigNumber, unshift, isNativeAsset, toComputeds } from '@/utils'
import type { SendTxOptions } from '@/types'

export const useApprove = (options: {
  spenderAddress: WatchSource<string | undefined>
  tokenAddress: WatchSource<string | undefined>
  tokenDecimals: WatchSource<number | undefined>
  amount: WatchSource<string>
}) => {
  const {
    spenderAddress, //
    tokenAddress,
    tokenDecimals,
    amount,
  } = toComputeds({
    ...options,
  })
  const allowance = ref('0')
  const isFetchedAllowance = ref(false)
  const loading = ref(false)
  const approveDataMap = useState<Record<string, string>>(
    'approveDataMap',
    () => ({})
  )
  const { address, APP_CHAIN_ID } = useConnectWallet()
  const shouldApprove = computed(() => {
    return (
      !!address.value &&
      new BigNumber(allowance.value).lt(amount.value) &&
      isFetchedAllowance.value
    )
  })
  const updateAllowance = async (forceUpdate = false) => {
    if (!address.value) {
      allowance.value = '0'
      isFetchedAllowance.value = false
    } else if (
      tokenAddress.value &&
      spenderAddress.value &&
      tokenDecimals.value
    ) {
      if (isNativeAsset(tokenAddress.value)) {
        allowance.value = DEFAULT_APPROVE_AMOUNT
      } else {
        const key = `${address.value}_${tokenAddress.value}_${spenderAddress.value}`
        const cachedAllowance = approveDataMap.value[key]
        if (cachedAllowance && !forceUpdate) {
          allowance.value = cachedAllowance
          isFetchedAllowance.value = true
          return
        }
        const rawAllowance = await checkAllowance({
          tokenAddress: tokenAddress.value,
          userAddress: address.value,
          spenderAddress: spenderAddress.value,
          chainId: APP_CHAIN_ID.value,
        })
        allowance.value = unshift(rawAllowance, tokenDecimals.value)
        approveDataMap.value[key] = allowance.value
      }

      isFetchedAllowance.value = true
    }
  }
  const handleApprove = async (symbol?: string) => {
    loading.value = true
    const txConfirmContent = `Approve ${symbol || 'token'} spending`
    const options: SendTxOptions = {
      call: approve,
      params: {
        tokenAddress: tokenAddress.value || '',
        amount: DEFAULT_APPROVE_AMOUNT,
        spender: spenderAddress.value || '',
      },
      txConfirmContent,
      txSuccessContent: `Approve ${symbol || 'token'} spending`,
    }
    await useSendTx(options)
    updateAllowance(true)
    loading.value = false
  }
  watch([address, tokenAddress], () => updateAllowance(), {
    immediate: true,
  })

  return {
    shouldApprove,
    isFetchedAllowance,
    loading,
    allowance,
    updateAllowance,
    handleApprove,
  }
}
