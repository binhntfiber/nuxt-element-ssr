import { CHAIN } from './chain.type'

export interface TokenData {
  address: string
  name: string
  decimals: number
  symbol: string
  chainId: CHAIN
  iconURI?: string
}
