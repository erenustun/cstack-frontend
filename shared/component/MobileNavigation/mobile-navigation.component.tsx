import { FlexBox } from '@shared/component/Layout/flex-box.component'
import { List } from '@shared/component/List/list.component'
import { FormattedMessage } from 'react-intl'
import { pushUri } from '@shared/util'
import { routeConfig } from '@shared/config'
import { Dispatch, SetStateAction } from 'react'

interface MobileNavigationProps {
  menuOpen: boolean
  setMenu: Dispatch<SetStateAction<boolean>>
}

export const MobileNavigation = ({
  menuOpen,
  setMenu,
}: MobileNavigationProps) => {
  return (
    <FlexBox direction="col" className="w-full">
      <List
        className="flex w-full flex-col md:hidden"
        list={[
          {
            label: <FormattedMessage id="header_navigation_home" />,
            onClick: () => {
              setMenu(!menuOpen)
              pushUri(routeConfig.HOME)
            },
          },
          {
            label: <FormattedMessage id="header_navigation_products" />,
            onClick: () => {
              setMenu(!menuOpen)
              pushUri(
                `${routeConfig.PRODUCT.INDEX}${routeConfig.PRODUCT.INDEX_DEFAULT_PARAMS}`
              )
            },
          },
        ]}
        isNav
      />
    </FlexBox>
  )
}
