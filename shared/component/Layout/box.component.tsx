import tw from 'tailwind-styled-components'
import { themeConfig } from '@shared/config'

export const Box = tw.section`
  w-full
  mx-auto
  border-zinc-200
  ${() => themeConfig.mainContainerMaxWidth}
  ${() => themeConfig.boxBlur}
  ${() => themeConfig.boxBackgroundColor}
  ${() => themeConfig.boxOpacity}
  ${() => themeConfig.boxPadding}
  ${() => themeConfig.boxShadow}
  ${() => themeConfig.radiusMedium}
`
