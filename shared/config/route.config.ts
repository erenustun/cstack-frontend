import {
  PAGINATION_TAKE_DEFAULT,
  PAGINATION_TAKE_PARAM_NAME,
} from '@shared/constant'

export const routeConfig = {
  HOME: '/',
  ACCOUNT: {
    INDEX: '/account',
    EDIT: '/account/edit',
    AUTH: {
      SIGN_IN: '/auth/sign-in',
      SIGN_UP: '/auth/sign-up',
    },
    ADDRESS: {
      INDEX: '/account/address',
      NEW: '/account/address/new',
      EDIT: '/account/address/edit',
      COLLECTION_ACTIVE_LINK: [
        '/account/address',
        '/account/address/new',
        '/account/address/edit',
      ],
      COLLECTION_AUTH: [
        '/account/address',
        '/account/address/new',
        '/account/address/edit',
      ],
    },
    CART: {
      INDEX: '/cart/',
      CHECKOUT: '/cart/checkout',
    },
    ORDER: {
      INDEX: '/account/orders',
      VIEW: '/account/order/',
      COLLECTION_ACTIVE_LINK: ['/account/orders'],
      COLLECTION_AUTH: ['/account/orders', '/account/order/'],
    },
    UNAUTHORIZED: '/account/unauthorized',
    COLLECTION: ['/account', '/account/edit'],
    COLLECTION_AUTH: ['/account', '/account/edit'],
  },
  PRODUCT: {
    INDEX: '/products',
    INDEX_DEFAULT_PARAMS: `?${PAGINATION_TAKE_PARAM_NAME}=${PAGINATION_TAKE_DEFAULT}`,
    CATEGORY: '/products/category',
    BRAND: '/products/brand',
  },
}

export const middlewareRouteConfig = {
  protectedRoutes: [
    routeConfig.ACCOUNT.INDEX,
    routeConfig.ACCOUNT.INDEX,
    routeConfig.ACCOUNT.ADDRESS.INDEX,
    routeConfig.ACCOUNT.ADDRESS.EDIT,
    routeConfig.ACCOUNT.ADDRESS.NEW,
  ],
  authRoutes: [
    routeConfig.ACCOUNT.AUTH.SIGN_IN,
    routeConfig.ACCOUNT.AUTH.SIGN_UP,
  ],
  publicRoutes: [
    routeConfig.PRODUCT.INDEX,
    routeConfig.PRODUCT.BRAND,
    routeConfig.PRODUCT.CATEGORY,
    routeConfig.ACCOUNT.UNAUTHORIZED,
  ],
}
