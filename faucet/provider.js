const { Web3Strategy, Wallet } = require('@injectivelabs/web3-strategy')
const { ChainId } = require('@injectivelabs/ts-types')
const { TransactionConsumer } = require('@injectivelabs/exchange-consumer')
const { Network, getUrlEndpointForNetwork } = require('@injectivelabs/networks')

const endpoints = getUrlEndpointForNetwork(process.env.APP_NETWORK)
const transactionConsumer = new TransactionConsumer(endpoints.exchangeUrl)

class TxProvider {
  message

  address

  chainId

  constructor({ message, address }) {
    this.message = message
    this.address = address
    this.chainId = [Network.Testnet, Network.Devnet].includes(
      process.env.APP_NETWORK || Network.Testnet
    )
      ? ChainId.Kovan
      : ChainId.Mainnet
  }

  async prepare() {
    const { chainId, address, message } = this

    try {
      return await transactionConsumer.prepareTxRequest({
        address,
        message,
        chainId,
        estimateGas: false,
      })
    } catch (e) {
      throw new Error(e)
    }
  }

  async sign(txData) {
    const { address, chainId } = this
    const web3Strategy = new Web3Strategy({
      chainId,
      wallet: Wallet.PrivateKey,
      options: {
        privateKey: process.env.APP_PRIVATE_KEY,
      },
    })

    try {
      return await web3Strategy.signTypedDataV4(txData, address)
    } catch (e) {
      throw new Error(e)
    }
  }

  async broadcast() {
    const { message, chainId } = this
    const txResponse = await this.prepare()
    const signature = await this.sign(txResponse.getData())

    try {
      return await transactionConsumer.broadcastTxRequest({
        signature,
        message,
        chainId,
        txResponse,
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = TxProvider
