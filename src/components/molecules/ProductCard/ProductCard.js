import { APP_STORAGE_KEYS } from '../../../constants/appStorageKeys';
import { Component } from '../../../core/Component';
import { localStorageService } from '../../../services/LocalStorageService';

import { APP_ROUTES_MenuTop } from '../../../constants/appRoutesMenuTop';

class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      idProductInCart: false,
    };
  }

  static get observedAttributes() {
    return ['images', 'title', 'description', 'price', 'id', 'sale', 'oldprice', 'category'];
  }

  addToCart = (evt) => {
    if (evt.target.closest('.productitem__cart__buy')) {
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

  onStorage = (evt) => {
    const count = this.countProducts(evt.detail.data);
    this.setProductsCount(count);
  };

  componentDidMount() {
    this.getIdCart();
    this.addEventListener('click', this.addToCart);
  }

  componentWillUnmount() {
    this.removeEventListener('click', this.addToCart);
  }

  render() {
    const { images, title, description, price, id, sale, oldprice, category } = this.props;
    const today = new Date();
    const dateone = new Date();
    const datetwo = new Date();
    dateone.setDate(today.getDate() + 1);
    datetwo.setDate(today.getDate() + 3);
    const itemdate = dateone.toLocaleString().slice(0, 10);
    const courierdate = datetwo.toLocaleString().slice(0, 10);
    return `

      <section class="sectionproduct">

        <div class="sectionproduct__left">

          <div class="productitem">
            <div class="productitem__img">
              <img class="image-fit" src='${images}'/>
            </div>
            <div class="productitem__description">${description}</div>
          </div>

        </div>

        <div class="sectionproduct__right">

          <div class="productitem__title">${title}</div>
          <div class="productitem__category">Категория: ${category}</div>
          ${
            oldprice !== 'undefined'
              ? `
                <div class="productitem__oldprice">${oldprice} byn</div>
                <div class="productitem__price">${price} byn</div>
                <div class="productitem__sale">скидка ${oldprice - price} byn</div>`
              : `<div class="productitem__price">${price} byn</div>`
          }
          
          <div class="productitem__cart">
            <button class="productitem__cart__buy ${
              this.state.idProductInCart ? `add` : ``
            }" type="button" >
            ${
              this.state.idProductInCart
                ? `В корзине - ${this.state.idProductQuantity} шт.`
                : `Добавить в корзину`
            }</button>
          </div>
          <div class="productitem__block">
            <div class="productitem__block__one">
              <div class="productitem__block__one__name">Доставка:</div>
              <div class="productitem__block__one__shop">
                <img class="productitem__block__one__ico" src='../../../assets/images/ico__shop.png'/>
                Самовывоз - ${itemdate}
              </div>
              <div class="productitem__block__one__home">
                <img class="productitem__block__one__ico" src='../../../assets/images/ico__home.png'/>
                Курьером - ${courierdate}
              </div>
            </div>
            <div class="productitem__block__two">Рассрочка без переплаты</div>
          </div>

        </div>
  
      </section>

    `;
  }
}
customElements.define('product-card', ProductCard);
