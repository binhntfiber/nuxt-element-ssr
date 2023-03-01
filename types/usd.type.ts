export interface CoingeckoSupportedCurrency {
  id: string
  symbol: string
  name: string
}

export type CoinGeckoUsdPrice = {
  usd: number
}

export type CoinGeckoPriceResponseData = Record<string, CoinGeckoUsdPrice>
