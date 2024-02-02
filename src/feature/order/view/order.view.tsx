import { Container, FlexBox, H1, H2 } from '@component'
import { useQuery } from '@apollo/client'
import FetchOrders from '@feature/order/graphql/fetch-orders.graphql'
import { FormattedMessage } from 'react-intl'
import { AddressType } from '@feature/address'
import { ViewOrders } from '@feature/order/component/view-orders.component'

export const OrderView = () => {
  const { data, loading, error } = useQuery(FetchOrders, {
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
          id="order_index"
          values={{ count: data?.currentOrders?.length }}
        />
      </H2>
      <ViewOrders />
    </FlexBox>
  )
}
