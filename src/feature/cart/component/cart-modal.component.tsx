import useCartStore, {
  useCartItems,
  useCartTotal,
} from '@shared/store/user/cart.store'
import { Button, Currency, Divider, FlexBox, H2, H4 } from '@component'
import { FormattedMessage } from 'react-intl'
import { EmptyCart } from '@feature/cart'
import Image from 'next/image'
import { pushUri } from '@shared/util'
import { routeConfig } from '@shared/config'
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import cn from 'classnames'
import { FREE_SHIPPING_AFTER, SHIPPING_COST } from '@shared/constant'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import useLayoutStore from '@shared/store/layout/layout.store'

export const CartModal = () => {
  const { cart, removeFromCart, increase, decrease } = useCartStore(
    useShallow(state => state)
  )

  const { toggleCart } = useLayoutStore(useShallow(state => state))

  const cartTotal = useCartTotal()
  const cartItems = useCartItems()

  return (
    <FlexBox direction="col">
      <FlexBox className="items-center justify-between">
        <H2>
          <FormattedMessage id="cart_index" values={{ items: cartItems }} />
        </H2>
        <XMarkIcon
          className={cn(
            'animation-speed-movement mb-4 mr-1 h-5 w-5 cursor-pointer text-default-text hover:text-danger-hover active:text-danger-active'
          )}
          onClick={toggleCart}
        />
      </FlexBox>
      {cart && (
        <div
          className={cn(
            'mb-2 max-h-[48rem] w-full space-y-2 overflow-y-auto rounded bg-foreground p-2 shadow-md',
            cart.length === 0 && 'shadow-none'
          )}
        >
          {cart.length === 0 && (
            <div className="text-left font-medium text-primary">
              <EmptyCart
                onExit={toggleCart}
                message={<FormattedMessage id="cart_view_empty" />}
              />
            </div>
          )}
          <div className="space-y-1">
            {cart.map((cartItem, i) => (
              <FlexBox
                className={`animation-speed-movement group cursor-pointer justify-between rounded py-4 text-primary-text hover:bg-primary-hover ${
                  cart.length >= 6 ? 'px-3' : 'px-1'
                }`}
                key={i}
              >
                <FlexBox className="gap-x-2">
                  <Image
                    alt="product image in cart"
                    src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${cartItem.product?.thumbnail}`}
                    loading="lazy"
                    width={128}
                    height={128}
                    className="h-fit w-14 object-cover"
                  />
                  <FlexBox className="select-text" direction="col">
                    <H4 className="flex cursor-text select-text flex-col gap-y-0.5 uppercase group-hover:text-default">
                      <b>{cartItem.product.brand.name}</b>{' '}
                      {cartItem.product.name}
                    </H4>
                    <FlexBox className="mt-1.5 items-center space-x-2 group-hover:text-default">
                      <MinusIcon
                        className="animation-speed-movement h-5 w-5 cursor-pointer hover:text-danger-hover active:text-danger-active"
                        onClick={() => {
                          if (cartItem.quantity === 1)
                            removeFromCart(cartItem.product.id as string)
                          decrease(cartItem.product.id as string)
                        }}
                      />
                      <H4 className="mt-1 group-hover:text-default">
                        {cartItem.quantity}
                      </H4>
                      <PlusIcon
                        className="animation-speed-movement h-5 w-5 cursor-pointer hover:text-primary-hover active:text-primary-active"
                        onClick={() => {
                          increase(cartItem.product.id as string)
                        }}
                      />
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
                <FlexBox className="mr-2 items-end gap-y-3" direction="col">
                  <Currency
                    amount={Math.round(
                      cartItem.product?.price * cartItem.quantity
                    )}
                    cart
                    className="group-hover:text-default"
                  />
                  <TrashIcon
                    className="animation-speed-movement mt-1 h-4 w-4 cursor-pointer hover:text-base-hover active:text-base-active group-hover:text-default"
                    onClick={() => {
                      removeFromCart(cartItem.product.id as string)
                    }}
                  />
                </FlexBox>
              </FlexBox>
            ))}
            {cart.length > 0 && (
              <FlexBox direction="col">
                <Divider />
                <FlexBox className="items-center justify-between py-1 font-light">
                  <H4 className="text-primary">
                    <FormattedMessage id="cart_view_price_shipping_estimate" />
                  </H4>
                  <H4 className="text-primary">
                    {cartTotal < FREE_SHIPPING_AFTER ? (
                      <Currency amount={SHIPPING_COST} cart />
                    ) : (
                      <FormattedMessage id="cart_view_free_of_charge" />
                    )}
                  </H4>
                </FlexBox>
                <Divider />
                <FlexBox className="items-center justify-between py-1 font-light">
                  <H4 className="text-primary">
                    <FormattedMessage id="cart_view_price_total" />
                  </H4>
                  <Currency
                    amount={Math.round(
                      cartTotal +
                        (cartTotal < FREE_SHIPPING_AFTER ? SHIPPING_COST : 0)
                    )}
                    cart
                  />
                </FlexBox>
                <Button
                  onClick={() => pushUri(routeConfig.ACCOUNT.CART.INDEX)}
                  className="m-2 self-end"
                >
                  <FormattedMessage id="cart_view_to_cart" />
                </Button>
              </FlexBox>
            )}
          </div>
        </div>
      )}
    </FlexBox>
  )
}
