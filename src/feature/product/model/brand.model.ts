import { Product } from '@feature/product'
import { BaseEntity } from '@shared/model'

export class ProductBrand extends BaseEntity {
  name: string
  product?: Product
}
