import { BaseEntity } from '@shared/model'
import {
  ProductBrand,
  ProductCategory,
  ProductImage,
  ProductRating,
  ProductSpecification,
} from '@feature/product'
import { OrderHasProduct } from '@feature/order'

export class Product extends BaseEntity {
  description?: string
  discount?: number
  name: string
  osUpgradable?: number
  price: number
  ratingAverage?: number
  sku: string
  stock: number
  thumbnail?: string
  warranty?: number
  brand: ProductBrand
  category: ProductCategory
  image?: ProductImage[]
  order?: OrderHasProduct[]
  rating?: ProductRating[]
  specification: ProductSpecification
}

export class GroupedRamResponse {
  label: string
  value: number
}

export class GroupedStorageResponse {
  label: string
  value: number
}
