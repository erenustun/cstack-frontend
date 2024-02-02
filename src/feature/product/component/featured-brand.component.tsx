import { List } from '@component'
import { useQuery } from '@apollo/client'
import FetchBrands from '@feature/product/graphql/fetch-grouped-brand.graphql'
import { pushUri, useRouterParams } from '@shared/util'
import { FILTER_OPTIONS } from '@feature/product'
import { routeConfig } from '@shared/config'

interface FeaturedBrandProps {
  className?: string
}

export const FeaturedBrand = ({ className }: FeaturedBrandProps) => {
  const { data, loading, error } = useQuery(FetchBrands, {
    fetchPolicy: 'cache-and-network',
  })

  const onClick = (param: string | number) =>
    pushUri(
      `${routeConfig.PRODUCT.INDEX}${routeConfig.PRODUCT.INDEX_DEFAULT_PARAMS}&${FILTER_OPTIONS.brand}=${param}`
    )

  return (
    <List
      className={className}
      error={error}
      list={data?.groupedBrand}
      labelLocale="product_view_featured_brands"
      loading={loading}
      onClick={onClick}
    />
  )
}
