import Image from 'next/image'
import { useSpring, animated } from '@react-spring/web'

interface AccountIconProps {
  isVisible: boolean
  onClick: () => void
}

export const AccountIcon = ({ isVisible, onClick }: AccountIconProps) => {
  const { y } = useSpring({
    y: isVisible ? 360 : 0,
  })

  return (
    <animated.button
      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full"
      style={{
        transform: y.to(y => `rotateY(${y}deg)`),
      }}
      onClick={onClick}
    >
      <Image
        src="https://i.pravatar.cc/301"
        alt="user avatar"
        width="32"
        height="32"
        className="rounded-full bg-cover bg-center"
      />
    </animated.button>
  )
}
