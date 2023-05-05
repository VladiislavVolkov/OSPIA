import { Component } from './core/Component';
import { routes } from './constants/routes';
import { authService } from './services/Auth';
import { eventEmitter } from './core/EventEmitter';
import { APP_EVENTS } from './constants/appEvents';

import './components/organisms/Header';
import './components/organisms/Footer';
import './components/pages/BlogPage';
import './components/pages/CartPage';
import './components/pages/CatalogPage';
import './components/pages/ContactsPage';
import './components/pages/ErrorPage';
import './components/pages/ProductPage';
import './components/pages/AdminPage';
import './components/pages/MainPage';
import './components/pages/SalePage';
import './components/pages/SignUpPage';
import './components/pages/SignInPage';
import './components/pages/SignOutPage';
import './components/pages/ArticlePage';
import './core/Router/Router';

import './components/molecules/Preloader';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      user: null,
    };
  }

  isLoading = (isLoading) => {
    this.setState((state) => {
      return {
        ...state,
        isLoading,
      };
    });
  };

  async authorizeUser() {
    this.isLoading(true);
    try {
      const user = await authService.authorizeUser();
      this.setUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading(false);
    }
  }

  onAuthorizeUser = ({ detail }) => {
    this.setUser(detail.user);
  };

  setUser(user) {
    this.setState((state) => {
      return {
        ...state,
        user,
      };
    });
  }

  componentDidMount() {
    this.authorizeUser();
    eventEmitter.on(APP_EVENTS.authorizeUser, this.onAuthorizeUser);
  }

  componentWillUnmount() {
    eventEmitter.off(APP_EVENTS.authorizeUser, this.onAuthorizeUser);
  }

  render() {
    return `
      <it-preloader is-loading="${this.state.isLoading}">

        <tc-header user='${JSON.stringify(this.state.user)}'></tc-header>

        <app-router>

          <app-route 
            path="${routes.main.href}" 
            title="OSPIA - Интернет-Магазин" 
            component="${routes.main.component}">
          </app-route>

          <app-route 
            path="${routes.info.href}" 
            title="OSPIA - Информация" 
            component="${routes.info.component}">
          </app-route>

          <app-route 
            path="${routes.cart.href}" 
            title="OSPIA - Корзина" 
            component="${routes.cart.component}">
          </app-route>

          <app-route 
            path="${routes.catalog.href}" 
            title="OSPIA - Каталог" 
            component="${routes.catalog.component}">
          </app-route>

          <app-route 
            path="${routes.sale.href}" 
            title="OSPIA - SALE" 
            component="${routes.sale.component}">
          </app-route>

          <app-route 
            path="${routes.blog.href}" 
            title="OSPIA - Блог. Идеи & Тренды" 
            component="${routes.blog.component}">
          </app-route>

          <app-route 
            path="${routes.product.href}" 
            title="OSPIA - Продукт" 
            component="${routes.product.component}">
          </app-route>

          <app-route 
            path="${routes.article.href}" 
            title="OSPIA - Блог" 
            component="${routes.article.component}">
          </app-route>

          <app-route 
            path="${routes.admin.href}" 
            title="OSPIA - Админ" 
            component="${routes.admin.component}">
          </app-route>

          <app-route 
            path="${routes.signup.href}" 
            title="OSPIA - Регистрация" 
            component="${routes.signup.component}">
          </app-route>

          <app-route 
            path="${routes.signin.href}" 
            title="OSPIA - Вход" 
            component="${routes.signin.component}">
          </app-route>

          <app-route 
            path="${routes.signout.href}" 
            title="OSPIA - Выход" 
            component="${routes.signout.component}">
          </app-route>

          <app-route 
            path="${routes.error.href}" 
            title="OSPIA - 404" 
            component="${routes.error.component}">
          </app-route>

          <app-outlet></app-outlet>

        </app-router>
        
        <tc-footer></tc-footer>

      </it-preloader>
    `;
  }
}

customElements.define('tc-app', App);

