import cn from 'classnames'
import { themeConfig } from '@shared/config'
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid'
import { FormattedMessage } from 'react-intl'
import React from 'react'

interface ProductStockProps {
  className?: string
  stock: number
}

export const ProductStock = ({ className, stock }: ProductStockProps) => {
  return (
    <>
      {stock > 0 && stock <= 5 && (
        <div
          className={cn(
            '-mt-2 flex items-center px-1 py-0.5',
            themeConfig.warningTextColor,
            className
          )}
        >
          <InformationCircleIcon className="mr-1 h-4" />
          <FormattedMessage id={'product_view_almost_sold_out'} />
        </div>
      )}
      {stock > 0 && stock > 5 && (
        <div
          className={cn(
            '-mt-2 flex items-center px-1 py-0.5',
            themeConfig.successTextColor,
            className
          )}
        >
          <CheckCircleIcon className="mr-1 h-4" />
          <FormattedMessage id={'product_view_available'} />
        </div>
      )}
      {stock === 0 && (
        <div
          className={cn(
            '-mt-2 flex items-center px-1 py-0.5',
            themeConfig.dangerTextColor,
            className
          )}
        >
          <XCircleIcon className="mr-1 h-4" />
          <FormattedMessage id={'product_view_sold_out'} />
        </div>
      )}
    </>
  )
}
