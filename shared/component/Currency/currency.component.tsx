import { CURRENCIES, CURRENCY_CODE } from '@/shared/component/Currency/constant'

import { decimalCount, isFloat } from '@shared/util'
import cx from 'classnames'

interface CurrencyProps {
  amount: number
  cart?: boolean
  className?: string
}

export const Currency = ({
  amount,
  cart = false,
  className,
}: CurrencyProps) => (
  <div className={cx(className, cart && 'text-gray-300 font-bold')}>
    {!isFloat(amount)
      ? CURRENCY_CODE === CURRENCIES.NONE
        ? `${CURRENCY_CODE} ${amount}.-`
        : `${CURRENCY_CODE} ${amount}.00`
      : decimalCount(amount) === 1
      ? `${CURRENCY_CODE} ${amount}0`
      : `${CURRENCY_CODE} ${Math.round(amount)}.-`}{' '}
    {/*round properly 389.312 --> 389.35*/}
  </div>
)
