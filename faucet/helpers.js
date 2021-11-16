const { BigNumberInBase, HttpClient } = require('@injectivelabs/utils')
const { Network, getUrlEndpointForNetwork } = require('@injectivelabs/networks')

const eligibleDenoms = () => {
  const usdtDenom =
    process.env.APP_ADDRESS === Network.Testnet
      ? 'peggy0x69efCB62D98f4a6ff5a0b0CFaa4AAbB122e85e08'
      : 'peggy0xdAC17F958D2ee523a2206206994597C13D831ec7'

  return ['inj', usdtDenom]
}

const eligibleDenomsWithAmounts = () => {
  const [inj, usdt] = eligibleDenoms()

  return {
    [inj]: new BigNumberInBase(10000).toWei(), // 10000 INJ
    [usdt]: new BigNumberInBase(10000).toWei(6), // 10000 USDT
  }
}

const fetchTransactionsFromOwner = async (address) => {
  const endpoints = getUrlEndpointForNetwork(process.env.APP_NETWORK)
  const client = new HttpClient(endpoints.explorerUrl)

  try {
    const response = await client.get(
      `accountTxs/${address}?before=0&limit=100&skip=0&type=cosmos.bank.v1beta1.MsgSend`
    )

    return response.data.data
      .map((tx) => tx.messages)
      .reduce((result, messages) => {
        return [...result, ...messages]
      }, [])
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = {
  eligibleDenoms,
  fetchTransactionsFromOwner,
  eligibleDenomsWithAmounts,
}
