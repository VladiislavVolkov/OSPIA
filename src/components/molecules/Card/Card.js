import { APP_EVENTS } from '../../../constants/appEvents';
import { APP_STORAGE_KEYS } from '../../../constants/appStorageKeys';
import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';
import { localStorageService } from '../../../services/LocalStorageService';

import './Card.scss';

class Card extends Component {
  constructor() {
    super();
    this.state = {
      idProductInCart: false,
    };
  }

  static get observedAttributes() {
    return [
      'images',
      'title',
      'description',
      'price',
      'id',
      'sale',
      'oldprice',
      'category',
      'page',
    ];
  }

  clickCard = (evt) => {
    if (evt.target.closest('.button__buy')) {
      const allItems = localStorageService.getItem(APP_STORAGE_KEYS.cardData) ?? [];
      localStorageService.setItem(APP_STORAGE_KEYS.cardData, [...allItems, this.props]);
      this.setState((state) => {
        return {
          ...state,
          idProductInCart: true,
        };
      });
      this.getIdCart();
    }
    if (evt.target.closest('.card__title')) {
      eventEmitter.emit(APP_EVENTS.changeRoute, { target: `/product/${this.props.id}` });
      window.scrollTo(0, { behavior: 'smooth' });
    }
  };

  getIdCart() {
    const allItems = localStorageService.getItem(APP_STORAGE_KEYS.cardData) ?? [];
    const product = allItems.find((item) => item.id === this.props.id)
      ? allItems.find((item) => item.id === this.props.id)
      : false;
    if (product) {
      this.setState((state) => {
        return {
          ...state,
          idProductInCart: true,
          idProductQuantity: product.quantity ? product.quantity : 1,
        };
      });
    }
  }

  componentDidMount() {
    this.getIdCart();
    this.addEventListener('click', this.clickCard);
  }

  componentWillUnmount() {
    this.getIdCart();
    this.removeEventListener('click', this.clickCard);
  }

  render() {
    const { images, title, description, price, id, sale, oldprice, category } = this.props;
    const isSale = sale === 'yes';
    const isOldprice = oldprice !== 'undefined';
    const isCategory = category;
    const mainPage = this.props.page === 'main';
    const salePage = this.props.page === 'sale';

    return `
        <div class="card" href="#">
            <div class="card__img">
              <img src="${images}" alt="${title}" title="${title}">
            </div>
            <div class="card__info">
              ${mainPage ? `<div class="card__info__category">${isCategory}</div>` : ''}
              ${salePage ? `<div class="card__info__category">${isCategory}</div>` : ''}            
              ${isSale ? (salePage ? `` : `<div class="card__info__sale">%</div>`) : ''}
            </div>
            <div class="card__title"><a href='#'>${title}</a></div>
            
            ${mainPage ? `` : `<div class="card__description">${description}</div>`}

            ${
              mainPage
                ? ``
                : `<div class="card__buy">
                      <div class="card__buy__left">
                        <div class="card__price ${isOldprice ? 'sale' : ''}">${price} byn</div>
                        ${isOldprice ? `<div class="card__oldprice">${oldprice}  byn</div>` : ''}
                      </div>
                      <button class="${
                        this.state.idProductInCart ? `button__incart` : `button__buy`
                      }" type="button" data-id='${id}'>${
                    this.state.idProductInCart
                      ? `🧺 ${this.state.idProductQuantity} шт.`
                      : `в корзину`
                  }</button>
                  </div>`
            }
            
        </div>
        `;
  }
}

customElements.define('tc-card', Card);
