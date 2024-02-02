import tw from 'tailwind-styled-components'
import { TypographyProps } from '@shared/component/Typography/typography.props'

export const H1 = tw.h1<TypographyProps>`
  text-primary-text
  ${props => (props.thin ? 'font-normal' : 'font-bold')}
  ${props => props.className && props.className}
 `
