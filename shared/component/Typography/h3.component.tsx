import tw from 'tailwind-styled-components'
import { TypographyProps } from '@shared/component/Typography/typography.props'

export const H3 = tw.h3<TypographyProps>`
  text-primary-text
  ${props => (props.thin ? 'font-normal' : 'font-semibold')}
  ${props => props.className && props.className}
`
