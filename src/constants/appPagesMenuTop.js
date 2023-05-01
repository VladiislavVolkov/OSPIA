import { APP_ROUTES_MenuTop } from './appRoutesMenuTop.js';

export const appPagesMenuTop = [
  [
    {
      label: 'Информация',
      href: APP_ROUTES_MenuTop[1].info,
    },
  ],
  [
    {
      label: 'Аdmin-Page',
      href: APP_ROUTES_MenuTop[2].admin,
    },
    {
      label: 'Регистрация',
      href: APP_ROUTES_MenuTop[2].signup,
    },
    {
      label: 'Войти',
      href: APP_ROUTES_MenuTop[2].signin,
    },
    {
      label: 'Выход',
      href: APP_ROUTES_MenuTop[2].signout,
    },
  ],
  [
    {
      label: 'Товары',
      href: APP_ROUTES_MenuTop[3].catalog,
      component: 'product-page',
    },
    {
      label: 'Идеи & Тренды',
      href: APP_ROUTES_MenuTop[3].blog,
    },
    {
      label: 'Sale',
      href: APP_ROUTES_MenuTop[3].sale,
      component: 'sale-page',
    },
  ],
];
