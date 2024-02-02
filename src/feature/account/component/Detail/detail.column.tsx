import { FormattedMessage } from 'react-intl'
import { getNameFromEmail } from '@shared/util'

export const detailColumns = [
  {
    id: 'email',
    header: <FormattedMessage id="account_view_email" />,
  },
  {
    id: ['firstName', 'lastName'],
    header: [
      <FormattedMessage id="account_view_first_name" key="firstName" />,
      <FormattedMessage id="account_view_last_name" key="lastName" />,
    ],
  },
  {
    id: 'username',
    accessor: 'email',
    header: <FormattedMessage id="account_view_username" />,
    formatData: getNameFromEmail,
  },
  {
    id: 'phone',
    header: <FormattedMessage id="account_view_phone" />,
  },
]
