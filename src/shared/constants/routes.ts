export const AppRoutes = {
  AUTHORIZATION: '/auth',
  PRODUCTS: '/products',
  ANALYTICS: '/analytics'
} as const;

export const ProductsPageRoutes = {
  IDENTIFY_CLIENT: '/identify-client',
  CALCULATOR: '/calculator',
  CONFIRMATION: '/confirmation'
};

export const getRouteByTab = (tab: number): string => {
  switch (tab) {
    case 0:
      return AppRoutes.PRODUCTS;
    case 1:
      return AppRoutes.ANALYTICS;
    default:
      return AppRoutes.PRODUCTS;
  }
};

export const getTabByRoute = (route: string): number => {
  switch (route) {
    case AppRoutes.PRODUCTS:
      return 0;
    case AppRoutes.ANALYTICS:
      return 1;
    default:
      return 0;
  }
};
