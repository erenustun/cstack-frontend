import { FILTER_OPTIONS } from '@feature/product'

const useFilterPrams = (query: any) => {
  const brand = query[FILTER_OPTIONS.brand]
    ? Array.isArray(query[FILTER_OPTIONS.brand])
      ? (query[FILTER_OPTIONS.brand] as string[])
      : ([query[FILTER_OPTIONS.brand]] as string[])
    : undefined

  const category = query[FILTER_OPTIONS.category]
    ? Array.isArray(query[FILTER_OPTIONS.category])
      ? (query[FILTER_OPTIONS.category] as string[])
      : ([query[FILTER_OPTIONS.category]] as string[])
    : undefined

  const color = query[FILTER_OPTIONS.color]
    ? Array.isArray(query[FILTER_OPTIONS.color])
      ? (query[FILTER_OPTIONS.color] as string[])
      : ([query[FILTER_OPTIONS.color]] as string[])
    : undefined

  const cpu = query[FILTER_OPTIONS.cpu]
    ? Array.isArray(query[FILTER_OPTIONS.cpu])
      ? (query[FILTER_OPTIONS.cpu] as string[])
      : ([query[FILTER_OPTIONS.cpu]] as string[])
    : undefined

  const ram = query[FILTER_OPTIONS.ram]
    ? Array.isArray(query[FILTER_OPTIONS.ram])
      ? (query[FILTER_OPTIONS.ram] as string[]).map((value: string) =>
          parseInt(value)
        )
      : [parseInt(query[FILTER_OPTIONS.ram] as string)]
    : undefined

  const storage = query[FILTER_OPTIONS.storage]
    ? Array.isArray(query[FILTER_OPTIONS.storage])
      ? (query[FILTER_OPTIONS.storage] as string[]).map((value: string) =>
          parseInt(value)
        )
      : [parseInt(query[FILTER_OPTIONS.storage] as string)]
    : undefined

  const priceMin = query[FILTER_OPTIONS.minPrice]
    ? parseFloat(query[FILTER_OPTIONS.minPrice] as string)
    : undefined

  const priceMax = query[FILTER_OPTIONS.maxPrice]
    ? parseFloat(query[FILTER_OPTIONS.maxPrice] as string)
    : undefined

  return {
    ...(brand && { brand }),
    ...(category && { category }),
    ...(color && { color }),
    ...(cpu && { cpu }),
    ...(ram && { ram }),
    ...(storage && { storage }),
    ...(priceMin && { priceMin }),
    ...(priceMax && { priceMax }),
  }
}
export { useFilterPrams }
