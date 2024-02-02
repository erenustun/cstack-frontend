import { ReactNode } from 'react'
import { FlexBox } from '@shared/component'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import cn from 'classnames'
import tw from 'tailwind-styled-components'

interface CheckFieldProps {
  active: boolean
  className?: string
  label?: ReactNode | string | number
  value: number | string
}

const StyledCheckField = tw.span<{ className?: string }>`
  active:bg-primary-active
  animation-speed-movement
  cursor-pointer
  flex
  hover:bg-primary-hover
  text-default-text
  items-center
  px-3
  py-1.5
  select-none
  w-full
  ${props => props.className && props.className}
`

export const CheckField = ({
  active,
  className,
  label,
  value,
}: CheckFieldProps) => (
  <StyledCheckField className={cn(className, 'group')}>
    <FlexBox className="items-center group-hover:text-default">
      {active ? (
        <CheckCircleIcon className="-mr-1 h-5 w-5 text-primary-text group-hover:text-default" />
      ) : (
        <div className="ml-1 h-3.5 w-3.5 rounded-full border-2 border-primary bg-transparent group-hover:border-default" />
      )}
    </FlexBox>
    <p className="ml-2 mt-1 text-base leading-normal group-hover:text-default">
      {label ?? value}
    </p>
  </StyledCheckField>
)
