import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { User } from '@feature/account'
import { CreditCard } from '@feature/order'
import { ILoginInput, IRegisterInput } from '@feature/auth'
import { apolloClient, routeConfig } from '@shared/config'
import LoginUser from '@feature/auth/graphql/sign-in.graphql'
import { setCookie } from 'react-use-cookie'
import { GENERAL_ERROR_MESSAGE, pushUri } from '@shared/util'
import RegisterUser from '@feature/auth/graphql/sign-up.graphql'

export interface UserStoreProps {
  user: User | null
  settings: ISettings
  setLanguage: (language: string) => void
  setPrimaryBilling: (card: CreditCard) => void

  error?: any
  token?: IToken | null
  setAuthError: (error: string | number | undefined) => void
  signIn: (input: ILoginInput) => Promise<void>
  signOut: () => Promise<void>
  signUp: (input: IRegisterInput) => Promise<void>
  reset: () => void
}

interface ISettings {
  language: string
  primaryBilling: CreditCard | null
}

interface IToken {
  expires?: string
  jwt?: string
}

const initial = {
  user: null,
  settings: {
    language: 'en',
    primaryBilling: null,
  },

  token: null,
}

const useUserStore = create(
  devtools(
    persist<UserStoreProps>(
      set => ({
        ...initial,
        setLanguage: language => {
          set((state: UserStoreProps) => ({
            ...state,
            settings: {
              ...state.settings,
              language: language,
            },
          }))
        },
        setPrimaryBilling: creditCard => {
          set((state: UserStoreProps) => ({
            ...state,
            settings: {
              ...state.settings,
              primaryBilling: creditCard,
            },
          }))
        },

        signIn: async (loginInput: ILoginInput) => {
          try {
            const { email, password } = loginInput

            set(state => ({ ...state, error: null }))

            const { data } = await apolloClient.mutate({
              mutation: LoginUser,
              variables: { data: { email, password } },
            })

            console.log(data)

            set(state => ({
              ...state,
              token: {
                jwt: data.signIn.token,
              },
              user: data.signIn.user,
            }))
            setCookie('token', data.signIn.token)
          } catch (e: any) {
            const error = GENERAL_ERROR_MESSAGE
            set(state => ({ ...state, error: error }))
          }
        },
        signUp: async (registerInput: IRegisterInput) => {
          try {
            const { email, password, phone, role } = registerInput

            set(state => ({ ...state, error: null }))

            await apolloClient.mutate({
              mutation: RegisterUser,
              variables: {
                data: {
                  email,
                  password,
                  ...(phone && { phone }),
                  ...(role && { role }),
                },
              },
            })
          } catch (e: any) {
            const error = GENERAL_ERROR_MESSAGE
            set(state => ({ ...state, error: error }))
          }
        },
        signOut: async () => {
          try {
            set(() => initial)
            console.log('in log out store function')
            await apolloClient.resetStore()
          } catch (e: any) {
            set(state => ({
              ...state,
              error: e.graphQLErrors[0].message,
            }))
          }
        },
        setAuthError: error => set(state => ({ ...state, error: error })),
        reset: () => {
          set(state => ({ ...state, ...initial }))
          if (
            [
              ...routeConfig.ACCOUNT.COLLECTION_AUTH,
              ...routeConfig.ACCOUNT.ADDRESS.COLLECTION_AUTH,
              ...routeConfig.ACCOUNT.ORDER.COLLECTION_AUTH,
            ].includes(window.location.pathname)
          ) {
            pushUri(routeConfig.ACCOUNT.AUTH.SIGN_IN, undefined, {
              method: 'replace',
            })
          }
        },
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'User' }
  )
)

export const useFirstName = () =>
  useUserStore((state): string | undefined => {
    return state.user?.firstName
  })

export const useAuthCheck = (): boolean => {
  useUserStore((state): boolean => {
    return !!state.token?.jwt
  })
  return false
}

export default useUserStore
