import '@/asset/style/bundle.scss'
import { Inter } from 'next/font/google'
import type { AppProps } from 'next/app'
import { StyledComponentsRegistry } from '@shared/lib'
import { ApolloProvider } from '@apollo/client'
import { hasHydrated } from '@shared/hook'
import { IntlProvider } from 'react-intl'
import { apolloClient } from '@shared/config'
import { Layout, Footer, Header } from '@component'
import useUserStore from '@shared/store/user/user.store'
import { messageByLocale } from '@shared/util/intl.util'
import { useMemo } from 'react'
import { QueryParamProvider } from 'use-query-params'
import { NextAdapter } from 'next-query-params'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const { settings } = useUserStore()
  const hasMounted = hasHydrated()

  const messages = useMemo(() => {
    return messageByLocale(settings?.language as string)
  }, [settings?.language])

  return hasMounted ? (
    <QueryParamProvider adapter={NextAdapter}>
      <ApolloProvider client={apolloClient}>
        <IntlProvider locale={settings?.language as string} messages={messages}>
          <StyledComponentsRegistry>
            <Layout className={inter.className}>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </Layout>
          </StyledComponentsRegistry>
        </IntlProvider>
      </ApolloProvider>
    </QueryParamProvider>
  ) : null
}
