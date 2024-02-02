import Link from 'next/link'
import {
  FlexBox,
  InstagramIcon,
  Logo,
  MetaIcon,
  WhatsappIcon,
} from '@component'

export const Footer = () => {
  const date = new Date()

  return (
    <FlexBox
      className="w-full justify-center border-t-2 border-t-zinc-300 sm:py-12 md:py-2"
      direction="col"
    >
      <FlexBox className="w-full items-center justify-center py-6 sm:py-8 md:py-8">
        <Link href="/">
          <FlexBox
            className="items-center justify-center space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0"
            direction="col"
          >
            <Logo />
          </FlexBox>
        </Link>
      </FlexBox>

      <div className="my-2 h-[1.25px] w-full bg-zinc-300"></div>

      <ul className="flex flex-wrap items-center justify-center gap-5 py-8 md:gap-10 md:py-8">
        <Link href="/">
          <li className={'uppercase text-base-active'}>Home</li>
        </Link>
        <Link href="/about">
          <li className={'uppercase text-base-active'}>About us</li>
        </Link>
        <Link href="/careers">
          <li className={'uppercase text-base-active'}>Careers</li>
        </Link>
        <Link href="/support">
          <li className={'uppercase text-base-active'}>Help</li>
        </Link>
        <Link href="/contact">
          <li className={'uppercase text-base-active'}>Contact us</li>
        </Link>
      </ul>

      <div className="my-2 h-[1.25px] w-full bg-zinc-300"></div>

      <FlexBox className="flex-wrap items-center justify-center gap-4 py-7 md:py-6">
        <MetaIcon className="fill-base-active" />
        <InstagramIcon className="fill-base-active" />
        <WhatsappIcon className="fill-base-active" />
      </FlexBox>

      <div className="my-2 h-[1.25px] w-full bg-zinc-300"></div>

      <FlexBox className="select-none flex-wrap items-center justify-center gap-3 py-8 text-sm text-base-active md:flex-nowrap md:py-6">
        <p>&copy; {date.getFullYear()} All Rights Reserved</p>
        <p>Terms & Conditions</p>
        <p>Blogs</p>
        <p>Customer Services</p>
      </FlexBox>
    </FlexBox>
  )
}
