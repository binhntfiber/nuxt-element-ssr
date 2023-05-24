import { ethers } from 'ethers'
import { CHAIN_INFO } from '@/constants/chains'
import type { CHAIN } from '@/types/chain.type'

export const getSimpleRpcProvider = (chainId: CHAIN) => {
  const chainInfo = CHAIN_INFO[chainId]
  return new ethers.JsonRpcProvider(chainInfo.rpcUrl)
}

export const getLibrary = (provider: any) => {
  const library = new ethers.BrowserProvider(provider)
  return library
}
