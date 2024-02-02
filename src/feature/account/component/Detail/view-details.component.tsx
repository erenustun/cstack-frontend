import { Button, FlexBox, Loader, SimpleTable } from '@component'
import { useQuery } from '@apollo/client'
import FetchUser from '@feature/account/graphql/detail/fetch-user.graphql'
import Link from 'next/link'
import { routeConfig } from '@shared/config'
import { FormattedMessage } from 'react-intl'
import { detailColumns as columns } from '@feature/account'

export const ViewDetails = () => {
  const { data, loading, error } = useQuery(FetchUser, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading)
    return (
      <Loader
        loading={loading}
        message={<FormattedMessage id="account_view_fetching" />}
      />
    )

  if (error) return <h1>Error: {error.message}</h1>

  return (
    <FlexBox direction="col">
      <SimpleTable
        data={data?.fetchCustomer as []}
        columns={columns}
        hover
        stripped
      />
      <Link href={routeConfig.ACCOUNT.EDIT} className="mt-3 self-end">
        <Button>
          <FormattedMessage id="account_view_edit_user" />
        </Button>
      </Link>
    </FlexBox>
  )
}
