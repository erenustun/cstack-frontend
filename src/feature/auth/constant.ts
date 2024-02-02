import * as Yup from 'yup'

export const VALIDATION_EMAIL = {
  email: Yup.string()
    .email('E-Mail must be valid.')
    .required('E-mail is required'),
}

export const VALIDATION_FIRST_NAME = {
  firstName: Yup.string().required('First name is required'),
}

export const VALIDATION_LAST_NAME = {
  lastName: Yup.string().required('Last name is required'),
}

export const VALIDATION_PASSWORD = {
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password requires a minimum of 6 characters')
    .max(96, "Password can't contain more than 96 characters"),
}

export const VALIDATION_PASSWORD_REPEAT = {
  passwordRepeat: Yup.string()
    .required('Repeated password is required')
    .min(6, 'Password requires a minimum of 6 characters')
    .max(96, "Password can't contain more than 96 characters")
    .oneOf([Yup.ref('password')], 'Passwords must match'),
}
