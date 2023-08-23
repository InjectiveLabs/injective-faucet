require('dotenv').config()
const { Network, getNetworkEndpoints } = require('@injectivelabs/networks')

const privateKeys = process.env.APP_PRIVATE_KEYS.split(',')
const randomPrivateKey = privateKeys[Math.floor(Math.random()*privateKeys.length)]

module.exports = {
  privateKey: randomPrivateKey,
  network: process.env.APP_NETWORK || Network.Testnet,
  endpoints: getNetworkEndpoints(process.env.APP_NETWORK || Network.Testnet)
}
