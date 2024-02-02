import Link from 'next/link'
import { ReactNode } from 'react'
import tw from 'tailwind-styled-components'
import { Url } from 'url'
import { themeConfig } from '@shared/config'
import cn from 'classnames'

interface TextLinkProps {
  as?: string
  className?: string
  href?: Url | string
  onClick?: () => void
  icon?: ReactNode | string | null
  label: string | ReactNode
}

const LinkLabel = tw.p`
  active:text-primary-active
  animation-speed-movement
  flex
  hover:text-primary-hover
  items-center
  select-none
  text-primary
  text-sm
`

const TextLinkWrapper = tw.span`
  active:text-primary-active
  animation-speed-movement
  flex
  hover:text-primary-hover
  items-center
  text-primary
  text-sm
`

/*self-end mr-auto text-slate-200 hover:text-slate-50 active:text-slate-400*/

export const TextLink = ({
  as,
  className,
  href,
  icon,
  label,
  onClick,
}: TextLinkProps) => {
  return href ? (
    <Link
      href={href}
      as={as}
      className={cn(
        'flex cursor-pointer items-center hover:underline',
        className
      )}
    >
      <TextLinkWrapper>
        <LinkLabel>
          {icon && icon} {label}
        </LinkLabel>
      </TextLinkWrapper>
    </Link>
  ) : (
    <TextLinkWrapper
      onClick={onClick}
      className={cn(
        'flex cursor-pointer items-center hover:underline',
        className
      )}
    >
      <LinkLabel>
        {icon && icon} {label}
      </LinkLabel>
    </TextLinkWrapper>
  )
}
