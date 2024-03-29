import { BrowserProvider, Interface } from 'ethers'

import { getErc20Contract, getMultiCallContract } from '@/utils/contract'
import { getLibrary } from '@/utils/provider'
import type { Call, CHAIN, TokenData } from '@/types'
import { Erc20Abi } from '@/abis'
import { unshift } from '@/utils/bignumber'
import {
  useSingleCallResult,
  useSingleContractMultipleMethods,
  useMultipleContractSingleData,
  calldata,
} from './multicall'
import { sendRawTx } from './ethers'
import type { CallDataResult } from './multicall'

export const compareAddress = (address1?: string, address2?: string) => {
  return address1 && address2 && address1.toLowerCase() === address2.toLowerCase()
}

export const getTokenData = async (address: string, chainId: CHAIN): Promise<TokenData> => {
  try {
    const erc20Contract = getErc20Contract(chainId, address)
    const response = await useSingleContractMultipleMethods({
      contract: erc20Contract,
      methodNames: ['name', 'symbol', 'decimals'],
      callInputs: [[], [], []],
      chainId,
    })
    const [name, symbol, decimals] = response
    return {
      chainId,
      name: name.result[0],
      decimals: decimals.result[0],
      symbol: symbol.result[0],
      address,
    }
  } catch (error) {
    console.error(error)
    return {
      chainId,
      name: '',
      decimals: 18,
      symbol: '',
      address,
    }
  }
}

export const getMultipleTokensData = async (
  addresses: string[],
  chainId: CHAIN
): Promise<TokenData[]> => {
  const symbolCalls: Call[] = addresses.map((address) => ({
    name: 'symbol',
    params: [],
    address,
  }))
  const nameCalls: Call[] = addresses.map((address) => ({
    name: 'name',
    params: [],
    address,
  }))
  const decimalsCalls: Call[] = addresses.map((address) => ({
    name: 'decimals',
    params: [],
    address,
  }))
  const calls = [...symbolCalls, ...nameCalls, ...decimalsCalls]
  const response = await calldata({
    itf: new Interface(Erc20Abi),
    calls,
    chainId,
  })
  const symbols = response
    .filter((_: CallDataResult, idx: number) => idx < addresses.length)
    .map((el: CallDataResult) => el.data[0]) as string[]
  const names = response
    .filter(
      (_: CallDataResult, idx: number) => idx >= addresses.length && idx < addresses.length * 2
    )
    .map((el: CallDataResult) => el.data[0]) as string[]
  const reservesDecimals = response
    .filter((_: CallDataResult, idx: number) => idx >= addresses.length * 2)
    .map((el: CallDataResult) => el.data[0]) as number[]
  return addresses.map((el, idx) => {
    const symbol = symbols[idx]
    const name = names[idx]
    const decimals = reservesDecimals[idx]
    return {
      address: el,
      symbol,
      name,
      decimals,
      chainId,
    }
  })
}

export const getNativeBalance = async ({
  address,
  chainId,
  decimals,
}: {
  address: string
  chainId: CHAIN
  decimals?: number
}) => {
  const response = await useSingleCallResult({
    contract: getMultiCallContract(chainId),
    methodName: 'getEthBalance',
    inputs: [address],
    chainId,
  })
  return unshift(response.result[0].toString(), decimals || 18)
}

export const getTokenBalances = async ({
  account,
  chainId,
  tokens,
}: {
  account: string
  chainId: CHAIN
  tokens: TokenData[]
}) => {
  try {
    const balances = await useMultipleContractSingleData({
      addresses: tokens.map((item) => item.address),
      contractInterface: new Interface(Erc20Abi),
      methodName: 'balanceOf',
      inputs: [account],
      chainId,
    })
    return tokens.map((item, i) => {
      const value = balances?.[i]?.result?.[0].toString()
      return unshift(value, item.decimals)
    })
  } catch (error) {
    console.error(error)
    return null
  }
}

export const checkAllowance = async ({
  tokenAddress,
  userAddress,
  spenderAddress,
  chainId,
}: {
  tokenAddress: string
  userAddress: string
  spenderAddress: string
  chainId: CHAIN
}) => {
  const { result } = await useSingleCallResult({
    contract: getErc20Contract(chainId, tokenAddress),
    methodName: 'allowance',
    inputs: [userAddress, spenderAddress],
    chainId,
  })
  return result[0].toString()
}

export const approve = async ({
  provider,
  account,
  tokenAddress,
  chainId,
  amount,
  spender,
  getTxHashCallback,
}: {
  provider: BrowserProvider
  account: string
  tokenAddress: string
  chainId: CHAIN
  amount: string
  spender: string
  getTxHashCallback?: Function
}) => {
  const library = getLibrary(provider)
  const contract = getErc20Contract(chainId, tokenAddress, await library.getSigner(account))
  const results = await sendRawTx({
    account,
    action: 'approve',
    params: [spender, amount],
    contract,
    chainId,
    getTxHashCallback,
  })
  return results
}

export const transfer = async ({
  provider,
  account,
  tokenAddress,
  chainId,
  amount,
  to,
  getTxHashCallback,
}: {
  provider: BrowserProvider
  account: string
  tokenAddress: string
  chainId: CHAIN
  amount: string
  to: string
  getTxHashCallback?: Function
}) => {
  const library = getLibrary(provider)
  const contract = getErc20Contract(chainId, tokenAddress, await library.getSigner(account))
  const results = await sendRawTx({
    account,
    action: 'transfer',
    params: [to, amount],
    contract,
    chainId,
    getTxHashCallback,
  })
  return results
}
