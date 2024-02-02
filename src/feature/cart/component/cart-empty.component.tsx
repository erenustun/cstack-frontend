import { ReactNode } from 'react'

import Link from 'next/link'

import { FormattedMessage } from 'react-intl'
import { routeConfig } from '@shared/config'
import TWLink from '@shared/component/Link/link.component'
import { TextLink } from '@component'

interface CartEmptyProps {
  onExit?: any
  message: string | ReactNode
  mode?: 'cart' | 'wishlist'
}

export const EmptyCart = ({
  onExit,
  message,
  mode = 'cart',
}: CartEmptyProps) => (
  <p className={'flex flex-col space-y-1'}>
    <span>{message}</span>
    <Link
      href={`${routeConfig.PRODUCT.INDEX}${routeConfig.PRODUCT.INDEX_DEFAULT_PARAMS}`}
      onClick={onExit}
    >
      <FormattedMessage
        id={
          mode === 'cart'
            ? 'cart_view_empty_continue_browsing'
            : 'wishlist_empty_continueBrowsing'
        }
        values={{
          b: chunks => (
            <TextLink
              className="underline"
              href={`${routeConfig.PRODUCT.INDEX}${routeConfig.PRODUCT.INDEX_DEFAULT_PARAMS}`}
              label={chunks}
            />
          ),
        }}
      />
    </Link>
  </p>
)
