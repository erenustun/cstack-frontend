import { Product } from '@feature/product'
import { BaseEntity } from '@shared/model'
import { User } from '@feature/account'

export class ProductRating extends BaseEntity {
  star: number
  text: string
  product: Product
  user: User
}
