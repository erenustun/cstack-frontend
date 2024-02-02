import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Currency, Rating } from '@component'
import { FormattedMessage } from 'react-intl'
import { ProductName, Product, ProductStock } from '@feature/product'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import useCartStore from '@shared/store/user/cart.store'
import useLayoutStore from '@shared/store/layout/layout.store'
import { useShallow } from 'zustand/react/shallow'

export const Card = (product: Product) => {
  const { addToCart } = useCartStore(useShallow(store => store))
  const { openCart } = useLayoutStore(useShallow(store => store))

  return (
    <div className="w-full transform cursor-pointer rounded bg-foreground py-2">
      <Link key={product.id} href={`/products/${product.id}`}>
        <div className="relative mx-5 overflow-hidden py-2">
          <Image
            alt="product image"
            src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${
              product.thumbnail as string
            }`}
            className="fit 8xl:h-80 animation-speed-movement h-60 w-full rounded-sm object-scale-down hover:scale-[107.5%] focus:outline-none md:h-64"
            loading="lazy"
            width="512"
            height="512"
          />
        </div>
        <div
          className={`flex flex-row p-2 ${product.stock >= 0 && 'relative'}`}
        >
          <div className="relative min-h-[9rem] flex-1">
            <div className="my-1">
              {product.ratingAverage && (
                <Rating rating={product.ratingAverage} />
              )}
              {!product.ratingAverage && <Rating rating={0} />}
            </div>
            <div className={'flex items-center justify-between'}>
              <Currency
                className={'text-lg font-bold text-red-600'}
                amount={product.price}
              />
              <ProductStock stock={product?.stock} />
            </div>
            <ProductName
              brand={product.brand}
              name={product.name}
              stock={product.stock}
              price={product.price}
              category={product.category}
              specification={product.specification}
              sku={product.sku}
            />
            <div className="mr-2 mt-2 flex items-center justify-end space-x-4">
              <i className="bx bx-sm dark:hover:text-blue-gray-500 dark:active:text-blue-gray-500 ml-2 cursor-pointer transition duration-200 ease-in"></i>
              {product.stock > 0 && (
                <div
                  className="mt-2"
                  onClick={(e: { preventDefault: () => void }) => {
                    if (product.stock > 0) {
                      e.preventDefault()
                      addToCart(product)
                      openCart()
                    }
                  }}
                >
                  <Button>
                    <ShoppingBagIcon className="mr-1 h-5" />
                    <FormattedMessage id="product_view_add_to_cart" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
