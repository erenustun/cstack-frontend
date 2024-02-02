import { BaseEntity } from '@shared/model'
import { Address } from '@feature/address'
import { Order, CreditCard } from '@feature/order'

export class Invoice extends BaseEntity {
  billTo?: Address
  card?: CreditCard
  order?: Order
  paid?: Date | null
}
