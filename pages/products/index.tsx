import { ProductView } from '@feature/product'
import Head from 'next/head'
import { useIntl } from 'react-intl'
import { useCartItems } from '@shared/store/user/cart.store'
import React from 'react'
import { Container } from '@component'

const Products = () => {
  const intl = useIntl()
  const cartItems = useCartItems()

  return (
    <>
      <Head>
        <title>
          {intl.formatMessage(
            { id: 'header_navigation_products' },
            { items: cartItems }
          )}{' '}
          - {intl.formatMessage({ id: 'app_slogan' })} -
          {intl.formatMessage({ id: 'app_domain' })}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container page withAccount withBrands withCart>
        <ProductView />
      </Container>
    </>
  )
}

export default Products
