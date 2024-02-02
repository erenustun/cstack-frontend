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
import FetchPlaceholder from '@feature/product/graphql/fetch-grouped-ram.graphql'

export const ProcessorFilter = () => {
  const { query } = useRouter()

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const { cpu } = useFilterPrams(query)

  const { toggleParam, removeParam } = useRouterParams()

  const { data, loading, error } = useQuery(FetchPlaceholder, {
    fetchPolicy: 'cache-and-network',
  })

  const onChange = (value: number | string) =>
    toggleParam(FILTER_OPTIONS.cpu, value)

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
      activeList={cpu}
      buttonClassName="w-48"
      disabled={true}
      label={<FormattedMessage id="product_view_filter_select_cpu" />}
      list={[
        { label: 'Snapdragon 888', value: 'snap888' },
        { label: 'Snapdragon 8 Gen 2', value: 'snap8g2' },
        { label: 'Apple A16 Bionic', value: 'a16bionic' },
      ]}
      //list={data?.groupedCpu}
      handleChange={onChange}
      handleReset={() => removeParam(FILTER_OPTIONS.cpu)}
    />
  )
}
