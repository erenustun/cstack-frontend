import { Divider, FlexBox, H2, H3, NavLink } from '@component'
import {
  HomeIcon,
  ListBulletIcon,
  UserCircleIcon as UserIcon,
} from '@heroicons/react/20/solid'
import { FormattedMessage } from 'react-intl'
import { routeConfig, themeConfig } from '@shared/config'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import cn from 'classnames'

interface AccountNavigationProps {
  className?: string
}

export const AccountNavigation = ({ className }: AccountNavigationProps) => {
  const router = useRouter()

  return (
    <FlexBox className={className} direction="col">
      <H2
        className={cn('flex cursor-pointer items-center')}
        onClick={() => router.back()}
        thin
      >
        <ArrowLeftCircleIcon className="mr-2 h-5 w-5" />
        <FormattedMessage id="header_navigation_user_account" />
      </H2>
      <Divider />
      <FlexBox className="space-y-2" direction="col">
        <NavLink
          href={routeConfig.ACCOUNT.INDEX}
          label={<FormattedMessage id="account_navigation_details" />}
          icon={<UserIcon className="mr-1 h-4 w-4" />}
        />
        <NavLink
          href={routeConfig.ACCOUNT.ORDER.INDEX}
          label={<FormattedMessage id="account_navigation_orders" />}
          icon={<ListBulletIcon className="mr-1 h-4 w-4" />}
        />
        <NavLink
          href={routeConfig.ACCOUNT.ADDRESS.INDEX}
          label={<FormattedMessage id="account_navigation_address" />}
          icon={<HomeIcon className="mr-1 h-4 w-4" />}
        />
      </FlexBox>
    </FlexBox>
  )
}
