import Image from 'next/image'
import { Box, Container } from '@component'
import { SignUp } from '@feature/auth/component/sign-up.component'
import { themeConfig } from '@shared/config'

export const SignUpView = () => (
  <Container
    className="min-h-[55rem] bg-[url(/images/account-bg.jpg)] bg-cover"
    fluid
  >
    <Box className="flex justify-evenly lg:-space-x-6">
      <div className="-mt-4 hidden h-full scale-95 bg-cover bg-center lg:block">
        <Image
          src="/images/1.jpg"
          width="500"
          height="1000"
          alt="login image"
          className={themeConfig.radiusDefault}
        />
      </div>
      <SignUp />
    </Box>
  </Container>
)
