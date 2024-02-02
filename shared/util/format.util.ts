export const getNameFromEmail = (email: string) => {
  return email?.slice(0, email.indexOf('@'))
}

export const isFloat = (number: number) => {
  return !Number.isNaN(number) && !Number.isInteger(number)
}

export const decimalCount = (float: number) => {
  const numberString = String(float)

  if (numberString.includes('.')) {
    return numberString.split('.')[1].length
  }

  return 0
}

export const toDecimal = (float: number, decimalPoints: number) =>
  float.toFixed(decimalPoints)
