import React from 'react'
import Image from 'next/image'

export const Logo = () => (
  <Image
    src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/images/logo/innotech-logo.png`}
    alt="Picture of the author"
    width={150}
    height={150}
  />
)
