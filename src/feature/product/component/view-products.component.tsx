import { Button, FlexBox, PageHeading } from '@component'
import { useQuery } from '@apollo/client'
import FetchProducts from '@feature/product/graphql/fetch-products.graphql'
import {
  useFilterPrams,
  usePaginationParams,
  ProductGrid,
  BrandFilter,
  ColorFilter,
  ProcessorFilter,
  StorageFilter,
  RamFilter,
} from '@feature/product'
import { useRouter } from 'next/router'
import {
  PAGINATION_TAKE_DEFAULT,
  PAGINATION_TAKE_PARAM_NAME,
} from '@shared/constant'
import { NumberParam, useQueryParam, withDefault } from 'use-query-params'
import { FormattedMessage } from 'react-intl'
import cn from 'classnames'
import { useEffect } from 'react'

export const ViewProducts = () => {
  const [take] = useQueryParam(
    PAGINATION_TAKE_PARAM_NAME,
    withDefault(NumberParam, PAGINATION_TAKE_DEFAULT)
  )

  const { query, pathname, replace } = useRouter()

  const filterArgs = useFilterPrams(query)
  const paginationArgs = usePaginationParams(query)

  const { data, loading, error } = useQuery(FetchProducts, {
    variables: {
      paginationArgs,
      filterArgs,
    },
    fetchPolicy: 'cache-and-network',
  })

  const showMoreItems = (take: number) => {
    query.take = (take + PAGINATION_TAKE_DEFAULT).toString()
    replace(
      {
        pathname,
        query,
      },
      undefined,
      { scroll: true }
    )
  }

  const handleClickScroll = () => {
    const element = document.getElementById(
      'bottom-scroll-after-loading-more-data'
    )
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      parseInt(query.take as string) > PAGINATION_TAKE_DEFAULT &&
        handleClickScroll()
    }, 200)
  }, [query.take])

  //const image = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/images/category/smartphone.jpg`
  const image = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/images/category/mobile.jpg`
  return (
    <PageHeading
      labelLocale="product_smartphone_view_index"
      image={image}
      subLabelLocale={
        data?.products?.data && take !== PAGINATION_TAKE_DEFAULT
          ? 'product_index_count_of'
          : data?.products?.count > 1
          ? 'product_index_count'
          : 'product_index_single_count'
      }
      subLabelValues={
        data?.products?.data && take !== PAGINATION_TAKE_DEFAULT
          ? {
              currentCount: data.products?.data?.length,
              total: data?.products?.count,
            }
          : { count: data?.products?.count }
      }
    >
      <FlexBox className="hidden w-full flex-wrap gap-x-2 gap-y-2 pb-4 lg:flex">
        <BrandFilter />
        <ColorFilter />
        <ProcessorFilter />
        <StorageFilter />
        <RamFilter />
      </FlexBox>

      <ProductGrid
        error={error}
        loading={loading}
        productData={data?.products?.data}
      />

      <div id="bottom-scroll-after-loading-more-data"></div>

      <FlexBox
        className={cn(
          'w-full items-center justify-center gap-y-2',
          data?.products?.count > data?.products?.data?.length
            ? 'mt-14'
            : 'mt-2'
        )}
        direction="col"
      >
        <FormattedMessage
          id="product_index_count_of"
          values={{
            currentCount: data?.products?.data?.length,
            total: data?.products?.count,
          }}
        />
        {data?.products?.count > data?.products?.data?.length && (
          <Button onClick={() => showMoreItems(take)} style="primary">
            <FormattedMessage id="product_view_load_more" />
          </Button>
        )}
      </FlexBox>
    </PageHeading>
  )
}
