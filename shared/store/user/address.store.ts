import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { GENERAL_ERROR_MESSAGE } from '@shared/util'
import { Address } from '@feature/address'

interface IAddressStore {
  error: string | null
  mainShipping: Address | null
  setMainShipping: (address: Address) => void
}

const initial = {
  error: null,
  mainShipping: null,
}

const useAddressStore = create(
  devtools(
    persist<IAddressStore>(
      set => ({
        ...initial,
        setMainShipping: (address: Address) => {
          try {
            set(state => ({
              ...state,
              mainShipping: address,
            }))
          } catch (e) {
            const error = GENERAL_ERROR_MESSAGE
            set(state => ({ ...state, error: error }))
          }
        },
      }),
      {
        name: 'address-storage',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: 'Address Store' }
  )
)

export default useAddressStore
