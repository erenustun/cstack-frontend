import tw from 'tailwind-styled-components'
import { FormHTMLAttributes } from 'react'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: string
  loading?: boolean
}

const Form = tw.form<FormProps>`
  flex
  flex-col
  self-start
  font-light
  space-y-10
  w-full
  px-2
  relative
  ${props => props.loading && 'blur-sm'}
  ${props => props.className && props.className}
 `

Form.defaultProps = {
  loading: false,
}

export { Form }
