import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import useUserStore, { useAuthCheck } from '@shared/store/user/user.store'

export interface LayoutStoreProps {
  closeAuthModules: () => void

  showAccount: boolean
  showAccountSettings: boolean
  showLanguageSettings: boolean
  closeLanguageSettings: () => void
  openAccountSettings: () => void

  openLanguageSettings: () => void
  toggleAccountModal: () => void
  toggleAccountSettings: () => void
  toggleLanguageSettings: () => void

  closeCreateShipping: () => void
  showCreateShipping: boolean
  showUpdateShipping: boolean
  toggleUpdateAddress: () => void
  toggleCreateAddress: () => void

  showCart: boolean
  openCart: () => void
  toggleFavorites: () => void
  toggleCart: () => void
  showFavorites: boolean

  showCreateBilling: boolean
  showUpdatePayment: boolean
  toggleUpdatePayment: () => void
  toggleCreateBilling: () => void
}

const initial = {
  showAccount: false,
  showAccountSettings: false,
  showLanguageSettings: false,
  showCreateShipping: false,
  showUpdateShipping: false,
  showCart: false,
  showFavorites: false,
  showCreateBilling: false,
  showUpdatePayment: false,
}

const useLayoutStore = create(
  devtools(
    persist<LayoutStoreProps>(
      set => ({
        ...initial,
        closeAuthModules: () => {
          set(state => ({
            ...state,
            showAccount: false,
            showAccountSettings: false,
            showLanguageSettings: false,
          }))
        },
        closeCreateShipping: () => {
          set(state => ({
            ...state,
            showCreateShipping: false,
          }))
        },
        closeLanguageSettings: () => {
          set(state => ({
            ...state,
            showLanguageSettings: false,
          }))
        },
        toggleAccountModal: () => {
          set(state => ({
            ...state,
            showAccount: !state.showAccount,
            showAccountSettings: !state.showAccountSettings,
          }))
        },
        toggleAccountSettings: () => {
          set(state => ({
            ...state,
            showAccountSettings: !state.showAccountSettings,
          }))
        },
        toggleLanguageSettings: () => {
          set(state => ({
            ...state,
            showLanguageSettings: !state.showLanguageSettings,
            ...(state.showLanguageSettings && { showLanguageSettings: false }),
          }))
        },
        openAccountSettings: () => {
          set(state => ({
            ...state,
            showAccount: true,
            showAccountSettings: true,
            showLanguageSettings: false,
          }))
        },
        openCart: () => {
          set(state => ({
            ...state,
            ...(!state.showCart && { showCart: true }),
          }))
        },
        openLanguageSettings: () => {
          set(state => ({
            ...state,
            showAccount: true,
            showAccountSettings: true,
            showLanguageSettings: true,
          }))
        },
        toggleCart: () => {
          set(state => ({
            ...state,
            showCart: !state.showCart,
          }))
        },
        toggleCreateAddress: () => {
          set(state => ({
            ...state,
            showCreateShipping: !state.showCreateShipping,
          }))
        },
        toggleCreateBilling: () => {
          set(state => ({
            ...state,
            showCreateBilling: !state.showCreateBilling,
          }))
        },
        toggleFavorites: () => {
          set(state => ({
            showFavorites: !state.showFavorites,
          }))
        },
        toggleUpdateAddress: () => {
          set(state => ({
            ...state,
            showUpdateShipping: !state.showUpdateShipping,
          }))
        },
        toggleUpdatePayment: () => {
          set(state => ({
            ...state,
            showUpdatePayment: !state.showUpdatePayment,
          }))
        },
      }),
      {
        name: 'layout-store',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'Layout Store' }
  )
)

export default useLayoutStore
