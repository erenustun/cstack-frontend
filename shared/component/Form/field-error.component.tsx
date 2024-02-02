import tw from 'tailwind-styled-components'
import { themeConfig } from '@shared/config'

export const FieldError = tw.p`
  ${() => themeConfig.dangerTextColor}
  text-sm
  mt-2
`
