import * as Yup from 'yup'

enum Country {
  AT = 'AT',
  CH = 'CH',
  DE = 'DE',
  ES = 'ES',
  FR = 'FR',
  IT = 'IT',
  NL = 'NL',
  PL = 'PL',
  UK = 'UK',
}

export const VALIDATION_COUNTRY = {
  countryCode: Yup.mixed<Country>()
    .oneOf(Object.values(Country), 'Please select a country.')
    .required(),
}

export const VALIDATION_FIRST_NAME = {
  firstName: Yup.string().required(),
}

export const VALIDATION_LAST_NAME = {
  lastName: Yup.string().required(),
}

export const VALIDATION_LINE1 = {
  line1: Yup.string().required(),
}

export const VALIDATION_PHONE = {
  phone: Yup.string().notRequired(),
}

export const VALIDATION_PRIMARY = {
  primary: Yup.boolean().notRequired(),
}

export const VALIDATION_STATE = {
  state: Yup.string().required(),
}

export const VALIDATION_TITLE = {
  title: Yup.string().oneOf(['mr', 'ms', 'mrs', 'mx']).required(),
}

export const VALIDATION_ZIP_CODE = {
  zipCode: Yup.string().required(),
}
