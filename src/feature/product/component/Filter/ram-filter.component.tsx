import { Loader } from '@component'
import { useRouterParams } from '@shared/util'
import {
  FILTER_OPTIONS,
  useFilterPrams,
  FilterDropdown,
} from '@feature/product'
import { FormattedMessage } from 'react-intl'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import FetchGroupedRam from '@feature/product/graphql/fetch-grouped-ram.graphql'

export const RamFilter = () => {
  const { query } = useRouter()

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const { ram } = useFilterPrams(query)

  const { toggleParam, removeParam } = useRouterParams()

  const { data, loading, error } = useQuery(FetchGroupedRam, {
    fetchPolicy: 'cache-and-network',
  })

  const onChange = (value: number | string) =>
    toggleParam(FILTER_OPTIONS.ram, value)

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
      activeList={ram}
      buttonClassName="w-40"
      label={<FormattedMessage id="product_view_filter_select_ram" />}
      list={data?.groupedRam}
      handleChange={onChange}
      handleReset={() => removeParam(FILTER_OPTIONS.ram)}
      unit="GB"
    />
  )
}
