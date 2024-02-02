import React from 'react'
import { BRAND_SLOGAN } from '@shared/component/Branding/constant'

export const Slogan = () => {
  return (
    <div
      className={
        'font-inter text-center text-base dark:text-white lg:text-left'
      }
    >
      <span className={'flex gap-x-2 font-light'}>
        <span className={'hidden lg:block'}> | </span>
        {BRAND_SLOGAN}
      </span>
    </div>
  )
}
