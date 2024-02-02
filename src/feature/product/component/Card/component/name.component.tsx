import { useIntl } from 'react-intl'
import { Product } from '@feature/product'

export const ProductName = (product: Product) => {
  const intl = useIntl()

  const {
    brand: { name: brandName },
    name: productName,
    specification: { cpuName, dataRam, dataStorage, displayResolution },
  } = product

  return (
    <div className="h-auto w-full">
      <div className="text-lines-2 text-primary-700 dark:text-cool-gray-50 font-inter h-12 space-x-1 pr-1 font-medium leading-6">
        <span className={'font-medium'}>{brandName && brandName}</span>
        <span>{`${productName} (${displayResolution && displayResolution}, ${
          cpuName && cpuName
        }, ${dataStorage[0]}${intl.formatMessage({
          id: 'filter_gb',
        })}, ${dataRam}${intl.formatMessage({
          id: 'filter_gb',
        })})`}</span>
      </div>
    </div>
  )
}
