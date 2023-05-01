import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';
import { APP_EVENTS } from '../../../constants/appEvents';
import { localStorageService } from '../../../services/LocalStorageService';
import { APP_STORAGE_KEYS } from '../../../constants/appStorageKeys';
import { APP_ROUTES_MenuTop } from '../../../constants/appRoutesMenuTop';
import { appPagesMenuTop } from '../../../constants/appPagesMenuTop';

import '../../molecules/MenuTopLeft';
import '../../molecules/MenuTopRight';
import '../../molecules/MenuBottomLeft';
import '../../molecules/SearchForm';
import '../../../core/Router/Link';

import './Header.scss';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      productsCount: 0,
    };
  }

  static get observedAttributes() {
    return ['user'];
  }

  setProductsCount = (count) => {
    this.setState((state) => {
      return {
        ...state,
        productsCount: count,
      };
    });
  };

  countProducts = (data) => {
    return data
      .filter((item, index, arr) => {
        return arr.findIndex((indexItem) => indexItem.id === item.id) === index;
      })
      .map((item) => {
        return {
          ...item,
          quantity: item.quantity
            ? item.quantity
            : data.filter((filteredItem) => filteredItem.id === item.id).length,
        };
      })
      .reduce((acc, item) => acc + item.quantity, 0);
  };

  onStorage = () => {
    const count = this.countProducts(localStorageService.getItem('cardData'));
    this.setProductsCount(count);
  };

  componentDidMount() {
    eventEmitter.on(APP_EVENTS.storage, this.onStorage);
    const items = localStorageService.getItem(APP_STORAGE_KEYS.cardData) ?? [];
    const count = this.countProducts(items);
    this.setProductsCount(count);
  }

  componentWillUnmount() {
    eventEmitter.off(APP_EVENTS.storage, this.onStorage);
  }

  render() {
    const user = JSON.parse(this.props.user);

    return `
        <header>
            <div class="header bottom_solid">
                <div class="header__top">

                    <div class="header__top__left">
                        <tc-menutopleft></tc-menutopleft>
                    </div>

                    <div class="header__top__right">
                        <tc-menutopright user='${JSON.stringify(user)}'></tc-menutopright>
                    </div>

                </div>
            </div>

            <div class="header bottom_shadow" >
                <div class="header__bottom">

                    <div class="header__content left">
                        <tc-menubottomleft></tc-menubottomleft>
                    </div>

                    <div class="header__content center">
                      <router-link to="${APP_ROUTES_MenuTop[0].main}">
                        <a title="Главная">
                            <div class="header__bottom__logo">
                                <img
                                src="../assets/images/logo__new.png"
                                alt="index"
                                />
                            </div>
                        </a>
                      </router-link>
                    </div>

                    <div class="header__content right">

                      <div class="header__content__top">
                        <div class="header__content__top__item">
                          <tc-searchform></tc-searchform>
                        </div>
                      
                        ${
                          user == null
                            ? ``
                            : `<div class="header__content__top__item" >
                                <router-link to="${APP_ROUTES_MenuTop[2].admin}">
                                  <a title="${appPagesMenuTop[1][1].label}">
                                  <img
                                  src="../assets/images/ico__user.png"
                                  class="icons"
                                  /></a> 
                                </router-link>
                              </div>`
                        }

                        <div class="header__content__top__item">
                          <router-link to="${APP_ROUTES_MenuTop[2].cart}">
                            <a title="${appPagesMenuTop[1][0].label}">
                            <img
                            src="../assets/images/ico__cart.png"
                            class="icons"
                            /></a> 
                          </router-link>
                          <div class="header__content__top__item__productcount ${
                            this.state.productsCount ? '' : 'disable'
                          }">
                            ${this.state.productsCount ? this.state.productsCount : ''} 
                          </div>  
                        </div>

                      </div>

                    </div>

                </div>
            </div>

        </header>

    `;
  }
}

customElements.define('tc-header', Header);
