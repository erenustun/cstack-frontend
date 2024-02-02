export const themeConfig = {
  /* Animation */
  animationTransition: 'transition',
  animationDuration: 'duration-200',
  animationEaseIn: 'ease-in',

  animationStartToTop: '-translate-y-[4rem]',
  animationEndToTop: 'translate-y-0',
  animationStartToRight: 'translate-x-0',
  animationEndToRight: '-translate-x-[10rem]',
  animationStartToBottom: 'translate-y-0',
  animationEndToBottom: '-translate-y-[1rem]',
  animationStartToLeft: '-translate-x-[1rem]',
  animationEndToLeft: 'translate-x-[10rem]',

  loadingAnimation:
    'animate-[pulse_1500ms_ease-in-out_infinite] cursor-not-allowed',

  /* Background + Border styling */
  mainBackgroundColor: 'bg-background',
  //mainBackgroundColor: 'bg-foreground dark:bg-[#00050D]',

  primaryBackgroundColor: 'bg-[#2522C7]',
  primaryBackgroundHover: `hover:bg-sky-600 hover:border-sky-600`,
  primaryBackgroundActive: `active:bg-blue-700`,
  primaryBackgroundColorAlt: 'bg-blue-700',
  primaryBackgroundHoverAlt: `hover:bg-blue-800`,
  primaryBackgroundActiveAlt: `active:bg-blue-900`,
  primaryBackgroundColorDark: 'bg-transparent border border-slate-600',
  primaryBackgroundHoverDark: `hover:border-slate-700`,
  primaryBackgroundActiveDark: `active:border-blue-700`,

  primaryBorderColor: 'border border-blue-600',
  primaryBorderBottomColor: 'border-b border-b-blue-800',
  primaryBorderActive: `focus:border-blue-500 active:border-blue-500 hover:border-blue-300`,

  successBackgroundColor: 'bg-green-500 border border-green-400',
  successBackgroundHover: `hover:bg-green-600 hover:border-green-500`,
  successBackgroundActive: `active:bg-green-700`,

  successBorderColor: 'border border-green-500',
  successBorderActive: `focus:border-green-700 active:border-green-700 hover:border-green-300`,

  infoBackgroundColor: 'bg-sky-500 border border-sky-400',
  infoBackgroundHover: `hover:bg-sky-600 hover:border-sky-500`,
  infoBackgroundActive: `active:bg-sky-700`,

  infoBorderColor: 'border border-sky-500',
  infoBorderActive: `focus:border-sky-700 active:border-sky-700 hover:border-sky-300`,

  warningBackgroundColor: 'bg-orange-500 border border-orange-400',
  warningBackgroundHover: `hover:bg-orange-600 hover:border-orange-500`,
  warningBackgroundActive: `active:bg-orange-700`,

  warningBorderColor: 'border border-orange-500',
  warningBorderActive: `focus:border-orange-700 active:border-orange-700 hover:border-orange-300`,

  dangerBackgroundColor: 'bg-red-600 border border-red-500',
  dangerBackgroundHover: `hover:bg-red-700 hover:border-red-600`,
  dangerBackgroundActive: `active:bg-red-800`,

  dangerBorderColor: 'border border-red-500',
  dangerBorderActive: `focus:border-red-700 active:border-red-700 hover:border-red-300`,

  /* Badge */
  badgeBackgroundColor: 'bg-red-500',

  /* Box */
  boxBackgroundColor: 'bg-zinc-300 border',
  boxBlur: 'backdrop-filter backdrop-blur-lg',
  boxShadow: 'shadow',
  boxOpacity: 'bg-opacity-5',
  boxPadding: 'py-6 px-4',

  /* Button */
  buttonPadding: 'px-3.5 py-1',
  buttonText: 'font-medium tracking-wide',

  /* Container */
  mainContainerMaxWidth: 'max-w-11xl',

  /* Footer */
  footerDivider: 'bg-slate-200',
  footerDividerBorder: 'border-slate-100',

  /* Form */
  formLabel: 'mb-1 select-none text-sm tracking-wide leading-5',
  inputFieldBorder: 'border border-gray-600',

  /* Radius */
  radiusSmall: 'rounded-sm',
  radiusDefault: 'rounded',
  radiusMedium: 'rounded-md',
  radiusLarge: 'rounded-lg',

  /* Sidebar */
  sidebarWidth: 'w-full max-w-[22rem]',
  sidebarWidthLeft: 'w-full max-w-[13rem]',
  sidebarWidthRight: 'w-full max-w-[22rem]',

  /* Typography styling */
  navLinkTextHover: 'hover:text-sky-300',
  navLinkTextActive: 'active:text-sky-500',
  navLinkCurrentPage: 'text-[#47ABFF]',
  navLinkBgHover: 'group-hover:bg-sky-300',
  navLinkBgActive: 'group-active:bg-sky-500',
  navLinkCurrentBg: 'bg-[#47ABFF]',

  bodyTextColor: 'text-slate-700 dark:text-slate-50',
  primaryTextColor: 'text-blue-400 dark:text-blue-500',
  successTextColor: 'text-green-400 dark:text-green-500',
  infoTextColor: 'text-sky-400 dark:text-sky-500',
  warningTextColor: 'text-orange-400 dark:text-orange-500',
  dangerTextColor: 'text-pink-400 dark:text-pink-500',

  primaryTextHover: 'hover:text-blue-600 dark:hover:text-blue-300',
  successTextHover: 'hover:text-green-600 dark:hover:text-green-300',
  infoTextHover: 'hover:text-sky-600 dark:hover:text-blue-300',
  warningTextHover: 'hover:text-orange-600 dark:hover:text-orange-300',
  dangerTextHover: 'hover:text-red-600 dark:hover:text-red-300',

  primaryTextActive: 'active:text-blue-600 dark:active:text-blue-700',
  successTextActive: 'active:text-green-600 dark:active:text-green-700',
  infoTextActive: 'active:text-sky-600 dark:active:text-sky-500',
  warningTextActive: 'active:text-orange-600 dark:active:text-orange-700',
  dangerTextActive: 'active:text-red-600 dark:active:text-red-700',

  primaryIconColor: 'text-slate-200 hover:text-blue-500 active:text-blue-700',
  dangerIconColor: 'text-slate-200 hover:text-red-500 active:text-red-700',
}
