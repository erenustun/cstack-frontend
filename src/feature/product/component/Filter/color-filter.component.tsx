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

export const ColorFilter = () => {
  const { query } = useRouter()

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const { color } = useFilterPrams(query)

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
      activeList={color}
      buttonClassName="w-40"
      disabled={true}
      label={<FormattedMessage id="product_view_filter_select_color" />}
      list={[
        { label: 'Midnight Blue', value: 'midnightBlue' },
        { label: 'Space Gray', value: 'spaceGray' },
      ]}
      //list={data?.groupedColor}
      handleChange={onChange}
      handleReset={() => removeParam(FILTER_OPTIONS.color)}
    />
  )
}
