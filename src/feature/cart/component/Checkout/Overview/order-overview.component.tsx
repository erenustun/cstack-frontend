import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Currency, Divider, FlexBox, H3, H4 } from '@component'
import { ListBulletIcon } from '@heroicons/react/24/solid'
import useCartStore, { useCartTotal } from '@shared/store/user/cart.store'
import Image from 'next/image'
import { ProductStock } from '@feature/product'
import { VAT } from '@feature/cart'
import { useShallow } from 'zustand/react/shallow'

export const OrderOverview = () => {
  const { cart } = useCartStore(useShallow(state => state))

  const cartTotal = useCartTotal()

  return (
    <div className={'space-y-2.5'}>
      <H3 className="flex items-center gap-x-1.5">
        <ListBulletIcon className="h-5 w-5" />
        <FormattedMessage id="checkout_view_title_order_summary" />
      </H3>

      <FlexBox className="-mb-1">
        <FlexBox className="w-1/2">
          <H4>Description</H4>
        </FlexBox>
        <FlexBox className="w-1/2 justify-between">
          <H4>Quantity</H4>
          <H4 className="mr-2">Price</H4>
          <H4 className="mr-4">Total</H4>
        </FlexBox>
      </FlexBox>
      <div
        className={`relative space-y-8 rounded-lg px-3 py-4 shadow-lg dark:bg-slate-900`}
      >
        {cart.map((cartItem, i) => (
          <FlexBox direction="col" key={i}>
            <FlexBox
              className={`text-cool-gray-100 dark:even:bg-cool-gray-800 w-full justify-between px-1.5 py-2 ${
                i === 0 && 'rounded-t-sm'
              } ${i + 1 === cart.length && 'rounded-b-sm'}`}
            >
              <div className={'flex w-1/2 gap-x-4'}>
                <FlexBox className="bg-cool-gray-700 h-16 w-16 items-center">
                  <Image
                    alt={''}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${
                      cartItem.product?.thumbnail as string
                    }`}
                    loading={'lazy'}
                    width={'512'}
                    height={'512'}
                    className={
                      'h-24 w-24 bg-center bg-no-repeat object-cover md:h-20 md:w-20'
                    }
                  />
                </FlexBox>
                <FlexBox className="cursor-default select-text flex-col gap-y-1">
                  <H4 className="flex gap-x-1">
                    <span>{cartItem.product.brand.name}</span>
                    {cartItem.product.name}
                  </H4>
                  <ProductStock
                    className="-ml-1"
                    stock={cartItem?.product?.stock}
                  />
                </FlexBox>
              </div>
              <FlexBox className="w-1/2 items-center justify-between">
                <div className="ml-14">
                  <FormattedMessage
                    id="order_view_quantity"
                    values={{ amount: cartItem.quantity }}
                  />
                </div>
                <Currency amount={cartItem?.product.price} />
                <Currency
                  amount={cartItem?.product?.price * cartItem?.quantity}
                />
              </FlexBox>
            </FlexBox>
            <Divider className="-mb-3 mt-3" />
          </FlexBox>
        ))}
        <FlexBox direction="col" className="gap-y-2">
          <FlexBox className="items-center justify-between">
            <FormattedMessage id="cart_view_price_net_total" />
            <Currency amount={cartTotal - (cartTotal / 100) * VAT} />
          </FlexBox>
          <FlexBox className="items-center justify-between">
            <FormattedMessage id="cart_view_price_tax" />
            <Currency amount={(cartTotal / 100) * VAT} />
          </FlexBox>
          <Divider />
          <FlexBox className="items-center justify-between">
            <FormattedMessage id="cart_view_price_total" />
            <Currency amount={cartTotal} />
          </FlexBox>
        </FlexBox>
      </div>
    </div>
  )
}
