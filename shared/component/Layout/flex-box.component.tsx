import tw from 'tailwind-styled-components'

interface FlexBoxProps {
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse'
  className?: string
}

const FlexBox = tw.section<FlexBoxProps>`
  flex
  ${props =>
    props.direction === 'row'
      ? 'flex-row'
      : props.direction === 'col'
      ? 'flex-col'
      : props.direction === 'row-reverse'
      ? 'flex-row-reverse'
      : props.direction === 'col-reverse'
      ? 'flex-col-reverse'
      : 'row'}
  ${props => props.className}
`

FlexBox.defaultProps = {
  direction: 'row',
}

export { FlexBox }
