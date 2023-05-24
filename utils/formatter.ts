import numeral from 'numeral'
import { BigNumber, compare } from '@/utils/bignumber'
import type { ANumber } from '@/types'

export const shortenAddress = (address: string) => {
  if (!address) {
    return ''
  }
  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
}
export const toCurrency = (
  value: ANumber,
  decimal = 6,
  displayZero = false,
  displayLowerThan = false,
  valueLowerThan = 0.01
) => {
  if (value === null || value === undefined) {
    return '---'
  }
  if (value === 0 || value === '0') return '0'

  if (compare('lt')(value)(valueLowerThan) && displayLowerThan) {
    return `< ${valueLowerThan}`
  }

  value = new BigNumber(value || 0)

  const roundingMode = BigNumber.ROUND_DOWN
  const output = new BigNumber(value).toFormat(decimal, roundingMode).toString()

  const replacedOutput = output.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1')
  if (new BigNumber(value).gt(0) && replacedOutput === '0') {
    return `≈ ${replacedOutput}`
  }
  return replacedOutput
}

export const toPercent = (val: string | number, decimals = 2) => {
  if (val && Number(val)) {
    const roundingMode = BigNumber.ROUND_DOWN
    const percent = new BigNumber(val).times(100).toFormat(decimals, roundingMode).toString()
    const replacedOutput = percent.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1')
    return `${replacedOutput}%`
  }
  return '-'
}

export const toNumberUnits = (val: string | number, dp = 6, key = 'short') => {
  if (val === null || val === undefined) {
    return '---'
  }
  if (val === 0 || val === '0') return '0'
  const formatDp = Array(dp).fill(0).join('')
  const formattedVal = new BigNumber(val).dp(dp).toString()
  let format = `0,000.[${formatDp}]`
  if (compare('gt')(formattedVal)(10000)) format = `0.[${formatDp}]a`
  if (compare('lt')(formattedVal)(1)) format = `0.[${formatDp}]`
  if (key === 'long') {
    format = `0,000.[${formatDp}]`
    if (compare('lt')(formattedVal)(1)) format = `0.[${formatDp}]`
  }
  return numeral(formattedVal).format(format).toUpperCase()
}
