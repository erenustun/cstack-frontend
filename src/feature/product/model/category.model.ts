import { Product } from '@feature/product'
import { BaseEntity } from '@shared/model'

export class ProductCategory extends BaseEntity {
  name: string
  product?: Product
}
