import { PAGINATION_TAKE_DEFAULT } from '@shared/constant'

export const usePaginationParams = (query: any) => {
  const { take } = query
  return {
    take: take ? parseInt(take as string) : PAGINATION_TAKE_DEFAULT,
  }
}
