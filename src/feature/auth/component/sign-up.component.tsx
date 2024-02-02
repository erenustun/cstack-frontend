import {
  AtSymbolIcon,
  LockClosedIcon,
  UserIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/20/solid'
import {
  VALIDATION_EMAIL,
  VALIDATION_FIRST_NAME,
  VALIDATION_LAST_NAME,
  VALIDATION_PASSWORD,
  VALIDATION_PASSWORD_REPEAT,
} from '@feature/auth/constant'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ApolloError } from '@apollo/client'
import { pushUri } from '@shared/util'
import * as Yup from 'yup'
import { Button, Form, FormSub, H1, Input, TextLink } from '@component'
import { routeConfig, themeConfig } from '@shared/config'
import useUserStore from '@shared/store/user/user.store'
import cn from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'

type RegisterFormInputs = {
  apiErrors?: any
  email: string
  firstName: string
  lastName: string
  password: string
  passwordRepeat: string
  phone?: string
}

export const SignUp = () => {
  const { error, setAuthError: setStoreError, signUp } = useUserStore()
  const intl = useIntl()

  const validationSchema = Yup.object().shape({
    ...VALIDATION_EMAIL,
    ...VALIDATION_FIRST_NAME,
    ...VALIDATION_LAST_NAME,
    ...VALIDATION_PASSWORD,
    ...VALIDATION_PASSWORD_REPEAT,
  })

  const formOptions = {
    name: 'auth.sign-up',
    resolver: yupResolver(validationSchema),
    shouldUnregister: true,
  }

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
    unregister,
  } = useForm<RegisterFormInputs>(formOptions)

  const onSubmit: SubmitHandler<RegisterFormInputs> = data => {
    setStoreError(undefined)
    reset()
    const { apiErrors, passwordRepeat, phone, ...rest } = data
    signUp({ ...rest, ...(phone && { phone }) })
      .then(() =>
        pushUri(
          `${routeConfig.ACCOUNT.AUTH.SIGN_IN}?message=Account was created`
        )
      )
      .catch((error: ApolloError) =>
        setError('apiErrors', { message: error.message })
      )
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-1">
        <H1>
          <FormattedMessage id="auth_form_register" />
        </H1>
        <FormSub>
          <FormattedMessage id="auth_form_register_sub" />
        </FormSub>
        {errors['apiErrors'] && (
          <span className="-mt-5 text-rose-400">
            {errors?.apiErrors?.message as string}
          </span>
        )}
      </div>
      <Input
        autoFocus
        errors={errors}
        icon={<AtSymbolIcon className="h-5 w-5" />}
        label={intl.formatMessage({ id: 'auth_form_email' })}
        name="email"
        placeholder={intl.formatMessage({ id: 'auth_form_email' })}
        register={register}
        required
        type="email"
      />
      <div className="flex flex-row space-x-2">
        <Input
          errors={errors}
          icon={<UserIcon className="h-5 w-5" />}
          label={intl.formatMessage({ id: 'auth_form_first_name' })}
          name="firstName"
          placeholder={intl.formatMessage({ id: 'auth_form_first_name' })}
          register={register}
          required
          type="text"
        />
        <Input
          errors={errors}
          icon={<UserIcon className="h-5 w-5" />}
          label={intl.formatMessage({ id: 'auth_form_last_name' })}
          name="lastName"
          placeholder={intl.formatMessage({ id: 'auth_form_last_name' })}
          register={register}
          required
          type="text"
        />
      </div>
      <Input
        autoFocus
        errors={errors}
        icon={<DevicePhoneMobileIcon className="h-5 w-5" />}
        label={intl.formatMessage({ id: 'auth_form_phone' })}
        name="phone"
        placeholder={intl.formatMessage({ id: 'auth_form_phone' })}
        register={register}
        type="text"
      />
      <div className="flex flex-row space-x-2">
        <Input
          errors={errors}
          icon={<LockClosedIcon className="h-5 w-5" />}
          label={intl.formatMessage({ id: 'auth_form_password' })}
          name="password"
          placeholder={intl.formatMessage({ id: 'auth_form_password' })}
          register={register}
          required
          secretField
          type="password"
        />
        <Input
          errors={errors}
          icon={<LockClosedIcon className="h-5 w-5" />}
          label={intl.formatMessage({ id: 'auth_form_password_repeat' })}
          name="passwordRepeat"
          placeholder={intl.formatMessage({ id: 'auth_form_password_repeat' })}
          register={register}
          required
          secretField
          type="password"
        />
      </div>
      <div className={cn(themeConfig.dangerTextColor)}>{error}</div>
      <div className="flex flex-row-reverse">
        <Button>
          <FormattedMessage id="auth_form_register_button" />
        </Button>

        <TextLink
          onClick={() => {
            unregister('email')
            unregister('firstName')
            unregister('lastName')
            unregister('password')
            unregister('phone')
            pushUri(routeConfig.ACCOUNT.AUTH.SIGN_IN)
          }}
          className="mr-auto self-end"
          label={intl.formatMessage({ id: 'auth_form_already_have_account' })}
        />
      </div>
    </Form>
  )
}
