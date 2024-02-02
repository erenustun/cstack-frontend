import { GlobeEuropeAfricaIcon as LanguageIconSolid } from '@heroicons/react/24/solid'
import { GlobeEuropeAfricaIcon as LanguageIcon } from '@heroicons/react/24/outline'
import useUserStore from '@shared/store/user/user.store'
import { FlexBox } from '@component'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useLayoutStore from '@shared/store/layout/layout.store'
import cn from 'classnames'

interface LanguageChangerProps {
  className?: string
}

export const LanguageChanger = ({ className }: LanguageChangerProps) => {
  const [iconActive, setIconActive] = useState(false)
  const toggleIcon = () => setIconActive(!iconActive)

  const { settings } = useUserStore(useShallow(state => state))
  const { openLanguageSettings, showAccountSettings, toggleLanguageSettings } =
    useLayoutStore(useShallow(state => state))

  const onClick = () => {
    toggleIcon()
    return showAccountSettings
      ? toggleLanguageSettings()
      : openLanguageSettings()
  }

  return (
    <FlexBox
      className={cn(
        'cursor-pointer select-none items-center gap-x-1',
        className
      )}
      onClick={onClick}
    >
      <span className="-mr-1 text-sm uppercase text-primary">
        {settings?.language}
      </span>
      <span>
        {iconActive ? (
          <LanguageIconSolid className="ml-1 h-[22px] w-[22px]" />
        ) : (
          <LanguageIcon className="ml-1 h-[22px] w-[22px]" />
        )}
      </span>
    </FlexBox>
  )
}
