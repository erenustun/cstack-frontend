import { ILoginInput } from '@feature/auth/dto/login.input'
import { IRegisterInput } from '@feature/auth/dto/register.input'
import { apolloClient } from '@shared/config'
import LoginUser from '@feature/auth/graphql/sign-in.graphql'
import RegisterUser from '@feature/auth/graphql/sign-up.graphql'

export const signIn = async (signInInput: ILoginInput) => {
  const { email, password } = signInInput
  return await apolloClient.mutate({
    mutation: LoginUser,
    variables: { data: { email, password } },
  })
}

export const signUp = async (signUpInput: IRegisterInput) => {
  const { email, password, phone, role } = signUpInput
  return await apolloClient.mutate({
    mutation: RegisterUser,
    variables: {
      data: { email, password, ...(phone && { phone }), ...(role && { role }) },
    },
  })
}
