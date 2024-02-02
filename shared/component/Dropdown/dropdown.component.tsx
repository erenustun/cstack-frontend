import React, { ReactNode, useCallback, useState } from 'react'
import Link from 'next/link'
import { pushUri } from '@shared/util'
import cx from 'classnames'
import cn from 'classnames'
import { FormattedMessage } from 'react-intl'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { themeConfig } from '@shared/config'

interface DropdownConditionActionProps {
  action: () => void
  condition: boolean
}

interface DropdownItem {
  href?: string
  onClick?: (item: any) => void
  intl?: string
  destructive?: boolean
  preItemComponent?: ReactNode | JSX.Element | string | number
}

interface DropdownProps {
  actionOnCondition?: DropdownConditionActionProps
  buttonClassName?: string
  className?: string
  iconButton?: boolean
  label: ReactNode | JSX.Element | string | number
  list: DropdownItem[] | any[]
  listClassName?: string
  onClick?: any
  postLabelComponent?: ReactNode | JSX.Element | string | number
  preLabelComponent?: ReactNode | JSX.Element | string | number
  transparentBackground?: boolean
  withCaret?: boolean
}

export const Dropdown = ({
  actionOnCondition,
  buttonClassName,
  className,
  iconButton = false,
  label,
  list,
  listClassName,
  onClick,
  postLabelComponent,
  preLabelComponent,
  transparentBackground = false,
  withCaret = false,
}: DropdownProps) => {
  const [dropdown, setDropdown] = useState(false)
  const toggleDropdown = () => setDropdown(!dropdown)

  const handleButtonClick = () =>
    actionOnCondition?.condition ? actionOnCondition.action() : toggleDropdown()

  const renderCaret = useCallback(() => {
    return dropdown ? (
      <ChevronDownIcon className="mr-1.25 mr-1.5 h-4" />
    ) : (
      <ChevronUpIcon className="mr-1.25 mr-1.5 h-4" />
    )
  }, [dropdown])

  return (
    <div className={cx('relative block', className, iconButton && 'w-7')}>
      <div
        onClick={handleButtonClick}
        className={cn(
          'flex cursor-pointer select-none items-center justify-center uppercase',
          !buttonClassName
            ? `dropdown-button ${
                transparentBackground
                  ? 'bg-transparent !px-0 !shadow-none'
                  : 'dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700'
              }`
            : buttonClassName
        )}
      >
        {preLabelComponent}
        {label}
        {postLabelComponent}
        {withCaret && renderCaret()}
      </div>
      <div
        className={`bg-secondary-500 absolute right-0 top-0 z-50 mt-10 transform-gpu rounded border border-slate-800 shadow-lg transition duration-300 ease-in-out dark:bg-slate-900 sm:top-full sm:mt-2 ${
          dropdown
            ? 'translate-y-0 opacity-100'
            : '-z-10 -translate-y-[15rem] select-none opacity-0'
        }`}
      >
        {list && dropdown && (
          <div className={listClassName}>
            {list.map((item: DropdownItem, i) => (
              <div
                key={i}
                className={`hover:bg-secondary-400 transform transition duration-100 ease-in hover:scale-105 dark:hover:bg-blue-900 ${
                  i + 1 === list.length ? 'rounded-b' : i === 0 && 'rounded-t'
                }`}
                onClick={e => {
                  e.preventDefault()
                  item.href && pushUri(item.href as string)
                  setTimeout(() => {
                    setDropdown(false)
                  }, 250)
                }}
              >
                <div
                  className={cn(
                    'relative cursor-pointer select-none px-3 py-2 text-sm'
                  )}
                >
                  {item.href ? (
                    <Link href={item.href}>
                      {item.destructive && <div className="pt-5"></div>}
                      <div className={'flex items-center gap-x-1.5'}>
                        {item.preItemComponent}
                        <FormattedMessage id={item.intl} />
                      </div>
                    </Link>
                  ) : (
                    <div
                      className={'flex'}
                      onClick={() => {
                        // eslint-disable-next-line no-unused-expressions
                        item.onClick ? item.onClick(item) : onClick(item)
                        setTimeout(() => {
                          setDropdown(false)
                        }, 250)
                      }}
                    >
                      {item.intl ? (
                        <>
                          {item.preItemComponent}
                          <FormattedMessage id={item.intl} />
                        </>
                      ) : (
                        <>
                          {item.preItemComponent}
                          {item}
                        </>
                      )}
                    </div>
                  )}
                </div>
                {i + 1 !== list.length && (
                  <div className={'h-[1px] w-full dark:bg-slate-800'} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
