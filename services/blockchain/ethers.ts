import type { Transaction, TransactionResponse, Contract } from 'ethers'
import { BigNumber, compare } from '@/utils/bignumber'
import type { CHAIN } from '@/types/chain.type'
import {
  DEFAULT_GAS_PRICE,
  GAS_LIMIT_BUFFER_RATIO,
  GAS_PRICE_BUFFER_RATIO,
  DEFAULT_GAS_LIMIT,
} from '@/constants/common'
import { getSimpleRpcProvider } from '@/utils/provider'

export const getBlockNumber = async (chainId: CHAIN) => {
  const provider = getSimpleRpcProvider(chainId)
  return await provider.getBlockNumber()
}

// export const getGasPrice = async (chainId: CHAIN) => {
//   try {
//     const provider = getSimpleRpcProvider(chainId)

//     const rawGasPrice = new BigNumber((await provider()).toString())
//     const gas = compare('gt')(rawGasPrice)(0) ? rawGasPrice : new BigNumber(DEFAULT_GAS_PRICE)
//     return new BigNumber(gas).plus(gas.times(GAS_PRICE_BUFFER_RATIO)).dp(0).toString()
//   } catch (error) {
//     console.error(error)
//   }
// }

export const estimateGasLimit = async ({
  options,
  contract,
  action,
  params,
  account,
}: {
  options: Transaction | any
  contract: Contract
  action: string
  params: any[]
  account: string
}) => {
  try {
    const rawGasLimit = new BigNumber(
      (
        await contract[action].estimateGas(...params, {
          ...options,
          from: account,
        })
      ).toString()
    )
    return new BigNumber(rawGasLimit)
      .plus(rawGasLimit.times(GAS_LIMIT_BUFFER_RATIO))
      .dp(0)
      .toString()
  } catch (error) {
    console.error('Estimate gas error', error)
    return DEFAULT_GAS_LIMIT
  }
}

export const sendRawTx = async ({
  account,
  action,
  params,
  chainId,
  contract,
  getTxHashCallback,
  options = {},
}: {
  account: string
  action: string
  params: any[]
  chainId: CHAIN
  contract: Contract
  getTxHashCallback?: Function
  options?: any
}) => {
  //   const gasPrice = await getGasPrice(chainId)
  const gasLimit = await estimateGasLimit({
    options,
    account,
    action,
    params,
    contract,
  })

  const rs: TransactionResponse = await contract[action](...params, {
    from: account,
    ...options,
    gasLimit,
  })
  if (getTxHashCallback) getTxHashCallback(rs.hash)
  const response = await rs.wait()
  if (response?.status) return response
  throw new Error('Transaction failed')
}
