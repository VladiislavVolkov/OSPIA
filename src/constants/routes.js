import { APP_ROUTES_MenuTop } from './appRoutesMenuTop';

export const routes = {
  main: {
    href: APP_ROUTES_MenuTop[0].main,
    component: 'main-page',
  },
  info: {
    href: APP_ROUTES_MenuTop[1].info,
    component: 'contacts-page',
    name: 'Информация',
    description: `адрес пункта выдачи заказов 'OSPIA'`,
    classname: 'infobackground',
    image: '../assets/images/ico__info__big.png',
  },
  cart: {
    href: APP_ROUTES_MenuTop[2].cart,
    component: 'cart-page',
    name: 'Корзина',
    description: 'проверяйте и оформляйте заказ',
    classname: 'cartbackground',
    image: '../assets/images/ico__cart__big.png',
  },
  admin: {
    href: APP_ROUTES_MenuTop[2].admin,
    component: 'admin-page',
    name: 'admin-page',
    description: 'добавление категорий продуктов, товаров и новостей',
    classname: 'adminbackground',
    image: '../assets/images/ico__admin__big.png',
  },
  signup: {
    href: APP_ROUTES_MenuTop[2].signup,
    component: 'signup-page',
  },
  signin: {
    href: APP_ROUTES_MenuTop[2].signin,
    component: 'signin-page',
  },
  signout: {
    href: APP_ROUTES_MenuTop[2].signout,
    component: 'signout-page',
  },
  catalog: {
    href: APP_ROUTES_MenuTop[3].catalog,
    component: 'catalog-page',
  },
  blog: {
    href: APP_ROUTES_MenuTop[3].blog,
    component: 'blog-page',
    name: 'блог. идеи & тренды',
    description: 'полезные новости и статьи',
    classname: 'blogbackground',
    image: '../assets/images/ico__blog__big.png',
  },
  sale: {
    href: APP_ROUTES_MenuTop[3].sale,
    component: 'sale-page',
    name: 'sale',
    description: 'много товаров с приятной ценой',
    classname: 'salebackground',
    image: '../assets/images/ico__sale__big.png',
  },
  product: {
    href: APP_ROUTES_MenuTop[3].product,
    component: 'product-page',
  },
  article: {
    href: APP_ROUTES_MenuTop[3].article,
    component: 'article-page',
  },
  error: {
    href: '*',
    component: 'error-page',
  },
};
