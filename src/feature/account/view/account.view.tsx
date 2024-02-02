import { H2 } from '@component'
import { routeConfig, themeConfig } from '@shared/config'
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { AddressView } from '@feature/address'
import cn from 'classnames'
import { OrderView } from '@feature/order'
import { AccountNavigation, DetailView } from '@feature/account'

export const AccountView = () => {
  const { pathname } = useRouter()
  const isMainPage =
    pathname === routeConfig.ACCOUNT.INDEX ||
    pathname === routeConfig.ACCOUNT.ADDRESS.INDEX ||
    pathname === routeConfig.ACCOUNT.ORDER.INDEX

  const renderSection = useCallback(() => {
    switch (pathname) {
      case routeConfig.ACCOUNT.INDEX:
        return <DetailView />
      case routeConfig.ACCOUNT.ADDRESS.INDEX:
        return <AddressView />
      case routeConfig.ACCOUNT.ORDER.INDEX:
        return <OrderView />
      default:
        return <H2>MVP</H2>
    }
  }, [pathname])

  return (
    <>
      {!isMainPage && (
        <div
          className={cn('flex self-start', themeConfig.sidebarWidthLeft)}
        ></div>
      )}
      <section className={cn('w-full flex-grow')}>{renderSection()}</section>
    </>
  )
}
