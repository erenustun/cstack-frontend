import { FlexBox, H2, LoadingList } from '@component'
import { FormattedMessage } from 'react-intl'
import { ApolloError } from '@apollo/client'
import cn from 'classnames'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { themeConfig } from '@shared/config'
import { ReactNode } from 'react'

interface ListProps {
  className?: string
  error?: ApolloError | string
  isNav?: boolean
  labelLocale?: string
  list: ListItemProps[]
  loading?: boolean
  onClick?: (label: string | number) => void
}

interface ListItemProps {
  label?: ReactNode | string | number | null
  onClick?: () => void
  isParent?: boolean
  value?: number | string
}

export const List = ({
  className,
  error,
  isNav = false,
  labelLocale,
  list,
  loading,
  onClick,
}: ListProps) => {
  if (loading) {
    return <LoadingList loading={loading} />
  }

  if (error) return null

  return (
    <div className={cn(className, themeConfig.sidebarWidthLeft)}>
      {labelLocale && (
        <H2>
          <FormattedMessage id={labelLocale} />
        </H2>
      )}
      <ul
        className={cn(
          'select-none space-y-1 tracking-wide',
          isNav && 'w-full space-y-1.5'
        )}
      >
        {list?.map((listItem, index) => {
          return (
            <li
              key={index}
              className={cn(
                'animation-speed-movement flex cursor-pointer items-center capitalize text-primary-text hover:text-primary-hover active:text-primary-active',
                isNav && 'w-full items-center justify-between py-2 text-xl'
              )}
              onClick={() =>
                listItem.onClick
                  ? listItem.onClick()
                  : onClick &&
                    onClick(
                      (listItem.value as number) ?? (listItem.label as string)
                    )
              }
            >
              <span>{listItem.label ?? listItem.value}</span>
              {isNav && <ArrowRightIcon className="h-6 w-6" />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
