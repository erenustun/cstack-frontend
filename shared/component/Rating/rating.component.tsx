import { decimalCount, toDecimal } from '@shared/util'
import Rater from 'react-rater'

interface RatingProps {
  handleClick?: any
  rating: number
  readOnly?: boolean
}

export const Rating = ({
  handleClick,
  rating = 0,
  readOnly = true,
}: RatingProps) => {
  const roundedRating = Math.round(rating)
  const starsLeft = Math.abs(roundedRating - 5)

  if (readOnly) {
    if (!rating) {
      return (
        <div className={'flex items-center'}>
          {[...Array(roundedRating)].map((star, index) => (
            <span key={index} className="dark:text-rose-600">
              &#9733;
            </span>
          ))}
          {[...Array(starsLeft)].map((star, index) => (
            <span key={index} className="dark:text-slate-600">
              &#9733;
            </span>
          ))}
          <p className={'ml-1 text-xs'}>({0})</p>
        </div>
      )
    }

    return (
      <div className={'flex items-center'}>
        {[...Array(roundedRating)].map((star, index) => (
          <span key={index} className="dark:text-rose-600">
            &#9733;
          </span>
        ))}
        {[...Array(starsLeft)].map((star, index) => (
          <span key={index} className="dark:text-slate-800">
            &#9733;
          </span>
        ))}
        {decimalCount(rating) > 0 ? (
          <p className={'ml-1 mt-1 text-xs'}>({toDecimal(rating, 1)})</p>
        ) : (
          <p className={'ml-1 mt-1 text-xs'}>({rating})</p>
        )}
      </div>
    )
  } else {
    return <Rater onRate={handleClick} rating={rating} total={5} />
  }
}
