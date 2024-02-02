import Link from 'next/link'
import { ReactNode } from 'react'
import tw from 'tailwind-styled-components'
import { Url } from 'url'
import { themeConfig } from '@shared/config'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { FlexBox } from '@shared/component/Layout/flex-box.component'

interface NavLinkProps {
  as?: string
  className?: string
  href: Url | string
  icon?: ReactNode | string | null
  label: string | ReactNode
}

const LinkWrapper = tw.span`
  active:text-primary-active
  animation-speed-movement
  flex
  font-medium
  hover:text-primary-hover
  items-center
  select-none
  space-x-1
  text-primary
`

export const NavLink = ({ as, className, href, icon, label }: NavLinkProps) => {
  const router = useRouter()
  return (
    <Link
      href={href}
      as={as}
      className={cn('flex cursor-pointer select-none items-center')}
    >
      <LinkWrapper
        className={cn(
          router.pathname === (href as string).split('?')[0] &&
            cn('font-semibold'),
          className,
          'group'
        )}
      >
        {icon && <div className="mr-0.5">{icon}</div>}
        <div>{label}</div>
      </LinkWrapper>
    </Link>
  )
}
