export enum CHAIN {
  FANTOM_TESTNET = 4002,
  FANTOM_MAINNET = 250,
  FUSE_TESTNET = 123,
  FUSE_MAINNET = 122,
  AVAX_TESTNET = 43113,
  AVAX_MAINNET = 43114,
  HUOBI_TESTNET = 256,
  HUOBI_MAINNET = 128,
  NAHMII_TESTNET = 5553,
  NAHMII_MAINNET = 5551,
}

export interface ChainOption {
  explorer: string
  name: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
    coingeckoId: string
  }
  rpcUrl: string
}

export type ChainInfo = Record<CHAIN, ChainOption>
