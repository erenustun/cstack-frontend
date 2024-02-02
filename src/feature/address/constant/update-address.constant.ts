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

enum AddressType {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}

export const VALIDATION_COMPANY_NAME_OPTIONAL = {
  companyName: Yup.string().notRequired(),
}

export const VALIDATION_COUNTRY_OPTIONAL = {
  countryCode: Yup.mixed<Country>().oneOf(Object.values(Country)).notRequired(),
}

export const VALIDATION_FIRST_NAME_OPTIONAL = {
  firstName: Yup.string().notRequired(),
}

export const VALIDATION_LAST_NAME_OPTIONAL = {
  lastName: Yup.string().notRequired(),
}

export const VALIDATION_LINE1_OPTIONAL = {
  line1: Yup.string().notRequired(),
}

export const VALIDATION_PHONE_OPTIONAL = {
  phone: Yup.string().notRequired(),
}

export const VALIDATION_PRIMARY_OPTIONAL = {
  phone: Yup.boolean().notRequired(),
}

export const VALIDATION_STATE_OPTIONAL = {
  state: Yup.string().notRequired(),
}

export const VALIDATION_TITLE_OPTIONAL = {
  title: Yup.string().oneOf(['mr', 'ms', 'mrs', 'mx']).notRequired(),
}

export const VALIDATION_TYPE_OPTIONAL = {
  type: Yup.mixed<AddressType>()
    .oneOf(Object.values(AddressType))
    .notRequired(),
}

export const VALIDATION_ZIP_CODE_OPTIONAL = {
  zipCode: Yup.string().notRequired(),
}
