import { useIntl } from 'react-intl'
import Head from 'next/head'
import { useCartItems } from '@shared/store/user/cart.store'
import { CartView } from '@feature/cart'

const Cart = () => {
  const intl = useIntl()
  const cartItems = useCartItems()

  return (
    <>
      <Head>
        <title>
          {intl.formatMessage({ id: 'navigation_cart' }, { items: cartItems })}{' '}
          - {intl.formatMessage({ id: 'app_slogan' })} -
          {intl.formatMessage({ id: 'app_domain' })}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CartView />
    </>
  )
}

export default Cart
