import React from 'react'
import { FormattedMessage } from 'react-intl'
import { AnimateIn, Button, H3 } from '@component'
import { CreditCardIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@apollo/client'
import FetchCreditCards from '@shared/graphql/Customer/fetch-payment-cards.graphql'
import FetchBillingAddresses from '@feature/address/graphql/fetch-addresses.graphql'
import { SelectPaymentMethod } from '@feature/cart'
import { CreditCard } from '@feature/order'
import useLayoutStore from '@shared/store/layout/layout.store'
import { useShallow } from 'zustand/react/shallow'

export const PaymentMethod = () => {
  const { showUpdatePayment, toggleUpdatePayment } = useLayoutStore(
    useShallow(state => state)
  )

  const { data, loading } = useQuery(FetchCreditCards)
  const { data: billingData, loading: billingLoading } = useQuery(
    FetchBillingAddresses,
    {
      variables: {
        filterArgs: {
          type: 'billing',
        },
      },
    }
  )

  console.log(!loading && billingData.addresses)

  return (
    <div className={'space-y-2.5'}>
      <H3 className="flex items-center gap-x-1.5">
        <CreditCardIcon className="h-5 w-5" />
        <FormattedMessage id="checkout_view_payment_index" />
      </H3>
      <div
        className={`relative space-y-3 rounded-lg px-3 py-4 shadow-lg dark:bg-slate-900`}
      >
        {loading ? (
          <>
            <div className={'flex animate-pulse flex-col gap-y-2'}>
              <span className="bg-cool-gray-200 h-2 w-24"></span>
              <span className="bg-cool-gray-200 h-2 w-72"></span>
            </div>
            <div className={'flex animate-pulse flex-col gap-y-2'}>
              <span className="bg-cool-gray-200 h-2 w-40"></span>
              <div className="flex flex-row space-x-2">
                <span className="bg-cool-gray-200 h-2 w-24"></span>
                <span className="bg-cool-gray-200 h-2 w-14"></span>
              </div>
              <div className="flex flex-row space-x-2">
                <span className="bg-cool-gray-200 h-2 w-24"></span>
                <span className="bg-cool-gray-200 h-2 w-14"></span>
              </div>
              <div className="flex flex-row space-x-2">
                <span className="bg-cool-gray-200 h-2 w-24"></span>
                <span className="bg-cool-gray-200 h-2 w-14"></span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={'flex flex-col gap-y-1'}>
              <p className={'flex gap-x-2 font-medium'}>
                <span className="capitalize">
                  {
                    data?.creditCards.filter(
                      (card: CreditCard) => card.main === true
                    )[0].cardType
                  }
                </span>
                <span>****</span>
                <span>
                  {data?.creditCards
                    .filter((card: CreditCard) => card.main === true)[0]
                    .creditCardNumber.slice(-4)}
                </span>
              </p>
              <p className={'font-light'}>
                <FormattedMessage id={'checkout_view_payment_credit_card'} />
              </p>
            </div>
            <div className={'flex flex-col gap-y-1'}>
              <p className={'font-medium'}>
                <FormattedMessage
                  id={'checkout_view_payment_invoice_address'}
                />
              </p>
              {!billingLoading && (
                <p className={'flex flex-col font-light'}>
                  <span>{`${billingData?.addresses[0]?.firstName} ${billingData?.addresses[0]?.lastName}`}</span>
                  <span>{`${billingData?.addresses[0]?.line1}`}</span>
                  <span>{`${billingData?.addresses[0]?.countryCode}-${billingData?.addresses[0]?.zipCode} ${billingData?.addresses[0]?.state}`}</span>
                </p>
              )}
            </div>
          </>
        )}
        {showUpdatePayment ? (
          <Button
            onClick={toggleUpdatePayment}
            className={'absolute bottom-3 right-0 mr-3 mt-3 self-end'}
          >
            <FormattedMessage id={'checkout_view_save'} />
          </Button>
        ) : (
          <Button
            onClick={toggleUpdatePayment}
            className={'absolute bottom-3 right-0 mb-3 mr-3 self-end'}
          >
            <FormattedMessage id="checkout_view_edit" />
          </Button>
        )}
        <AnimateIn direction="to-bottom" show={showUpdatePayment}>
          <SelectPaymentMethod />
        </AnimateIn>
      </div>
    </div>
  )
}
