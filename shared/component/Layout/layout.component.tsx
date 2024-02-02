import tw from 'tailwind-styled-components'

interface LayoutProps {
  className?: string
}

export const Layout = tw.section<LayoutProps>`
  w-full
  mx-auto
  flex
  flex-col
  bg-gradient-to-b
  from-slate-50
  to-slate-100
  ${props => props.className && props.className}
`
