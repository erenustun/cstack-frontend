import { AccountView } from '@feature/account'
import { useIntl } from 'react-intl'
import Head from 'next/head'
import { Container } from '@component'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { routeConfig } from '@shared/config'
import useLayoutStore from '@shared/store/layout/layout.store'
import { useShallow } from 'zustand/react/shallow'

const Account = () => {
  const intl = useIntl()
  const { pathname } = useRouter()
  const { openAccountSettings } = useLayoutStore(useShallow(state => state))

  useEffect(() => {
    pathname === routeConfig.ACCOUNT.INDEX && openAccountSettings()
  }, [openAccountSettings, pathname])

  return (
    <>
      <Head>
        <title>
          {intl.formatMessage({ id: 'header_navigation_user_account' })} -{' '}
          {intl.formatMessage({ id: 'app_slogan' })} -
          {intl.formatMessage({ id: 'app_domain' })}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container withAccount withCart page>
        <AccountView />
      </Container>
    </>
  )
}

export default Account
