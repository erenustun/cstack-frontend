import { FlexBox } from '@component'

interface LoadingListProps {
  loading: boolean
}

export const LoadingList = ({ loading = true }: LoadingListProps) => {
  if (loading) {
    return (
      <FlexBox direction="col" className="max-w-left-sidebar">
        <div className="mb-3 h-6 animate-pulse rounded-sm bg-loading"></div>
        <div className="space-y-1.5">
          <div className="h-3 w-36 animate-pulse rounded-sm bg-loading"></div>
          <div className="h-3 w-44 animate-pulse rounded-sm bg-loading"></div>
          <div className="h-3 w-40 animate-pulse rounded-sm bg-loading"></div>
          <div className="h-3 w-28 animate-pulse rounded-sm bg-loading"></div>
          <div className="h-3 w-36 animate-pulse rounded-sm bg-loading"></div>
        </div>
      </FlexBox>
    )
  }
}
