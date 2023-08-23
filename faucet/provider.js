const { MsgBroadcasterWithPk } = require('@injectivelabs/sdk-ts')
const { network, privateKey } = require('./config')

module.exports = new MsgBroadcasterWithPk({
  network,
  privateKey
})
