import { SignInView } from '@feature/auth'
import Head from 'next/head'
import { useIntl } from 'react-intl'
import { Container } from '@component'

const SignIn = () => {
  const intl = useIntl()

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
      {/*bg-[url(/images/account-bg.jpg)] bg-cover*/}
      <Container
        className="min-h-[55rem] border-4 bg-[url(/images/account-bg-2.jpg)] bg-cover"
        fluid
        page
      >
        <SignInView />
      </Container>
    </>
  )
}

export default SignIn
