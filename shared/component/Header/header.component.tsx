import { Badge, Container, FlexBox, H1, LanguageChanger } from '@component'
import tw from 'tailwind-styled-components'
import { HeaderAuthConditionComponent } from '@feature/auth/component/header-auth-condition.component'
import { routeConfig } from '@shared/config'
import TWLink from '@shared/component/Link/link.component'
import Link from 'next/link'
import {
  BookmarkIcon,
  ShoppingCartIcon,
  BuildingStorefrontIcon,
  HomeIcon,
} from '@heroicons/react/24/outline'
import {
  ShoppingCartIcon as ShoppingCartIconSolid,
  BuildingStorefrontIcon as BuildingStorefrontIconSolid,
  HomeIcon as HomeIconSolid,
} from '@heroicons/react/24/solid'
import cn from 'classnames'
import { useCartItems, useWishlistItems } from '@shared/store/user/cart.store'
import { useShallow } from 'zustand/react/shallow'
import useLayoutStore from '@shared/store/layout/layout.store'
import { FILTER_OPTIONS } from '@feature/product'

const StyledHeader = tw.div<{ className?: string }>`
  h-header
  w-full
  flex
  items-center
  justify-center
  bg-header
  shadow
  fixed
  px-8
  z-50
  ${props => props.className && props.className}
`

const StyledNav = tw.div<{ className?: string }>`
  hidden
  md:flex
  flex-grow-0
  items-center
  lg:-mb-2
  self-stretch
  space-x-8
  font-poppins
  ${props => props.className && props.className}
`

export const Header = () => {
  const cartItemsN = useCartItems()

  const { showCart, toggleCart } = useLayoutStore(useShallow(state => state))

  return (
    <StyledHeader>
      <Container fluid className="flex-row items-center justify-between">
        <FlexBox className="space-x-12">
          <Link
            href={routeConfig.HOME}
            className="font-poppins mt-2 flex w-48 flex-grow-0 flex-col uppercase"
          >
            <H1 className="m-0 text-2xl xl:text-3xl">Inno</H1>
            <H1 className="m-0 text-2xl xl:text-3xl">Store</H1>
          </Link>
          <StyledNav>
            <TWLink
              href={routeConfig.HOME}
              icon={<HomeIcon className="mr-1 h-4" />}
              iconActiveState={<HomeIconSolid className="mr-1 h-4" />}
              intl="header_navigation_home"
              navLink
            />
            <TWLink
              href={`${routeConfig.PRODUCT.INDEX}${routeConfig.PRODUCT.INDEX_DEFAULT_PARAMS}`}
              icon={<BuildingStorefrontIcon className="mr-1 h-4" />}
              iconActiveState={
                <BuildingStorefrontIconSolid className="mr-1 h-4" />
              }
              intl="header_navigation_shop"
              navLink
              subLinks={[
                {
                  intl: 'header_navigation_shop_smartphones',
                  href: `${routeConfig.PRODUCT.INDEX}${routeConfig.PRODUCT.INDEX_DEFAULT_PARAMS}`,
                  subLinks: [
                    {
                      intl: 'Apple',
                      href: `${routeConfig.PRODUCT.INDEX}${routeConfig.PRODUCT.INDEX_DEFAULT_PARAMS}&${FILTER_OPTIONS.brand}=Apple`,
                    },
                    {
                      intl: 'Samsung',
                      href: `${routeConfig.PRODUCT.INDEX}${routeConfig.PRODUCT.INDEX_DEFAULT_PARAMS}&${FILTER_OPTIONS.brand}=Samsung`,
                    },
                    {
                      intl: 'OnePlus',
                      href: `${routeConfig.PRODUCT.INDEX}${routeConfig.PRODUCT.INDEX_DEFAULT_PARAMS}&${FILTER_OPTIONS.brand}=OnePlus`,
                    },
                    {
                      intl: 'Xiaomi',
                      href: `${routeConfig.PRODUCT.INDEX}${routeConfig.PRODUCT.INDEX_DEFAULT_PARAMS}&${FILTER_OPTIONS.brand}=Xiaomi`,
                    },
                  ],
                },
                {
                  intl: 'header_navigation_shop_notebooks',
                  href: `${routeConfig.PRODUCT.INDEX}${routeConfig.PRODUCT.INDEX_DEFAULT_PARAMS}`,
                },
              ]}
            />
          </StyledNav>
        </FlexBox>
        <FlexBox className="items-center space-x-5">
          <LanguageChanger />
          {/*<Link href={routeConfig.ACCOUNT.CART.INDEX}>*/}
          <div className="relative mr-3 cursor-pointer" onClick={toggleCart}>
            {showCart ? (
              <ShoppingCartIconSolid className={cn('h-[22px] w-[22px]')} />
            ) : (
              <ShoppingCartIcon className={cn('h-[22px] w-[22px]')} />
            )}

            <Badge className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 pt-0.5">
              {cartItemsN}
            </Badge>
          </div>
          <HeaderAuthConditionComponent />
        </FlexBox>
      </Container>
    </StyledHeader>
  )
}
