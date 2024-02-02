import { Loader } from '@component'
import { useRouter } from 'next/router'
import {
  FILTER_OPTIONS,
  useFilterPrams,
  FilterDropdown,
} from '@feature/product'
import { useRouterParams } from '@shared/util'
import { useQuery } from '@apollo/client'
import FetchGroupedBrands from '@feature/product/graphql/fetch-grouped-brand.graphql'
import { FormattedMessage } from 'react-intl'

export const BrandFilter = () => {
  const { query } = useRouter()

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const { brand } = useFilterPrams(query)

  const { removeParam, toggleParam } = useRouterParams()

  const { data, loading, error } = useQuery(FetchGroupedBrands, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading)
    return (
      <Loader
        loading={loading}
        message={<FormattedMessage id="address_view_fetching" />}
      />
    )

  if (error) return <h1>Error: {error.message}</h1>

  return (
    <FilterDropdown
      activeList={brand}
      label={<FormattedMessage id="product_view_filter_select_brand" />}
      list={data?.groupedBrand}
      handleChange={(value: number | string) =>
        toggleParam(FILTER_OPTIONS.brand, value)
      }
      handleReset={() => removeParam(FILTER_OPTIONS.brand)}
    />
  )
}
