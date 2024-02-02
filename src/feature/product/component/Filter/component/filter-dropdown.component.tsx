import { ReactNode, useState } from 'react'
import { AnimateIn, Button, CheckField, FlexBox } from '@component'
import cn from 'classnames'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon as XMarkIcon,
} from '@heroicons/react/24/solid'
import { useRouterParams } from '@shared/util'
import {
  PAGINATION_TAKE_DEFAULT,
  PAGINATION_TAKE_PARAM_NAME,
} from '@shared/constant'

interface SelectFilterProps {
  activeList?: string[] | number[]
  buttonClassName?: string
  disabled?: boolean
  handleChange: (value: number | string) => void
  handleReset: () => void
  label: ReactNode | string | number
  list: SelectFilterListProps[]
  unit?: string
}

interface SelectFilterListProps {
  label?: ReactNode | string | number
  value: number | string
}

export const FilterDropdown = ({
  activeList = [],
  buttonClassName,
  disabled = false,
  handleChange,
  handleReset,
  label,
  list,
  unit,
}: SelectFilterProps) => {
  const [listOpen, showList] = useState(false)
  const toggleList = () => !disabled && showList(!listOpen)

  const { hasParam, removeParam } = useRouterParams({ method: 'push' })

  const onChange = (value: number | string) => {
    hasParam(PAGINATION_TAKE_PARAM_NAME) &&
      removeParam('take', PAGINATION_TAKE_DEFAULT)
    handleChange(value)
  }

  return (
    <div className="z-[100]">
      <Button
        onClick={toggleList}
        className={cn(
          'flex min-w-[14rem] max-w-[15rem] select-none items-center justify-between border-0 bg-foreground px-3 py-1.5 text-primary-text shadow-md',
          listOpen && '',
          disabled && 'cursor-not-allowed',
          activeList?.length > 0 && 'bg-primary text-default',
          buttonClassName
        )}
        style="primary-dark"
      >
        <FlexBox className="truncate">
          {label}
          {activeList?.length > 0 && ':'}
          <FlexBox className="ml-2 gap-x-1">
            {activeList?.map((listItem, index) => (
              <FlexBox key={index} className="order">
                {listItem}
                {unit}
                {activeList?.length > 1 &&
                  index + 1 !== activeList?.length &&
                  ','}
              </FlexBox>
            ))}
          </FlexBox>
        </FlexBox>
        <div className="items-stretch">
          {activeList?.length > 0 ? (
            <XMarkIcon
              className="h-4 self-center text-default"
              onClick={handleReset}
            />
          ) : listOpen ? (
            <ChevronUpIcon className="h-4 text-primary" />
          ) : (
            <ChevronDownIcon className="h-4 text-primary" />
          )}
        </div>
      </Button>

      <AnimateIn direction="to-bottom" show={listOpen}>
        <div className="fixed z-50 mt-2 w-60 rounded-sm bg-foreground shadow-md">
          {list?.map((listItem, index) => {
            return (
              <div
                key={index}
                className={cn('flex items-center', index !== 0 && 'mt-1')}
                onClick={() =>
                  onChange(
                    (listItem.value ? listItem.value : listItem.label) as
                      | number
                      | string
                  )
                }
              >
                <CheckField
                  value={listItem.value}
                  label={listItem.label}
                  active={
                    !!activeList?.includes(
                      (listItem.value
                        ? listItem.value
                        : listItem.label) as never
                    )
                  }
                />
              </div>
            )
          })}
        </div>
      </AnimateIn>
    </div>
  )
}
