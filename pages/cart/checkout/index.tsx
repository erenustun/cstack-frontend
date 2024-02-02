import { useIntl } from 'react-intl'
import Head from 'next/head'
import { CheckoutView } from '@feature/cart'

const CartPage = () => {
  const intl = useIntl()

  return (
    <>
      <Head>
        <title>
          {intl.formatMessage({ id: 'navigation_checkout' })} -{' '}
          {intl.formatMessage({ id: 'app_slogan' })} -
          {intl.formatMessage({ id: 'app_domain' })}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CheckoutView />
    </>
  )
}

export default CartPage
