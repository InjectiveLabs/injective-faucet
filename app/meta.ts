export const metaTags = (): Object[] => {
  const title = 'Injective Faucet: Access Unlimited DeFi Markets'
  const description =
    'Jumpstart your journey of exploring the Injective ecosystem by receiving some test funds to play with.'
  const keywords =
    'injective, injective staking, injective governance, injective wallet, faucet, injective faucet, injective station, staking, governance, insurance funds, injective protocol'
  const author = 'InjectiveProtocol'

  return [
    { hid: 'keywords', name: 'keywords', content: keywords },
    { hid: 'description', name: 'description', content: description },
    { hid: 'author', name: 'author', content: author },
    { hid: 'title', property: 'title', content: title },
    {
      hid: 'og:url',
      property: 'og:url',
      content: `${process.env.APP_BASE_URL}`,
    },
    { hid: 'og:type', property: 'og:type', content: 'exchange' },
    {
      hid: 'og:image',
      property: 'og:image',
      content: `${process.env.APP_BASE_URL}/share.jpeg`,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description,
    },
    {
      hid: 'twitter:card',
      property: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      hid: 'twitter:site',
      property: 'twitter:site',
      content: '@InjectiveLabs',
    },
    {
      name: 'twitter:image',
      content: `${process.env.APP_BASE_URL}/share.jpeg`,
    },
    {
      hid: 'twitter:creator',
      property: 'twitter:creator',
      content: '@InjectiveLabs',
    },
    {
      hid: 'twitter:description',
      property: 'twitter:description',
      content: description,
    },
    {
      hid: 'twitter:title',
      property: 'twitter:title',
      content: title,
    },
    { hid: 'og:title', property: 'og:title', content: title },
    { hid: 'og:site_name', property: 'og:site_name', content: title },
  ]
}
