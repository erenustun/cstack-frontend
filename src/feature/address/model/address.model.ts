import { BaseEntity } from '@shared/model'
import { AddressType, Country } from '@feature/address'
import { User } from '@feature/account'
import { Invoice, Order } from '@feature/order'

export class Address extends BaseEntity {
  companyName?: string
  countryCode: Country
  firstName: string
  invoice?: Invoice[]
  lastName: string
  line1: string
  order?: Order[]
  phone?: string
  primary?: boolean
  state: string
  title?: string
  type: AddressType
  user?: User
  zipCode: string
}
