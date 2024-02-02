import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { AnimateIn } from '@component'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export const SelectPaymentMethod = () => {
  const [billingSameAsDelivery, setBillingToDeliveryAddress] =
    useState<boolean>(true)
  const toggleBilling = () =>
    setBillingToDeliveryAddress(!billingSameAsDelivery)

  return (
    <div className={`relative w-full space-y-3 rounded-lg px-3 py-4 shadow-lg`}>
      <div className="mb-4 w-full space-y-3 rounded-sm pb-10 pt-4">
        <div
          className="flex cursor-pointer flex-row items-center justify-between"
          onClick={toggleBilling}
        >
          <div className="flex items-center">
            <div className="mr-1 w-5">
              {billingSameAsDelivery ? (
                <CheckCircleIcon className="h-5 w-5" />
              ) : (
                <div className="border-gray-400 h-4 w-4 rounded-full border-[1.5px]"></div>
              )}
              <i
                className={`bx bx-sm dark:hover:text-cool-gray-300 dark:active:text-gray-700 cursor-pointer transition duration-150 ease-in ${
                  billingSameAsDelivery
                    ? 'bx-radio-circle-marked dark:text-blue-600'
                    : 'bx-radio-circle'
                }`}
              ></i>
            </div>
            <div className="ml-2 flex flex-col">
              <FormattedMessage id="checkout_view_payment_invoice_same" />
            </div>
          </div>
        </div>
        <div
          className={'bg-secondary-300 dark:bg-gray-600 mb-3 h-[1px] w-full'}
        />
        <div
          className="flex cursor-pointer flex-row items-center justify-between"
          onClick={toggleBilling}
        >
          <div className="flex items-center">
            <div className="mr-1 w-5">
              {!billingSameAsDelivery ? (
                <CheckCircleIcon className="h-5 w-5" />
              ) : (
                <div className="border-gray-400 h-4 w-4 rounded-full border-[1.5px]"></div>
              )}
              <i
                className={`bx bx-sm dark:hover:text-cool-gray-300 dark:active:text-gray-700 cursor-pointer transition duration-150 ease-in ${
                  !billingSameAsDelivery
                    ? 'bx-radio-circle-marked dark:text-blue-600'
                    : 'bx-radio-circle'
                }`}
              ></i>
            </div>
            <div className="ml-2 flex flex-col">
              <FormattedMessage id="checkout_view_payment_invoice_another" />
            </div>
          </div>
        </div>
      </div>
      <AnimateIn direction="to-bottom" show={!billingSameAsDelivery}>
        {/*<SelectPaymentMethod /> Create Billing address*/}
        Coming soon
      </AnimateIn>
    </div>
  )
}
