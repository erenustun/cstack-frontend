import tw from 'tailwind-styled-components'
import { TypographyProps } from '@shared/component/Typography/typography.props'

export const H4 = tw.h4<TypographyProps>`
  text-primary-text
  ${props => (props.thin ? 'font-normal' : 'font-medium')}
  ${props => props.className && props.className}
`
