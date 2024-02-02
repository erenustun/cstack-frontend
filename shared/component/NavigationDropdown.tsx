import { ChevronDownIcon } from '@heroicons/react/24/solid'
import tw from 'tailwind-styled-components'
import { Url } from 'url'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { themeConfig } from '@shared/config'

interface DropdownListProps {
  href: Url | string
  label: string
  image?: string
  query?: any
}

interface DropdownProps {
  label: string
  list?: DropdownListProps[]
  icon?: ReactNode | string | null
}

const DropdownButton = tw.span`
  flex
  items-center
  ${() => themeConfig.bodyTextColor}
  ${() => themeConfig.primaryTextHover}
  ${() => themeConfig.infoTextActive}
  ${() => themeConfig.animationTransition}
  ${() => themeConfig.animationDuration}
  ${() => themeConfig.animationEaseIn}
`

const Label = tw.p`
  font-semibold
  select-none
  flex
  items-center
`

const Item = tw.div`
  flex
  flex-col
  items-center
  justify-center
  w-full
  h-full
  hover:bg-slate-800
  cursor-pointer
  relative
`

const List = tw.div`
  max-w-6xl
  mx-auto
  flex
  items-center
  justify-center
  h-full
`

const ItemLabel = tw.div`
  mt-2
  text-lg
  capitalize
  absolute
  bottom-0
  mb-4
  font-light
  tracking-wide
`

export const NavigationDropdown = ({
  label,
  list = [],
  icon,
}: DropdownProps) => (
  <div className="dropdown cursor-pointer py-10">
    <DropdownButton>
      <Label>
        {icon && icon}
        {label}
      </Label>
      <ChevronDownIcon className="ml-1 h-5" />
    </DropdownButton>
    <div className="dropdown-content">
      {/*bg-zinc-950*/}
      <List>
        {list?.map((item, i) => (
          <Link
            href={{
              pathname: encodeURI(`/${item.href as string}`),
              ...(item.query && { query: item.query }),
            }}
            className="h-full w-1/4"
            key={i}
          >
            <Item>
              <Image
                src={`/images/${item.image}.png`}
                alt={`${item.label} image`}
                width="150"
                height="0"
              />
              <ItemLabel>{item.label}</ItemLabel>
            </Item>
          </Link>
        ))}
      </List>
    </div>
  </div>
)
