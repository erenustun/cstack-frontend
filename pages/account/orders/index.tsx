import { AccountView } from '@feature/account'
import { useIntl } from 'react-intl'
import Head from 'next/head'
import { Container } from '@component'
import React from 'react'

const AccountOrders = () => {
  const intl = useIntl()
  return (
    <>
      <Head>
        <title>
          {intl.formatMessage({ id: 'header_navigation_user_orders' })} -{' '}
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
export default AccountOrders
