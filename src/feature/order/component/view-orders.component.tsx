import { Box, Currency, FlexBox, H3, H4, Loader } from '@component'
import { useQuery } from '@apollo/client'
import FetchOrders from '@feature/order/graphql/fetch-orders.graphql'
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl'
import { AddressType } from '@feature/address'
import { Order } from '@feature/order'
import Image from 'next/image'
import cn from 'classnames'
import { themeConfig } from '@shared/config'

interface ViewOrdersProps<> {
  hover?: boolean
  hoverColor?: string
  stripped?: boolean
  strippedColor?: string
}

export const ViewOrders = ({
  hover = true,
  stripped = true,
}: ViewOrdersProps) => {
  const intl = useIntl()

  const { data, loading, error } = useQuery(FetchOrders, {
    variables: {
      filterArgs: {
        type: AddressType.SHIPPING,
      },
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading)
    return (
      <Loader
        loading={loading}
        message={<FormattedMessage id="order_view_fetching" />}
      />
    )

  if (error) return <h1>Error: {error.message}</h1>

  return (
    <FlexBox direction="col" className="space-y-4">
      {data.currentOrders.map((order: Order, index: number) => {
        const twoDaysAgo = new Date()
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
        const created = new Date(order.created as unknown as string)
        return (
          <Box
            className={cn(
              'animation-speed-movement z-30 flex transform-gpu cursor-pointer flex-col space-y-4 hover:scale-[102%]',
              hover && 'hover:bg-foreground',
              stripped && index % 2 == 0 && 'bg-foreground'
            )}
            key={index}
          >
            <FlexBox className="justify-between">
              <H3 className="inline py-1">
                <FormattedMessage
                  id="order_view_id"
                  values={{
                    id: <b>{order.id}</b>,
                    created: (
                      <b>
                        <FormattedDate value={order.created} />
                      </b>
                    ),
                  }}
                />
              </H3>
              <div className="mr-4 flex justify-between px-4">
                {created > twoDaysAgo && (
                  <div
                    className={cn(
                      'cursor-pointer capitalize',
                      themeConfig.warningTextColor,
                      themeConfig.warningTextHover,
                      themeConfig.warningTextActive
                    )}
                  >
                    <FormattedMessage id="order_view_cancel" />
                  </div>
                )}
              </div>
            </FlexBox>
            <FlexBox className="space-x-10">
              <FlexBox className="gap-x-1.5">
                <FormattedMessage id="order_view_payment_status" />
                <div>
                  {order.cancelled ? (
                    <div className={cn(themeConfig.successTextColor)}>
                      <FormattedMessage id="order_view_payment_status_cancelled" />
                    </div>
                  ) : order.pending ? (
                    <div className={cn(themeConfig.warningTextColor)}>
                      <FormattedMessage id="order_view_payment_status_awaiting" />
                    </div>
                  ) : (
                    <div className={cn(themeConfig.successTextColor)}>
                      <FormattedMessage id="order_view_payment_status_paid" />
                    </div>
                  )}
                </div>
              </FlexBox>
              <FlexBox className="gap-x-1.5">
                <FormattedMessage id="order_view_total" />
                <Currency amount={order.total} className="font-semibold" />
              </FlexBox>
            </FlexBox>
            <div className="space-y-2">
              {order.products.map((orderHasProduct, i) => {
                console.log(orderHasProduct.product.thumbnail)
                return (
                  <>
                    <FlexBox key={i} className="items-center px-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${orderHasProduct.product.thumbnail}`}
                        height="158"
                        width="158"
                        alt=""
                        className="h-20 w-20"
                      />
                      <FlexBox direction="col" className="mx-2 h-full w-10">
                        <H3>
                          <FormattedMessage
                            id="order_view_quantity"
                            values={{ amount: orderHasProduct.quantity }}
                          />
                        </H3>
                      </FlexBox>
                      <FlexBox className="items-center space-x-1 md:min-w-[24rem]">
                        <H3 className="font-bold">
                          {orderHasProduct.product.brand.name}
                        </H3>
                        <H3>{orderHasProduct.product.name}</H3>
                      </FlexBox>
                      <FlexBox direction="col" className="md:ml-2">
                        {order.cancelled ? (
                          <H4>
                            <FormattedMessage id="order_view_cancelled" />
                          </H4>
                        ) : !order.pending ? (
                          <H4 className={cn(themeConfig.successTextColor)}>
                            <FormattedMessage
                              id="order_view_shipped"
                              values={{
                                date: intl.formatDate(order.shipped as Date),
                              }}
                            />
                          </H4>
                        ) : (
                          <H4>-</H4>
                        )}
                      </FlexBox>
                    </FlexBox>
                  </>
                )
              })}
            </div>
          </Box>
        )
      })}
    </FlexBox>
  )
}
