const { BigNumberInBase, HttpClient } = require('@injectivelabs/utils')
const { endpoints } = require('./config')

const eligibleDenoms = () => {
  const usdtDenom = 'peggy0x87aB3B4C8661e07D6372361211B96ed4Dc36B1B5'
  const usdcCw20Denom = 'factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/usdc'
  const apeCoin = 'peggy0x44C21afAaF20c270EBbF5914Cfc3b5022173FEB7'
  const aave = 'factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/aave'
  const crv = 'factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/crv'
  const cvx = 'factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/cvx'
  const shib = 'factory/inj17vytdwqczqz72j65saukplrktd4gyfme5agf6c/shib'
  
  return ['inj', usdtDenom, usdcCw20Denom, apeCoin, aave, crv, cvx, shib]
}

const eligibleDenomsWithAmounts = () => {
  const [inj, usdt, usdcCW20, apeCoin, aave, crv, cvx, shib] = eligibleDenoms()

  return {
    [inj]: new BigNumberInBase(10).toWei(), // 10 INJ
    [usdt]: new BigNumberInBase(10000).toWei(6), // 10000 USDT
    [usdcCW20]: new BigNumberInBase(10000).toWei(6), // 10000 USDC
    [apeCoin]: new BigNumberInBase(10000).toWei(), // 10000 APE,
    [aave]: new BigNumberInBase(10000).toWei(6), // 10000 AAVE
    [crv]: new BigNumberInBase(10000).toWei(6), // 10000 CRV
    [cvx]: new BigNumberInBase(10000).toWei(6), // 10000 CVX
    [shib]: new BigNumberInBase(10000).toWei(6), // 10000 SHIB
  }
}

const fetchTransactionsFromOwner = async (address) => {
  const client = new HttpClient(endpoints.indexer)

  try {
    const response = await client.get(
      `accountTxs/${address}?limit=100`
    )
    
    if (!response.data.data) {
      return []
    }

    return response.data.data.map((tx) => ({
      date: tx.block_timestamp,
      messages: tx.messages || [],
    }))
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = {
  eligibleDenoms,
  fetchTransactionsFromOwner,
  eligibleDenomsWithAmounts,
}
