import React, { useEffect, useState } from 'react'
import FetchAddresses from '@feature/address/graphql/fetch-addresses.graphql'
import RemoveAddress from '@feature/address/graphql/remove-address.graphql'
import { useMutation, useQuery } from '@apollo/client'
import { FormattedMessage, useIntl } from 'react-intl'
import { Address, AddressType, CreateAddress } from '@feature/address'
import { CheckCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import useAddressStore from '@shared/store/user/address.store'
import { AnimateIn, TextLink } from '@component'
import { useShallow } from 'zustand/react/shallow'
import useLayoutStore from '@shared/store/layout/layout.store'

export const SelectAddress = () => {
  const intl = useIntl()

  const { mainShipping, setMainShipping } = useAddressStore(
    useShallow(state => state)
  )

  const { showCreateShipping, toggleCreateAddress } = useLayoutStore(
    useShallow(state => state)
  )

  const [selectedAddress, setSelectedAddress] = useState<Address>()

  const { data, error, loading } = useQuery(FetchAddresses, {
    variables: {
      filterArgs: {
        type: AddressType.SHIPPING,
      },
    },
  })

  const [removeAddress] = useMutation(RemoveAddress, {
    refetchQueries: [FetchAddresses],
  })

  useEffect(() => {
    setSelectedAddress(
      data?.addresses?.filter((address: Address) => address.primary === true)[0]
    )
    setMainShipping(
      data?.addresses?.filter((address: Address) => address.primary === true)[0]
    )
  }, [data, setMainShipping])

  if (error) {
    return <h1>Error: {error.message}</h1>
  }

  return (
    <div className="mb-4 w-full space-y-3 rounded-sm pb-10 pt-4">
      <span className="text-gray-100 text-lg font-medium">
        <FormattedMessage id="checkout_view_shipping_address" />
      </span>
      <ul>
        {loading ? (
          <>
            {[0, 1, 2].map((n: number, i: number) => (
              <div key={i} className="flex flex-col justify-center">
                <div
                  className={
                    'flex animate-pulse cursor-not-allowed flex-row items-center justify-between'
                  }
                >
                  <div className="flex items-center py-2">
                    <div className="bg-cool-gray-200 h-4 w-4 rounded-full"></div>
                    <div className="ml-2 flex flex-col space-y-3">
                      <div className="flex flex-row space-x-2">
                        <span className="bg-cool-gray-200 h-2 w-16"></span>
                        <span className="bg-cool-gray-200 h-2 w-8"></span>
                      </div>
                      <div className="flex flex-row space-x-2">
                        <span className="bg-cool-gray-200 h-2 w-16"></span>
                        <span className="bg-cool-gray-200 h-2 w-8"></span>
                      </div>
                      <div className="flex flex-row space-x-2">
                        <span className="bg-cool-gray-200 h-2 w-16"></span>
                        <span className="bg-cool-gray-200 h-2 w-8"></span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <i
                      className={`bx bx-trash bx-xs text-cool-gray-200 cursor-not-allowed transition duration-150 ease-in`}
                    ></i>
                  </div>
                </div>
                <div
                  className={
                    'bg-secondary-300 dark:bg-cool-gray-600 my-2 h-[1px] w-full'
                  }
                />
              </div>
            ))}
          </>
        ) : (
          data?.addresses?.map((address: Address, i: number) => (
            <div key={i} className="flex flex-col justify-center gap-y-4">
              <div
                className="flex cursor-pointer flex-row items-center justify-between"
                onClick={() => {
                  setMainShipping(address as Address)
                }}
              >
                <div className="flex items-center">
                  <div className="mr-1 w-5">
                    {mainShipping?.id !== address.id ? (
                      <div className="border-gray-400 h-4 w-4 rounded-full border-[1.5px]"></div>
                    ) : (
                      <CheckCircleIcon className="h-5 w-5" />
                    )}
                    <i
                      className={`bx bx-sm dark:hover:text-cool-gray-300 dark:active:text-gray-700 cursor-pointer transition duration-150 ease-in ${
                        mainShipping?.id === address.id
                          ? 'bx-radio-circle-marked dark:text-blue-600'
                          : 'bx-radio-circle'
                      }`}
                    ></i>
                  </div>
                  <div className="ml-2 flex flex-col">
                    <span>
                      {address.firstName} {address.lastName}
                    </span>
                    <span>{address.line1}</span>
                    <span>
                      {address.countryCode}-{address.zipCode} {address.state}
                    </span>
                  </div>
                </div>
                {selectedAddress?.id !== address.id && (
                  <div>
                    <TrashIcon
                      className="h-5 w-5"
                      onClick={() =>
                        removeAddress({
                          variables: { id: address.id },
                        })
                      }
                    />
                  </div>
                )}
              </div>
              <div
                className={
                  'bg-secondary-300 dark:bg-gray-600 mb-3 h-[1px] w-full'
                }
              />
            </div>
          ))
        )}
        <div>
          <TextLink
            className="mr-auto self-end"
            icon={<PlusIcon className="mr-1 h-5 w-5" />}
            label={intl.formatMessage({ id: 'checkout_view_shipping_new' })}
            onClick={toggleCreateAddress}
          />
        </div>
      </ul>

      <AnimateIn direction="to-bottom" show={showCreateShipping}>
        <CreateAddress />
      </AnimateIn>
      {/*<AddAddress withTransparentBackground />*/}
    </div>
  )
}
