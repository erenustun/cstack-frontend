import React from 'react'

import { Container, H2 } from '@shared/component'
import { FormattedMessage } from 'react-intl'
import { useCartItems } from '@shared/store/user/cart.store'
import { ViewCart } from '@feature/cart'

export const CartView = () => {
  const cartItems = useCartItems()

  return (
    <>
      <H2>
        <FormattedMessage id={'cart_index'} values={{ items: cartItems }} />
      </H2>
      <ViewCart />
    </>
  )
}
