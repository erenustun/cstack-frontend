import { Order } from '@feature/order'
import { Product } from '@feature/product'

export class OrderHasProduct {
  id: string
  quantity: number
  order: Order
  product: Product
}
