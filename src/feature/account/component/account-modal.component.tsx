import { AnimateIn, Divider, FlexBox, H2 } from '@component'
import { FormattedMessage } from 'react-intl'
import {
  Cog8ToothIcon as SettingIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentTextIcon,
  ListBulletIcon,
  XMarkIcon,
  CreditCardIcon,
  BanknotesIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import cn from 'classnames'
import React, { useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useLayoutStore from '@shared/store/layout/layout.store'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid'
import { LANGUAGE_LIST } from '@shared/constant'
import { useRouter } from 'next/router'
import useUserStore, {
  useAuthCheck,
  useFirstName,
} from '@shared/store/user/user.store'
import Link from 'next/link'
import { routeConfig } from '@shared/config'
import { pushUri } from '@shared/util'

export const AccountModal = () => {
  const {
    closeLanguageSettings,
    toggleAccountModal,
    toggleAccountSettings,
    toggleLanguageSettings,
    showAccountSettings,
    showLanguageSettings,
  } = useLayoutStore(useShallow(state => state))
  const firstName = useFirstName()

  const router = useRouter()
  const { pathname, asPath, query, push } = router

  const { setLanguage, settings, signOut } = useUserStore(
    useShallow(state => state)
  )

  const isAuth = useAuthCheck()

  const handleChange = (locale: string) => {
    setLanguage(locale)
    push({ pathname, query }, asPath, { locale })
    closeLanguageSettings()
  }

  const renderSettingsCaret = useCallback(() => {
    return showAccountSettings ? (
      <ChevronUpIcon className="mr-1.25 mr-1.5 h-4" />
    ) : (
      <ChevronDownIcon className="mr-1.25 mr-1.5 h-4" />
    )
  }, [showAccountSettings])

  const renderLanguageCaret = useCallback(() => {
    return showLanguageSettings ? (
      <ChevronUpIcon className="mr-1.25 mr-1.5 h-4" />
    ) : (
      <ChevronDownIcon className="mr-1.25 mr-1.5 h-4" />
    )
  }, [showLanguageSettings])

  return (
    <FlexBox className="font-inter" direction="col">
      <FlexBox className={cn('relative w-full items-center justify-between')}>
        {isAuth ? (
          <H2>
            <FormattedMessage id="account_modal_index" values={{ firstName }} />
          </H2>
        ) : (
          <H2>
            <FormattedMessage id="account_modal_language" />
          </H2>
        )}
        <XMarkIcon
          className={cn(
            'animation-speed-movement absolute right-0 mb-4 mr-1 h-6 w-6 cursor-pointer text-default-text-light hover:text-danger-hover active:text-danger-active'
          )}
          onClick={toggleAccountModal}
        />
      </FlexBox>
      <FlexBox className="animation-speed-movement group mb-2 max-h-[48rem] w-full justify-between space-y-3 overflow-y-auto rounded bg-foreground p-2 py-5 text-primary-text shadow-md">
        <ul className="flex w-full flex-col gap-y-1 px-2">
          {isAuth && (
            <div>
              <Link
                href={routeConfig.ACCOUNT.ORDER.INDEX}
                className={cn(
                  routeConfig.ACCOUNT.ORDER.COLLECTION_ACTIVE_LINK.includes(
                    pathname
                  ) && 'font-bold underline underline-offset-2'
                )}
              >
                <li className="flex cursor-pointer items-center gap-x-2 px-1">
                  <ListBulletIcon className="h-4 w-4" />
                  <FormattedMessage id="account_modal_orders" />
                </li>
              </Link>
              <Divider />
              <li className="flex cursor-not-allowed items-center gap-x-2 px-1">
                <DocumentTextIcon className="h-4 w-4" />
                <FormattedMessage id="account_modal_invoices" />
              </li>
              <Divider />
              <li
                className="mt-6 flex cursor-pointer select-none items-center justify-between px-1"
                onClick={toggleAccountSettings}
              >
                <FlexBox className="items-center gap-x-2">
                  <SettingIcon className="h-4 w-4" />
                  <FormattedMessage id="account_modal_settings" />
                </FlexBox>
                {renderSettingsCaret()}
              </li>
              <AnimateIn
                direction="to-bottom"
                show={showAccountSettings}
                className={cn('mt-1 hidden w-full space-y-3 xl:block')}
              >
                <Divider />
                <li className="px-0">
                  <Link
                    className={cn(
                      routeConfig.ACCOUNT.COLLECTION.includes(pathname) &&
                        'font-bold underline underline-offset-2',
                      'flex items-center gap-x-2'
                    )}
                    href={routeConfig.ACCOUNT.INDEX}
                  >
                    <UsersIcon className="h-5 w-5" />
                    <FormattedMessage id="account_modal_account" />
                  </Link>
                </li>
                <Divider />
                <li className="px-0">
                  <Link
                    className={cn(
                      routeConfig.ACCOUNT.ADDRESS.COLLECTION_ACTIVE_LINK.includes(
                        pathname
                      ) && 'font-bold underline underline-offset-2',
                      pathname.replace('/[id]', '') ===
                        routeConfig.ACCOUNT.ADDRESS.EDIT &&
                        'font-bold underline underline-offset-2',
                      'flex items-center gap-x-2'
                    )}
                    href={routeConfig.ACCOUNT.ADDRESS.INDEX}
                  >
                    <HomeIcon className="h-5 w-5" />
                    <FormattedMessage id="account_modal_shipping" />
                  </Link>
                </li>
                <Divider />
                <li className="px-0">
                  <Link
                    className="flex cursor-not-allowed items-center gap-x-2"
                    href={routeConfig.ACCOUNT.ADDRESS.INDEX}
                  >
                    <BanknotesIcon className="h-5 w-5" />
                    <FormattedMessage id="account_modal_billing" />
                  </Link>
                </li>
                <Divider />
                <li className="px-0">
                  <Link
                    className="flex cursor-not-allowed items-center gap-x-2"
                    href={routeConfig.ACCOUNT.ADDRESS.INDEX}
                  >
                    <CreditCardIcon className="h-5 w-5" />
                    <FormattedMessage id="account_modal_payment_methods" />
                  </Link>
                </li>
                <Divider />
              </AnimateIn>
            </div>
          )}
          <li
            className="flex cursor-pointer select-none items-center justify-between gap-x-2 px-0"
            onClick={toggleLanguageSettings}
          >
            <FlexBox className="items-center gap-x-1">
              <FormattedMessage id="account_modal_language" />
              <span className="text-xs uppercase text-disabled">
                {settings?.language}
              </span>
            </FlexBox>
            {renderLanguageCaret()}
          </li>
          <AnimateIn
            direction="to-bottom"
            show={showLanguageSettings}
            className={cn('mt-1 hidden w-full space-y-2 xl:block')}
          >
            {LANGUAGE_LIST.map((language, i: number) => {
              return (
                <li
                  className="cursor-pointer px-0 hover:text-primary-hover active:text-primary-active"
                  key={i}
                  onClick={() => handleChange(language.intl)}
                >
                  <FormattedMessage id={language.intl} />
                </li>
              )
            })}
          </AnimateIn>
          {!isAuth && (
            <>
              <Divider />
              <li
                className="-mb-2 flex cursor-pointer items-center gap-x-2 px-1 pt-8"
                onClick={() => {
                  signOut()
                  if (
                    [
                      ...routeConfig.ACCOUNT.COLLECTION_AUTH,
                      ...routeConfig.ACCOUNT.ADDRESS.COLLECTION_AUTH,
                      ...routeConfig.ACCOUNT.ORDER.COLLECTION_AUTH,
                    ].includes(pathname)
                  ) {
                    console.log(pathname)
                    pushUri(routeConfig.HOME)
                  }
                }}
              >
                <ArrowLeftOnRectangleIcon className="mt-0.5 h-4 w-4" /> Sign out
              </li>
            </>
          )}
        </ul>
      </FlexBox>
    </FlexBox>
  )
}
