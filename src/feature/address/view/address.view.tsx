import { FlexBox, H1, H2 } from '@component'
import { useQuery } from '@apollo/client'
import FetchAddresses from '@feature/address/graphql/fetch-addresses.graphql'
import { FormattedMessage } from 'react-intl'
import { AddressType, ViewAddress } from '@feature/address'

export const AddressView = () => {
  const { data, loading, error } = useQuery(FetchAddresses, {
    variables: {
      filterArgs: {
        type: AddressType.SHIPPING,
      },
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <H1>Loading</H1>

  if (error) return <h1>Error: {error.message}</h1>

  return (
    <FlexBox direction="col">
      <H2>
        <FormattedMessage
          id="address_index"
          values={{ count: data?.addresses?.length }}
        />
      </H2>
      <ViewAddress />
    </FlexBox>
  )
}
