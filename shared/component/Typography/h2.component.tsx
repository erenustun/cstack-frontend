import tw from 'tailwind-styled-components'
import { TypographyProps } from '@shared/component/Typography/typography.props'

export const H2 = tw.h2<TypographyProps>`
  text-primary-text
  ${props => (props.thin ? 'font-normal' : 'font-semibold')}
  ${props => props.className && props.className}
`
