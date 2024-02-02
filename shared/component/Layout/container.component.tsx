import tw from 'tailwind-styled-components'
import { routeConfig, themeConfig } from '@shared/config'
import cn from 'classnames'
import React, { PropsWithChildren } from 'react'
import { FeaturedBrand } from '@feature/product'
import { AnimateIn, FlexBox } from '@shared/component'
import { CartModal } from '@feature/cart'
import { useShallow } from 'zustand/react/shallow'
import useLayoutStore from '@shared/store/layout/layout.store'
import { AccountModal, AccountNavigation } from '@feature/account'
import { useAuthCheck } from '@shared/store/user/user.store'
import { useRouter } from 'next/router'

interface ContainerProps {
  className?: string
  fluid?: boolean
  page?: boolean
  withAccount?: boolean
  withBrands?: boolean
  withCart?: boolean
}

export const StyledContainer = tw.span<ContainerProps>`
  w-full
  mx-auto
  flex
  flex-col
  px-0
  md:px-1
  ${props => !props.fluid && themeConfig.mainContainerMaxWidth}
  ${props =>
    props.page &&
    'pt-32 border border-red-500 flex-row justify-between gap-x-0'}
  ${props => props.className && props.className}
`

export const Container = ({
  className,
  children,
  fluid = false,
  page = false,
  withAccount = false,
  withBrands = false,
  withCart = false,
}: PropsWithChildren<ContainerProps>) => {
  const { showAccount, showCart } = useLayoutStore(useShallow(state => state))
  const isAuth = useAuthCheck()

  const { pathname } = useRouter()
  const isMainPage =
    pathname === routeConfig.ACCOUNT.INDEX ||
    pathname === routeConfig.ACCOUNT.ADDRESS.INDEX ||
    pathname === routeConfig.ACCOUNT.ORDER.INDEX

  return (
    <>
      {!fluid ? (
        <StyledContainer
          className={cn(className, isMainPage && 'px-8')}
          fluid={fluid}
          page={page}
        >
          <FlexBox className="flex-grow gap-x-3">
            {withBrands ? (
              <FeaturedBrand
                className={cn(
                  'hidden w-full max-w-left-sidebar 2xl:block',
                  !page && 'mt-8'
                )}
              />
            ) : null}
            {isMainPage && (
              <AccountNavigation
                className={cn(
                  'mb-8 mr-3 hidden space-y-3 md:flex',
                  themeConfig.sidebarWidthLeft
                )}
              />
            )}
            {children}
          </FlexBox>
          <FlexBox
            className={cn(
              'hidden',
              withAccount || withCart ? 'xl:flex' : 'hidden',
              isAuth ? 'space-y-7' : 'space-y-0',
              'w-full max-w-right-sidebar'
            )}
            direction="col"
          >
            {withAccount && (
              <AnimateIn
                direction="to-bottom"
                show={showAccount}
                className={cn(
                  'hidden w-full self-end xl:block',
                  withCart && 'xl:mb-10'
                )}
              >
                <AccountModal />
              </AnimateIn>
            )}
            {withCart && (
              <AnimateIn
                direction="to-bottom"
                show={showCart}
                className={cn('hidden w-full xl:block')}
              >
                <CartModal />
              </AnimateIn>
            )}
          </FlexBox>
        </StyledContainer>
      ) : (
        <StyledContainer
          className={cn(className, isMainPage && 'px-8')}
          fluid={fluid}
          page={page}
        >
          {children}
        </StyledContainer>
      )}
    </>
  )
}
