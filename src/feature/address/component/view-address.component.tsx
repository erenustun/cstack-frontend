import { Button, FlexBox, Loader } from '@component'
import { useMutation, useQuery } from '@apollo/client'
import FetchAddresses from '@feature/address/graphql/fetch-addresses.graphql'
import {
  CheckIcon,
  PencilSquareIcon as PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import { routeConfig } from '@shared/config'
import { FormattedMessage } from 'react-intl'
import DeleteAddressMutation from '@feature/address/graphql/remove-address.graphql'
import { Address, AddressType } from '@feature/address'

export const ViewAddress = () => {
  const { data, loading, error } = useQuery(FetchAddresses, {
    variables: {
      filterArgs: {
        type: AddressType.SHIPPING,
      },
    },
    fetchPolicy: 'cache-and-network',
  })

  const [deleteAddress] = useMutation(DeleteAddressMutation, {
    refetchQueries: [FetchAddresses],
  })

  if (loading)
    return (
      <Loader
        loading={loading}
        message={<FormattedMessage id="address_view_fetching" />}
      />
    )

  if (error) return <h1>Error: {error.message}</h1>

  return (
    <FlexBox direction="col" className="w-full">
      <div className="flex px-1 font-medium text-zinc-500">
        <div className="w-52">
          <FormattedMessage id="address_view_name" />
        </div>
        <div className="w-80">
          <FormattedMessage id="address_view_address" />
        </div>
        <div className="w-36">
          <FormattedMessage id="address_view_main_address" />
        </div>
        <div className="w-52">
          <FormattedMessage id="address_view_options" />
        </div>
      </div>
      <div className="px-1 text-primary">
        {data?.addresses?.map((address: Address, index: number) => {
          return (
            <div
              key={index}
              className={`flex items-center py-4 ${
                index + 1 !== data?.addresses?.length &&
                'border-b border-b-zinc-300'
              }`}
            >
              <div className="w-52">
                <FormattedMessage id={`address_form_title_${address?.title}`} />{' '}
                {address.firstName} {address.lastName}
              </div>
              <div className="w-80">{`${address.line1}, ${address.zipCode}, ${address.countryCode}`}</div>
              <div className="w-36">
                {address.primary && (
                  <CheckIcon className="h-5 w-5 text-success" />
                )}
              </div>
              <div className="flex w-56 items-center space-x-3">
                {/*<TableOptions />*/}
                <Link
                  href={`${routeConfig.ACCOUNT.ADDRESS.EDIT}/${address.id}`}
                  className="animation-speed-movement group mt-1 flex cursor-pointer items-center gap-x-2 rounded px-2 hover:bg-foreground active:bg-primary"
                >
                  <PencilIcon
                    className={`h-4 w-4 text-default-text group-hover:text-primary-hover group-active:text-default`}
                  />

                  <span className="mt-1 text-default-text group-hover:text-primary-hover group-active:text-default">
                    Edit
                  </span>
                </Link>
                <FlexBox
                  className="animation-speed-movement group cursor-pointer items-center gap-x-2 rounded px-2 hover:bg-foreground active:bg-danger"
                  onClick={() =>
                    deleteAddress({ variables: { id: address?.id } })
                  }
                >
                  <TrashIcon
                    className={`h-4 w-4 text-default-text group-hover:text-danger group-active:text-default`}
                  />
                  <span className="mt-1 text-default-text group-hover:text-danger group-active:text-default">
                    Delete
                  </span>
                </FlexBox>
              </div>
            </div>
          )
        })}
      </div>
      <Link href={routeConfig.ACCOUNT.ADDRESS.NEW} className="self-end">
        <Button>
          <FormattedMessage id="address_view_create_address" />
        </Button>
      </Link>
    </FlexBox>
  )
}
