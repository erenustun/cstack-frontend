import { Invoice, OrderHasProduct } from '@feature/order'
import { Address } from '@feature/address'
import { User } from '@feature/account'
import { BaseEntity } from '@shared/model'

export class Order extends BaseEntity {
  cancelled?: Date | null
  created?: Date
  deleted?: Date
  deliverTo?: Address
  invoice?: Invoice
  pending: boolean
  products: OrderHasProduct[]
  shipped?: Date | null
  total: number
  updated?: Date
  user?: User | null
}
