import { ethers } from 'ethers'
import { CHAIN } from '@/types/chain.type'

export const CONTRACTS_BY_CHAINS: { [key: string]: Record<number, string> } = {
  MultiCall: {
    [CHAIN.FANTOM_TESTNET]: '0x76aDA47d8972fC692bfAcEe4fe01EfF0E4693377',
    [CHAIN.FUSE_TESTNET]: '0x88553DcCa2350389Dc33f36b4EA4d71FfB8b3B11',
  },
}

export const MOCK_ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
export const DEFAULT_APPROVE_AMOUNT = ethers.constants.MaxInt256.toString()

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
