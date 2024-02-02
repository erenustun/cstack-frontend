import Link from 'next/link'
import { routeConfig } from '@shared/config'
import Image from 'next/image'
import { FlexBox, H1, H2 } from '@component'
import { FormattedMessage } from 'react-intl'

export const HomeView = () => {
  return (
    <Link href={`${routeConfig.PRODUCT.INDEX}?brand=Apple`}>
      <H1 className="py-2 text-center lg:hidden">
        <FormattedMessage id="app_home_hero_heading" />
      </H1>
      <Image
        className="rounded-lg"
        src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/images/home/hero.png`}
        alt="hero image"
        width="1220"
        height="870"
      />
      <FlexBox
        className="absolute left-1/2 top-1/3 hidden -translate-x-1/2 -translate-y-1/2 justify-center gap-y-4 rounded-lg bg-slate-200 px-1 py-8 text-center opacity-90 lg:flex"
        direction="col"
      >
        <H1>
          <FormattedMessage id="app_home_hero_heading" />
        </H1>
        <H2>
          <FormattedMessage id="app_home_hero_subheading" />
        </H2>
      </FlexBox>
      <H2 className="mt-4 flex text-center lg:hidden">
        <FormattedMessage id="app_home_hero_subheading" />
      </H2>
    </Link>
  )
}
