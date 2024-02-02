import { UpdateAddress } from '@feature/address/component/update-address.component'
import { ArrowLongLeftIcon as BackIcon } from '@heroicons/react/20/solid'
import { FlexBox, H2 } from '@component'
import { FormattedMessage } from 'react-intl'
import { useRouter } from 'next/router'

export const UpdateAddressView = () => {
  const { back } = useRouter()

  return (
    <FlexBox className="w-full flex-grow" direction="col">
      <div className="flex cursor-pointer items-center" onClick={() => back()}>
        <BackIcon className="mb-3 mr-2 h-5 w-5" />
        <H2>
          <FormattedMessage id="address_form_update" />
        </H2>
      </div>

      <UpdateAddress />
    </FlexBox>
  )
}
