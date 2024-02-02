import { BaseEntity } from '@shared/model'
import { User } from '@feature/account'
import { Invoice } from '@feature/order'

export class CreditCard extends BaseEntity {
  cardType: string
  creditCardNumber: string
  expirationDate: Date
  expirationDateFormatted?: string
  main?: boolean
  invoice?: Invoice[]
  user?: User
}
