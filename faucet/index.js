require('dotenv').config()
const { BankComposer } = require('@injectivelabs/chain-consumer')
const {
  eligibleDenomsWithAmounts,
  fetchTransactionsFromOwner,
} = require('./helpers')
const TxProvider = require('./provider')

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

  if (!process.env.APP_NETWORK) {
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: 'APP_NETWORK is missing from .env!',
      }),
    })
  }

  if (!process.env.APP_PRIVATE_KEY) {
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: 'APP_PRIVATE_KEY is missing from .env!',
      }),
    })
  }

  if (!process.env.APP_ADDRESS) {
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: 'APP_PRIVATE_KEY is missing from .env!',
      }),
    })
  }

  const ownerAddress = process.env.APP_ADDRESS
  const ownerInjectiveAddress = process.env.APP_INJECTIVE_ADDRESS
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
  const sendTxExists = ownerTxs.find((message) => {
    if (!message.value) {
      return false
    }

    if (!message.value.to_address) {
      return false
    }

    return message.value.to_address.toLowerCase() === address.toLowerCase()
  })

  if (sendTxExists) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: 'You have already used the faucet',
      }),
    })
  }

  const denoms = eligibleDenomsWithAmounts()
  const messages = Object.keys(denoms).map((denom) => {
    return BankComposer.send({
      denom,
      amount: denoms[denom].toFixed(),
      srcInjectiveAddress: ownerInjectiveAddress,
      dstInjectiveAddress: address,
    })
  })
  const provider = new TxProvider({ address: ownerAddress, message: messages })

  try {
    await provider.broadcast()
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'We have sent you testnet funds to your address!',
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
