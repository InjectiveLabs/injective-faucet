require('dotenv').config()
const { MsgSend, PrivateKey } = require('@injectivelabs/sdk-ts')
const {
  eligibleDenomsWithAmounts,
  fetchTransactionsFromOwner,
} = require('./helpers')
const MsgBroadcasterWithPk = require('./provider')
const { network, privateKey } = require('./config')

exports.handler = async function (event, _context, callback) {
  if (event && event.httpMethod && event.httpMethod === 'OPTIONS') {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'OK',
      }),
    })
  }

  if (!event.queryStringParameters) {
    return callback(null, {
      statusCode: 422,
      body: JSON.stringify({
        message: 'Injective Address is missing!',
      }),
    })
  }

  if (!event.queryStringParameters.address) {
    return callback(null, {
      statusCode: 422,
      body: JSON.stringify({
        message: 'Injective Address is missing!',
      }),
    })
  }

  if (!network) {
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: 'APP_NETWORK is missing from .env!',
      }),
    })
  }

  if (!privateKey) {
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: 'APP_PRIVATE_KEY is missing from .env!',
      }),
    })
  }

  const pk = PrivateKey.fromHex(privateKey)
  const ownerInjectiveAddress = pk.toBech32()
  const address = event.queryStringParameters.address

  if (!address.startsWith('inj')) {
    return callback(null, {
      statusCode: 422,
      body: JSON.stringify({
        message: 'Please enter a valid Injective Address',
      }),
    })
  }

  if (address.length !== 42) {
    return callback(null, {
      statusCode: 422,
      body: JSON.stringify({
        message: 'Please enter a valid Injective Address',
      }),
    })
  }

  const ownerTxs = await fetchTransactionsFromOwner(ownerInjectiveAddress)
  const transaction = ownerTxs.find((tx) => {
    const { messages } = tx

    return messages.find((message) => {
      if (!message.value) {
        return false
      }

      if (!message.value.to_address) {
        return false
      }

      return message.value.to_address.toLowerCase() === address.toLowerCase()
    })
  })

  if (transaction) {
    const date = new Date(transaction.date).getTime()
    const msInADay = 84600 * 1000
    const now = Date.now()

    if (date + msInADay > now) {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          message: 'You have already used the faucet in the past 24 hours',
        }),
      })
    }
  }

  const denoms = eligibleDenomsWithAmounts()
  const messages = Object.keys(denoms).map((denom) => {
    return MsgSend.fromJSON({
      amount: {
        denom,
        amount: denoms[denom].toFixed(),
      },
      srcInjectiveAddress: ownerInjectiveAddress,
      dstInjectiveAddress: address,
    })
  })

  try {
    await MsgBroadcasterWithPk.broadcast({msgs: messages, injectiveAddress: ownerInjectiveAddress})

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `We have sent you testnet funds to your address ${address}! You can request again in 24 hours.`,
      }),
    })
  } catch (e) {
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: `Something happened, please try again later - Error: ${
          e.message ? e.message : e
        }`,
      }),
    })
  }
}
