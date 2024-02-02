import { Button, Currency, Divider, H4 } from '@component'
import { FormattedMessage } from 'react-intl'
import Image from 'next/image'
import { routeConfig, themeConfig } from '@shared/config'
import { pushUri } from '@shared/util'
import { EmptyCart } from '@feature/cart'
import React from 'react'
import useCartStore, {
  useCartItems,
  useCartTotal,
} from '@shared/store/user/cart.store'
import { ProductStock } from '@feature/product'
import cn from 'classnames'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import { FREE_SHIPPING_AFTER, SHIPPING_COST } from '@shared/constant'
import { useShallow } from 'zustand/react/shallow'

export const ViewCart = () => {
  const { cart, removeFromCart, increase, decrease, addToFavorites } =
    useCartStore(useShallow(state => state))

  const cartTotal = useCartTotal()
  const cartItems = useCartItems()

  return (
    <>
      {cart && (
        <>
          <div className="xl:min-h-[40.5rem]">
            {cart.map((cartItem, i) => (
              <div
                key={i}
                className={`text-cool-gray-100 dark:even:bg-cool-gray-800 flex w-full justify-between px-3 py-4 ${
                  i === 0 && 'rounded-t-sm'
                } ${i + 1 === cart.length && 'rounded-b-sm'}`}
              >
                <div className={'flex gap-x-2'}>
                  <div className="bg-cool-gray-700 flex h-24 w-24 items-center justify-center md:h-32 md:w-32">
                    <Image
                      alt={''}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${
                        cartItem.product?.thumbnail as string
                      }`}
                      loading={'lazy'}
                      width={'512'}
                      height={'512'}
                      className={
                        'h-24 w-24 bg-center bg-no-repeat object-cover md:h-32 md:w-32'
                      }
                    />
                  </div>
                  <div className={'flex flex-col'}>
                    <div className="flex cursor-default select-text flex-col gap-y-2">
                      <span className={'text-base md:text-lg'}>
                        <span className="font-bold tracking-wide">
                          {cartItem.product.brand.name}
                        </span>{' '}
                        {cartItem.product.name}
                      </span>
                      <ProductStock
                        className="-ml-1"
                        stock={cartItem?.product?.stock}
                      />
                    </div>
                    <div className={'mt-1 flex items-center gap-x-1.5 text-sm'}>
                      <MinusIcon
                        className={cn(
                          'h-5 w-5 cursor-pointer',
                          themeConfig.dangerTextHover,
                          themeConfig.dangerTextActive,
                          themeConfig.animationTransition,
                          themeConfig.animationDuration,
                          themeConfig.animationEaseIn
                        )}
                        onClick={() => {
                          if (cartItem.quantity === 1)
                            removeFromCart(cartItem.product.id as string)
                          decrease(cartItem.product.id as string)
                        }}
                      />
                      <H4 className="mt-1">{cartItem.quantity}</H4>
                      <PlusIcon
                        className={cn(
                          'h-5 w-5 cursor-pointer',
                          themeConfig.primaryTextHover,
                          themeConfig.infoTextActive,
                          themeConfig.animationTransition,
                          themeConfig.animationDuration,
                          themeConfig.animationEaseIn
                        )}
                        onClick={() => {
                          increase(cartItem.product.id as string)
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-end gap-x-3 md:flex-row">
                  <div
                    className={
                      'flex w-40 flex-col items-end gap-x-2 gap-y-1 text-base md:mr-5 md:w-auto md:flex-row md:items-center md:gap-y-0 md:text-lg'
                    }
                  >
                    <div
                      className={
                        'flex cursor-pointer items-center gap-x-1 transition duration-150 ease-in hover:scale-105 dark:hover:text-red-300 dark:active:text-red-400'
                      }
                      onClick={() => {
                        removeFromCart(cartItem.product.id as string)
                      }}
                    >
                      <i className={`bx bx-trash bx-xs`}></i>
                      <span>
                        <FormattedMessage id={'cart_view_remove'} />
                      </span>
                    </div>
                    <span className={'hidden md:block'}>|</span>
                    <div
                      className={
                        'flex cursor-pointer items-center gap-x-1 transition duration-150 ease-in hover:scale-105 dark:hover:text-blue-300 dark:active:text-blue-400'
                      }
                      onClick={() => {
                        addToFavorites(cartItem.product)
                        removeFromCart(cartItem.product.id as string)
                      }}
                    >
                      <i className={`bx bx-bookmark bx-xs`}></i>
                      <span>
                        <FormattedMessage id={'cart_view_to_wishlist'} />
                      </span>
                    </div>
                  </div>
                  <Currency
                    amount={Math.round(
                      cartItem.product?.price * cartItem.quantity
                    )}
                    className={'text-xl font-medium'}
                  />
                </div>
              </div>
            ))}
          </div>
          {cartItems > 0 && (
            <>
              <ul className="mt-2 space-y-2 text-base md:text-lg">
                <li className={'flex items-center justify-between px-3 py-1'}>
                  <H4>
                    <FormattedMessage
                      id={'cart_view_price_shipping_estimate'}
                    />
                  </H4>
                  <H4>
                    {cartTotal < FREE_SHIPPING_AFTER ? (
                      <Currency amount={SHIPPING_COST} cart />
                    ) : (
                      <FormattedMessage id={'cart_view_free_of_charge'} />
                    )}
                  </H4>
                </li>
                <Divider />
                <li className={'flex items-center justify-between px-3 py-1'}>
                  <H4>
                    <FormattedMessage id={'cart_view_price_total'} />
                  </H4>
                  <H4>
                    <Currency
                      amount={Math.round(
                        cartTotal +
                          (cartTotal < FREE_SHIPPING_AFTER ? SHIPPING_COST : 0)
                      )}
                      cart
                    />
                  </H4>
                </li>
              </ul>
              <Button
                onClick={() => pushUri(routeConfig.ACCOUNT.CART.CHECKOUT)}
                className={'m-2 self-end'}
              >
                <FormattedMessage id={'cart_view_to_checkout'} />
              </Button>
            </>
          )}
          {cartItems === 0 && (
            <p className={'w-full md:ml-0'}>
              <EmptyCart message={<FormattedMessage id={'cart_empty'} />} />
            </p>
          )}
        </>
      )}
    </>
  )
}
