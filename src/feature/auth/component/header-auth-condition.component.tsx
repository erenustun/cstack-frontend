import Link from 'next/link'
import { routeConfig } from '@shared/config'
import useUserStore, { useAuthCheck } from '@shared/store/user/user.store'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useLayoutStore from '@shared/store/layout/layout.store'
import { useShallow } from 'zustand/react/shallow'
import cn from 'classnames'
import { UserIcon } from '@heroicons/react/20/solid'

export const HeaderAuthConditionComponent = () => {
  const { user } = useUserStore(state => state)
  const isAuth = useAuthCheck()

  const { pathname } = useRouter()
  const { toggleAccountModal, showAccount } = useLayoutStore(
    useShallow(state => state)
  )

  return !isAuth ? (
    <Link href={routeConfig.ACCOUNT.AUTH.SIGN_IN}>
      <div className="rounded-full bg-default-text p-0.5">
        <UserIcon className="h-[22px] w-[22px] text-white" />
      </div>
    </Link>
  ) : (
    <span
      className={`flex cursor-pointer select-none items-center justify-center rounded-full ${
        pathname.includes(routeConfig.ACCOUNT.INDEX) ? 'h-9 w-9' : 'h-8 w-8'
      }`}
      onClick={toggleAccountModal}
    >
      <Image
        src="https://i.pravatar.cc/301"
        alt="user avatar"
        width="64"
        height="64"
        className={cn(
          'rounded-full bg-cover bg-center',
          showAccount && 'border-4 border-blue-400'
        )}
      />
      <div>{user?.firstName}</div>
    </span>
  )
}
