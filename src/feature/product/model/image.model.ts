import { BaseEntity } from '@shared/model'
import { Product } from '@feature/product'

export class ProductImage extends BaseEntity {
  url: string
  product?: Product
}
