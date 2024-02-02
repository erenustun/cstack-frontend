import { SignIn } from '@feature/auth/component/sign-in.component'
import Image from 'next/image'
import { Box } from '@component'
import { themeConfig } from '@shared/config'

export const SignInView = () => (
  <Box className="flex flex-grow justify-evenly lg:-space-x-6">
    <div className="-mt-4 hidden h-full scale-95 bg-cover bg-center lg:block">
      <Image
        src="/images/1.jpg"
        width="500"
        height="1000"
        alt="login image"
        className={themeConfig.radiusDefault}
      />
    </div>
    <SignIn />
  </Box>
)
