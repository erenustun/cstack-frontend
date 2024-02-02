import { useEffect } from 'react'
import { pushUri } from '@shared/util'
import { routeConfig } from '@shared/config'

export const useRouterAuth = () => {
  useEffect(() => {
    if (
      [
        ...routeConfig.ACCOUNT.COLLECTION_AUTH,
        ...routeConfig.ACCOUNT.ADDRESS.COLLECTION_AUTH,
        ...routeConfig.ACCOUNT.ORDER.COLLECTION_AUTH,
      ].includes(window.location.pathname)
    ) {
      pushUri(routeConfig.ACCOUNT.AUTH.SIGN_IN)
    }
  }, [window.location.pathname])
}
