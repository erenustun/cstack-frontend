import { H2, Loader } from '@component'
import { FormattedMessage } from 'react-intl'
import { ViewDetails } from '@feature/account'
import { getNameFromEmail } from '@shared/util'
import { useQuery } from '@apollo/client'
import FetchUsername from '@feature/account/graphql/detail/fetch-username.graphql'

export const DetailView = () => {
  const { data, loading } = useQuery(FetchUsername, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading)
    return (
      <Loader
        loading={loading}
        message={<FormattedMessage id="account_view_fetching" />}
      />
    )

  return (
    <div className="flex flex-col">
      <H2>
        <FormattedMessage
          id="account_index"
          values={{ username: getNameFromEmail(data?.fetchCustomer?.email) }}
        />
      </H2>
      <ViewDetails />
    </div>
  )
}
