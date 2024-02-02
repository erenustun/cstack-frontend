import { getCookie } from 'react-use-cookie'

export const getBearerToken = () => {
  const jwt = getCookie('token')
  return jwt && jwt
}

export const GENERAL_ERROR_MESSAGE = 'Unexpected network error.'
