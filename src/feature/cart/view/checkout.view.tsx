import React from 'react'
import { Button, FlexBox, H2 } from '@shared/component'
import { FormattedMessage } from 'react-intl'
import { useCartItems } from '@shared/store/user/cart.store'
import { OrderOverview, PaymentMethod, Shipping } from '@feature/cart'

export const CheckoutView = () => {
  const cartItems = useCartItems()

  return (
    <>
      <H2>
        <FormattedMessage id="checkout_index" /> {cartItems}{' '}
        <FormattedMessage id="cart_view_products" />
      </H2>
      <FlexBox direction="col" className="gap-y-14">
        <Shipping />
        <PaymentMethod />
        <OrderOverview />
        <Button className="-mt-5 ml-auto">
          <FormattedMessage id="checkout_view_cta" />
        </Button>
      </FlexBox>
    </>
  )
}
