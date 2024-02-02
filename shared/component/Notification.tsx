import tw from 'tailwind-styled-components'
import { PropsWithChildren, useState } from 'react'
import { XMarkIcon as Icon } from '@heroicons/react/20/solid'

interface NotificationProps {
  className?: string
}

const TWNotification = tw.div`
  bg-green-600
  py-2
  pl-2
  pr-3
  rounded-md
  shadow
  border
  border-green-500
`

export const Notification = ({
  children,
  className,
}: PropsWithChildren<NotificationProps>) => {
  const [visible, setVisibility] = useState<boolean>(true)
  const hideNotification = () => setVisibility(false)

  return visible ? (
    <div className="relative">
      <TWNotification className={className}>{children}</TWNotification>
      <Icon
        className="absolute right-1 top-3 h-5 w-5 cursor-pointer text-green-50 hover:text-green-200 active:text-green-700"
        onClick={hideNotification}
      />
    </div>
  ) : null
}
