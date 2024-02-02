import {
  AnimateIn,
  Container,
  FlexBox,
  InstagramIcon,
  MetaIcon,
  MobileNavigation,
  WhatsappIcon,
} from '@component'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import Hamburger from 'hamburger-react'
import Link from '@shared/component/Link/link.component'

export const GlobalTopBar = () => {
  const [menuOpen, setMenu] = useState(false)
  const toggleMenu = () => setMenu(!menuOpen)

  return (
    <div className="select-none bg-primary py-1.5">
      <Container>
        <FlexBox className="mt-1 justify-between text-default">
          <div className="ml-0 flex w-1/3 flex-wrap items-center justify-start space-x-2 sm:mt-0 sm:gap-x-3">
            <MetaIcon alternativeIcon={true} className="h-4 w-4" />
            <InstagramIcon className="h-5 w-5" />
            <WhatsappIcon className="h-5 w-5" />
          </div>

          <FlexBox className="hidden w-1/3 flex-col items-center gap-y-1 lg:flex lg:flex-row lg:justify-evenly">
            <FlexBox className="items-center gap-x-1">
              <PhoneIcon className="h-4 w-4" />
              <Link
                href={`tel:${process.env.NEXT_PUBLIC_SUPPORT_TEL}`}
                className="text-sm"
              >
                {process.env.NEXT_PUBLIC_SUPPORT_TEL}
              </Link>
            </FlexBox>
            <FlexBox className="items-center gap-x-1">
              <EnvelopeIcon className="h-4 w-4" />
              <Link
                href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
                className="text-sm"
              >
                {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
              </Link>
            </FlexBox>
          </FlexBox>

          <FlexBox className="w-1/3 justify-end">
            <FlexBox className="flex md:hidden">
              <Hamburger
                toggled={menuOpen}
                toggle={toggleMenu}
                direction="right"
                duration={0.5}
                size={18}
              />
            </FlexBox>
          </FlexBox>
        </FlexBox>
        <AnimateIn direction="to-bottom" show={menuOpen}>
          <MobileNavigation menuOpen={menuOpen} setMenu={setMenu} />
        </AnimateIn>
      </Container>
    </div>
  )
}
