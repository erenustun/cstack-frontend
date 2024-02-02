import Link from 'next/link'
import React, { PropsWithChildren, ReactNode, useState } from 'react'
import cn from 'classnames'
import { FormattedMessage } from 'react-intl'
import { FlexBox } from '@shared/component'
import { useRouter } from 'next/router'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

interface LinkProps {
  as?: string
  className?: string
  href: string
  icon?: ReactNode | string | number
  iconActiveState?: ReactNode | string | number
  intl?: string
  navLink?: boolean
  subLinks?: SubLinkProps[]
}

interface SubLinkProps {
  intl: string
  href: string
  subLinks?: SubLinkProps[]
}

// eslint-disable-next-line react/display-name,import/no-anonymous-default-export
export default ({
  as,
  children,
  className,
  href,
  icon,
  iconActiveState,
  intl,
  navLink = false,
  subLinks,
}: PropsWithChildren<LinkProps>) => {
  const { pathname } = useRouter()
  const hrefPathname = (href as string).split('?')[0]
  const [isSubLinkVisible, setSubLinkVisibility] = useState(false)
  const [isSubSubLinkVisible, setSubSubLinkVisibility] = useState(false)

  return (
    <Link
      as={as}
      href={href}
      className={cn(
        navLink
          ? 'text-xl font-medium text-default-text-light'
          : 'text-base font-normal text-default',
        navLink && pathname === hrefPathname && 'font-medium',
        //'hover-underline-animation',
        'animation-speed-movement group flex items-center gap-x-0.5 rounded tracking-tight',
        className
      )}
    >
      <FlexBox className="relative z-[9999] items-center px-2 py-2">
        <span className="mt-1 group-hover:text-default-text">
          {navLink
            ? iconActiveState
              ? pathname === hrefPathname
                ? iconActiveState
                : icon
              : icon
            : icon}
        </span>
        <FlexBox
          className="items-center group-hover:text-default-text-light"
          onMouseEnter={() => {
            setSubLinkVisibility(true)
          }}
          onClick={() => {
            setSubLinkVisibility(!isSubLinkVisible)
            setSubSubLinkVisibility(!isSubSubLinkVisible)
          }}
        >
          {children ? children : <FormattedMessage id={intl} />}
          {subLinks && !isSubLinkVisible && (
            <ChevronDownIcon className="ml-2 h-5 w-5 text-default-text-light" />
          )}
          {subLinks && isSubLinkVisible && (
            <ChevronUpIcon className="ml-2 h-5 w-5 text-default-text-light" />
          )}
        </FlexBox>
        {subLinks && (
          <div
            className="absolute -z-10 h-24 w-72 bg-transparent"
            onMouseEnter={() => {
              !isSubLinkVisible && setSubLinkVisibility(true)
            }}
          ></div>
        )}
        {subLinks && isSubLinkVisible && (
          <FlexBox
            className="absolute top-12 ml-1 mt-4 w-72 rounded-md bg-zinc-100 text-lg shadow-lg"
            direction="col"
            onMouseLeave={() => {
              isSubLinkVisible && setSubLinkVisibility(false)
            }}
          >
            {subLinks.map((subLink, i) => {
              return (
                <FlexBox
                  className="relative"
                  key={i}
                  onClick={() => {
                    setSubSubLinkVisibility(!isSubSubLinkVisible)
                  }}
                >
                  {subLink.subLinks && (
                    <div
                      className="absolute h-14 w-72 bg-transparent"
                      onMouseEnter={() => {
                        !isSubSubLinkVisible && setSubSubLinkVisibility(true)
                      }}
                    ></div>
                  )}
                  <Link
                    className="animation-speed-movement w-full px-2 py-3 hover:scale-[102%] hover:bg-gray active:text-primary-active"
                    href={subLink.href}
                  >
                    <FlexBox className="items-center">
                      <FormattedMessage id={subLink.intl} />
                      {subLink.subLinks && !isSubSubLinkVisible && (
                        <ChevronDownIcon className="ml-2 h-5 w-5 text-default-text-light" />
                      )}
                      {subLink.subLinks && isSubSubLinkVisible && (
                        <ChevronUpIcon className="ml-2 h-5 w-5 text-default-text-light" />
                      )}
                    </FlexBox>
                  </Link>
                  {isSubSubLinkVisible && (
                    <FlexBox
                      className="absolute left-72 top-0 -ml-1 w-72 rounded-md bg-zinc-100 text-lg shadow-lg"
                      direction="col"
                      onMouseLeave={() => {
                        isSubSubLinkVisible && setSubSubLinkVisibility(false)
                      }}
                    >
                      {subLink?.subLinks?.map((subbedLink, i) => {
                        return (
                          <Link
                            className="animation-speed-movement px-2 py-3 hover:scale-[102%] hover:bg-gray active:text-primary-active"
                            href={subbedLink.href}
                            key={i}
                          >
                            {subbedLink.intl}
                          </Link>
                        )
                      })}
                    </FlexBox>
                  )}
                </FlexBox>
              )
            })}
          </FlexBox>
        )}
      </FlexBox>
    </Link>
  )
}
