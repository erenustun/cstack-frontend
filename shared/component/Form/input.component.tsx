import tw from 'tailwind-styled-components'
import { InputHTMLAttributes, ReactNode, useState } from 'react'
import { FormGroup } from '@component'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { themeConfig } from '@shared/config'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  defaultChecked?: boolean
  errors?: any
  error?: any
  noIcon?: boolean
  icon?: ReactNode
  label: ReactNode | string
  labelClassName?: string
  name: string
  placeholder?: string
  register: any
  required?: boolean
  secretField?: boolean
  validationSchema?: never
}

const Label = tw.label<{ error: string }>`
  text-base-active
  mb-1
  select-none
  text-sm
  tracking-wide
  leading-5
  ${p => p.error && themeConfig.dangerTextColor}
`

export const StyledInput = tw.input<InputProps>`
  text-primary-text
  font-[500]
  border border-zinc-200
  active:border-zinc-400
  focus:border-zinc-300
  shadow-none
  rounded
  bg-transparent
  w-full
  relative
  py-2
  outline-none
  ${p => p.error && themeConfig.dangerBorderActive}
  ${props => (!props.noIcon ? 'pl-8' : 'px-2')}
`

const StyledInputError = tw.p`
  ${() => themeConfig.dangerTextColor}
  text-sm
  mt-2
`

export const Input = ({
  className,
  defaultChecked = false,
  errors,
  icon,
  label,
  labelClassName,
  name,
  noIcon = false,
  placeholder = '',
  register,
  required = false,
  secretField = false,
  type,
  validationSchema,
}: InputProps) => {
  const [fieldVisible, setFieldVisibility] = useState<boolean>(false)
  const toggleFieldVisibility = () => setFieldVisibility(!fieldVisible)

  return (
    <FormGroup className={className}>
      <Label className={labelClassName} htmlFor={name} error={errors[name]}>
        {label}
        {required && (
          <span className={`ml-1 ${themeConfig.dangerTextColor}`}>*</span>
        )}
      </Label>
      <div className="relative flex">
        {!noIcon && (
          <span className={`absolute left-2 top-2.5 z-10 text-base-active`}>
            {icon}
          </span>
        )}
        <StyledInput
          defaultChecked={defaultChecked}
          id={name}
          name={name}
          type={!secretField ? type : fieldVisible ? 'text' : 'password'}
          error={errors[name]}
          {...register(name, validationSchema)}
          noIcon={noIcon}
          placeholder={placeholder}
        />
        {secretField && !fieldVisible && (
          <EyeSlashIcon
            className={`absolute right-2 top-2 h-5 w-5 cursor-pointer ${themeConfig.bodyTextColor}`}
            onClick={toggleFieldVisibility}
          />
        )}
        {secretField && fieldVisible && (
          <EyeIcon
            className={`absolute right-2 top-2 h-5 w-5 cursor-pointer ${themeConfig.bodyTextColor}`}
            onClick={toggleFieldVisibility}
          />
        )}
      </div>
      {errors && errors[name]?.message && (
        <StyledInputError>{errors[name]?.message}</StyledInputError>
      )}
    </FormGroup>
  )
}
