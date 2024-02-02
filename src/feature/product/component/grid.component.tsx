import { Card, Product } from '@feature/product'
import { FlexBox } from '@component'
import { ApolloError } from '@apollo/client'
import { FormattedMessage } from 'react-intl'

interface ProductGridProps {
  error?: ApolloError | string
  loading?: boolean
  productData: []
}

export const ProductGrid = ({
  error,
  loading,
  productData,
}: ProductGridProps) => {
  if (loading) {
    return (
      <div className="my-5 grid grid-cols-1 gap-y-8 md:grid-cols-2 2xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map(item => {
          return (
            <FlexBox
              key={item}
              direction="col"
              className="h-[25rem] w-full gap-y-2"
            >
              <div className="ml-9 h-80 w-4/5 animate-pulse rounded bg-loading"></div>
              <div className="ml-9 h-4 w-20 animate-pulse rounded bg-loading"></div>
              <FlexBox className="ml-9 w-4/5 justify-between">
                <div className="h-4 w-20 animate-pulse rounded bg-loading"></div>
                <div className="h-4 w-20 animate-pulse rounded bg-loading"></div>
              </FlexBox>
              <div className="ml-9 h-4 w-4/5 animate-pulse rounded bg-loading"></div>
              <div className="ml-9 h-4 w-4/5 animate-pulse rounded bg-loading"></div>
            </FlexBox>
          )
        })}
      </div>
    )
  }

  if (error) return <FormattedMessage id="app_error" />

  return (
    <div className="my-5 grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 2xl:grid-cols-3">
      {productData.map((product: Product, i: number) => (
        <Card
          key={i}
          brand={product.brand}
          category={product.category}
          id={product.id}
          name={product.name}
          price={product.price}
          ratingAverage={product.ratingAverage}
          sku={product.sku}
          specification={product?.specification}
          stock={product.stock}
          thumbnail={product.thumbnail}
        />
      ))}
    </div>
  )
}
