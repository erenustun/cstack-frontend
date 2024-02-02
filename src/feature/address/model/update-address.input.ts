import { BaseEntity } from '@shared/model'
import { AddressType, Country } from '@feature/address'

export class UpdateAddressInput extends BaseEntity {
  title?: string
  firstName?: string
  lastName?: string
  companyName?: string
  line1?: string
  zipCode?: string
  state?: string
  phone?: string
  countryCode?: Country | string
  primary?: boolean
  type?: AddressType | string
}
