import { FlexBox, H2 } from '@component'
import { CreateAddress } from '@feature/address/component/create-address.component'
import { FormattedMessage } from 'react-intl'
import { useRouter } from 'next/router'
import { ArrowLongLeftIcon as BackIcon } from '@heroicons/react/20/solid'

export const CreateAddressView = () => {
  const { back } = useRouter()

  return (
    <FlexBox className="w-full flex-grow" direction="col">
      <div className="flex cursor-pointer items-center" onClick={() => back()}>
        <BackIcon className="mb-3 mr-2 h-5 w-5" />
        <H2>
          <FormattedMessage id="address_form_create_index" />
        </H2>
      </div>
      <CreateAddress />
    </FlexBox>
  )
}
