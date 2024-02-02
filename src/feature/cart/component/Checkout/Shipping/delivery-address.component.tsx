import FetchAddresses from '@feature/address/graphql/fetch-addresses.graphql'
import SwapMainShipping from '@feature/address/graphql/update-primary-shipping.graphql'
import { useMutation, useQuery } from '@apollo/client'
import { AnimateIn, Button, H3 } from '@component'
import { FormattedMessage } from 'react-intl'
import { Address, AddressType } from '@feature/address'
import { SelectAddress } from '@feature/cart'
import { HomeIcon } from '@heroicons/react/24/outline'
import useAddressStore from '@shared/store/user/address.store'
import React, { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useLayoutStore from '@shared/store/layout/layout.store'

export const Shipping = () => {
  const { mainShipping, setMainShipping } = useAddressStore(
    useShallow(state => state)
  )

  const { showUpdateShipping, closeCreateShipping, toggleUpdateAddress } =
    useLayoutStore(useShallow(state => state))

  const { data, error, loading } = useQuery(FetchAddresses, {
    variables: {
      filterArgs: {
        primary: true,
        type: AddressType.SHIPPING,
      },
    },
    onCompleted: data => {
      setMainShipping(data?.addresses[0] as Address)
    },
  })

  const [swapMainShippingAddress] = useMutation(SwapMainShipping, {
    variables: {
      addressId: mainShipping?.id,
    },
    refetchQueries: [FetchAddresses],
    onCompleted: () => {
      toggleUpdateAddress()
      closeCreateShipping()
    },
  })

  useEffect(() => {
    !mainShipping && setMainShipping(data?.addresses[0] as Address)
  }, [data?.addresses, mainShipping, setMainShipping])

  if (error) {
    return <h1>Error: {error.message}</h1>
  }

  return (
    <div className={'space-y-2.5'}>
      <H3 className="flex items-center gap-x-1.5">
        <HomeIcon className="h-5 w-5" />
        <FormattedMessage id="checkout_view_shipping_index" />
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
              <p className={'font-medium'}>
                <FormattedMessage id={'checkout_view_shipping'} />
              </p>
              <p className={'font-light'}>
                <FormattedMessage id={'checkout_view_shipping_info'} />
              </p>
            </div>
            <div className={'flex flex-col gap-y-1'}>
              <p className={'font-medium'}>
                <FormattedMessage id={'checkout_view_shipping_address'} />
              </p>
              <p className={'flex flex-col font-light'}>
                <span>{`${data?.addresses[0]?.firstName} ${data?.addresses[0]?.lastName}`}</span>
                <span>{`${data?.addresses[0]?.line1}`}</span>
                <span>{`${data?.addresses[0]?.countryCode}-${data?.addresses[0]?.zipCode} ${data?.addresses[0]?.state}`}</span>
              </p>
            </div>
          </>
        )}
        {showUpdateShipping ? (
          <Button
            onClick={swapMainShippingAddress}
            className={'absolute bottom-3 right-0 mr-3 mt-3 self-end'}
          >
            <FormattedMessage id={'checkout_view_save'} />
          </Button>
        ) : (
          <Button
            onClick={toggleUpdateAddress}
            className={'absolute bottom-3 right-0 mb-3 mr-3 self-end'}
          >
            <FormattedMessage id="checkout_view_edit" />
          </Button>
        )}
        <AnimateIn direction="to-bottom" show={showUpdateShipping}>
          <SelectAddress />
        </AnimateIn>
      </div>
    </div>
  )
}
