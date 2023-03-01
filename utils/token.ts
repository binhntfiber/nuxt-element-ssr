import { getAddress } from '@ethersproject/address'
import { ZERO_ADDRESS } from '@/constants'

export const isAddress = (val: string) => {
  try {
    return getAddress(val)
  } catch {
    return false
  }
}

export const isNativeAsset = (address: string) => {
  return address.toLowerCase() === ZERO_ADDRESS.toLowerCase()
}
