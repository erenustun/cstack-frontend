import { User } from '@feature/account'

export interface IRegisterInput extends User {
  password: string
}
