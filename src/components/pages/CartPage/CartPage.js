import { Component } from '../../../core/Component';
import { APP_STORAGE_KEYS } from '../../../constants/appStorageKeys';
import { localStorageService } from '../../../services/LocalStorageService';
import { eventEmitter } from '../../../core/EventEmitter';
import { APP_EVENTS } from '../../../constants/appEvents';
import { routes } from '../../../constants/routes';

import '../../molecules/CategoryName';

import './CartPage.scss';
import { APP_ROUTES_MenuTop } from '../../../constants/appRoutesMenuTop';
import { authService } from '../../../services/Auth';

class CartPage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      isLoading: false,
      user: null,
    };
  }

  setProducts = (products) => {
    const mapProducts = products
      .filter((item, index, arr) => {
        return arr.findIndex((findItem) => findItem.id === item.id) === index;
      })
      .map((item) => {
        return {
          ...item,
          quantity: item.quantity
            ? item.quantity
            : products.filter((filterItem) => filterItem.id === item.id).length,
        };
      });

    this.setState((state) => {
      return {
        ...state,
        products: mapProducts,
      };
    });
  };

  onDeleteItem = (evt) => {
    if (evt.target.closest('.minus')) {
      const id = evt.target.dataset.id;
      const items = this.state.products;
      const filteredItems = items
        .map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        })
        .filter((item) => Boolean(item.quantity));
      localStorageService.setItem(APP_STORAGE_KEYS.cardData, filteredItems);
    }
  };

  onDelete = (evt) => {
    if (evt.target.closest('.cartitem__iteminfo__delete')) {
      const id = evt.target.dataset.id;
      const items = this.state.products;
      const filteredItems = items
        .map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: 0,
            };
          }
          return item;
        })
        .filter((item) => Boolean(item.quantity));
      localStorageService.setItem(APP_STORAGE_KEYS.cardData, filteredItems);
    }
  };

  onAddItem = (evt) => {
    if (evt.target.closest('.plus')) {
      const id = evt.target.dataset.id;
      const items = this.state.products;
      const filteredItems = items
        .map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        })
        .filter((item) => Boolean(item.quantity));
      localStorageService.setItem(APP_STORAGE_KEYS.cardData, filteredItems);
    }
  };

  onLocalStorage = () => {
    const count = localStorageService.getItem('cardData');
    this.setProducts(count);
  };

  sumProducts(products) {
    return products.reduce((acc, item) => {
      return (acc += item.quantity ? item.price * item.quantity : item.price);
    }, 0);
  }

  oldsumProducts(products) {
    return products.reduce((acc, item) => {
      return (acc += item.quantity
        ? (item.oldprice == 'undefined' ? item.price : item.oldprice) * item.quantity
        : item.oldprice == 'undefined'
        ? item.price
        : item.oldprice);
    }, 0);
  }

  products(products) {
    return products.reduce((acc, item) => {
      return (acc += item.quantity);
    }, 0);
  }

  buyCart = (evt) => {
    if (evt.target.closest('.finalclose')) {
      const items = (this.state.products = []);
      localStorageService.setItem(APP_STORAGE_KEYS.cardData, items);
      this.innerHTML = `
        <section class="noproducts">
          <div class="noproducts__top">
            <div class="noproducts__top__one">
              <img class="image-fit" src='../../../assets/images/ico__gif.gif'/>
            </div>  
            <div class="noproducts__top__text">
              Ура, Вы оформили заказ! Благодарим за сотрудничество!
            </div>  
          </div>  
          <div class="noproducts__bottom">
            <a href="./">Пару мгновений и Вы опять на главной странице</a>
          </div>  
        </section>`;
      const body = document.body;
      body.classList.remove('noscroll');
      setTimeout(() => {
        eventEmitter.emit(APP_EVENTS.changeRoute, { target: APP_ROUTES_MenuTop[0].main });
      }, 3000);
    }
  };

  checkout = (evt) => {
    const modal = document.querySelector('.modal');
    const body = document.body;
    if (evt.target.closest('.modal__open')) {
      body.classList.add('noscroll');
      modal.style.cssText = `visibility: visible; opacity: 1;display: flex;`;
    }
    if (evt.target.closest('.modal__close')) {
      modal.style.cssText = `visibility: visible; opacity: 0;display: none;`;
      body.classList.remove('noscroll');
    }
  };

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
    const products = localStorageService.getItem(APP_STORAGE_KEYS.cardData);
    this.setProducts(products ?? []);
    this.addEventListener('click', this.onDeleteItem);
    this.addEventListener('click', this.onAddItem);
    this.addEventListener('click', this.onDelete);
    this.addEventListener('click', this.buyCart);
    this.addEventListener('click', this.checkout);
    eventEmitter.on(APP_EVENTS.storage, this.onLocalStorage);
  }

  componentWillUnmount() {
    this.removeEventListener('click', this.onDeleteItem);
    this.removeEventListener('click', this.onAddItem);
    this.removeEventListener('click', this.onDelete);
    this.removeEventListener('click', this.buyCart);
    this.removeEventListener('click', this.checkout);
    eventEmitter.off(APP_EVENTS.storage, this.onLocalStorage);
  }

  render() {
    const sale = this.oldsumProducts(this.state.products) - this.sumProducts(this.state.products);

    return `
    <it-preloader is-loading="${this.state.isLoading}">

    ${
      this.state.products.length == 0
        ? `<section class="noproducts">
            <div class="noproducts__top">
              <div class="noproducts__top__one">
                <img class="image-fit" src='../../../assets/images/ico__cartclear__big.png'/>
              </div>  
              <div class="noproducts__top__text">
                Корзина пуста
              </div>  
            </div>  
            <div class="noproducts__bottom">
              <a href="./catalog">Перейти в каталог</a>
            </div>  
          </section>`
        : `<tc-categoryname 
            categories="${routes.cart.name}"
            categoriesdescr="${routes.cart.description}"
            classname="${routes.cart.classname}"
            image="${routes.cart.image}"
          ></tc-categoryname>

          <main class="background_cart">
            <section class="sectioncart">

              <div class="sectioncart__left">

              ${this.state.products
                .map((item) => {
                  const sum = item.price * item.quantity;
                  const oldsum = item.oldprice * item.quantity;
                  const sale = oldsum - sum;

                  const today = new Date();
                  const dateone = new Date();
                  const datetwo = new Date();
                  dateone.setDate(today.getDate() + 1);
                  datetwo.setDate(today.getDate() + 3);
                  const itemdate = dateone.toLocaleString().slice(0, 10);
                  const courierdate = datetwo.toLocaleString().slice(0, 10);

                  return `

                  <div class="cartitem">

                    <div class="cartitem__img">
                      <img class="image-fit" src='${item.images}'/>
                    </div>

                    <div class="cartitem__iteminfo">

                      <div class="cartitem__iteminfo__top">
                        <div class="cartitem__iteminfo__top__one">
                          <a href="product/${item.id}">${item.title}</a>
                          <span>Категория: ${item.category}</span>
                        </div>
                        <div class="cartitem__iteminfo__top__two">
                          <button class='btn minus' data-id='${item.id}'>-</button>
                          ${item.quantity}
                          <button class='btn plus' data-id='${item.id}'>+</button>
                        </div>
                        <div class="cartitem__iteminfo__top__three">
                        ${
                          item.oldprice == 'undefined'
                            ? ``
                            : `<div class="cartitem__iteminfo__top__three__oldsum">${oldsum} byn</div>`
                        }
                          <div class="cartitem__iteminfo__top__three__sum">${sum} byn</div>
                          ${
                            item.oldprice == 'undefined'
                              ? ``
                              : `<div class="cartitem__iteminfo__top__three__sale">скидка ${sale} byn</div>`
                          }
                        </div>
                      </div>

                      <div class="cartitem__iteminfo__bottom">
                        <div class="cartitem__iteminfo__bottom__one">
                          Доставка:
                        </div>
                        <div class="cartitem__iteminfo__bottom__two">
                          <img class="cartitem__iteminfo__bottom__ico" src='../../../assets/images/ico__shop.png'/>
                          <span>Самовывоз -</span>&nbsp;${itemdate}
                        </div>
                        <div class="cartitem__iteminfo__bottom__three">
                          <img class="cartitem__iteminfo__bottom__ico" src='../../../assets/images/ico__home.png'/>
                          <span>Курьером домой -</span>&nbsp;${courierdate}
                        </div>
                      </div>

                      <div class="cartitem__iteminfo__delete" data-id='${item.id}'>
                          <img class="cartitem__iteminfo__delete__ico" src='../../../assets/images/ico__delete.png'/>
                          Удалить товар
                      </div>

                    </div>

                  </div>
                  `;
                })
                .join('')}
              

              </div>

              ${
                this.products(this.state.products)
                  ? `
                  <div class="sectioncart__right">
                    <div class="sectioncart__right__one">
                      <div class="sectioncart__right__one__left">Итого:
                      </div>
                      <div class="sectioncart__right__one__right">${this.sumProducts(
                        this.state.products,
                      )} byn
                      </div>
                    </div>
                    <div class="sectioncart__right__two">
                      <div class="sectioncart__right__two__left">Товары - ${this.products(
                        this.state.products,
                      )} шт.
                      </div>
                      <div class="sectioncart__right__two__right">${this.oldsumProducts(
                        this.state.products,
                      )} byn
                      </div>
                    </div>
                    ${
                      sale
                        ? `
                        <div class="sectioncart__right__three">
                          <div class="sectioncart__right__three__left">Скидка
                          </div>
                          <div class="sectioncart__right__three__right">- ${sale} byn
                          </div>
                        </div>`
                        : ``
                    }
                      <button class="form__btn modal__open" type="button">Оформить заказ</button>
                  </div>`
                  : ``
              }

            </section>
          </main> `
    }
    
        <div class="modal modal1">
          <div class="modal__main">
          ${
            this.state.user
              ? `            <h2 class="modal__title">Подтверждение заказа.</h2>
            
          <div class="modal__container">Нажимая "Подвердить заказ" - очищается корзина и Вы переходите на главную страницу проекта "OSPIA".</div>

          <button class="form__btn finalclose" type="button">Подвердить заказ</button>
          <button class="modal__close">&#10006;</button>`
              : `<h2 class="modal__title">Внимание!</h2>
            
              <div class="modal__container">Оформить заказ могут только зарегистированные пользователи.</div>
              <router-link to="${APP_ROUTES_MenuTop[2].signin}">
                <button class="form__btn" type="button">
                  Войти
                </button>
                <button class="modal__close">&#10006;</button>
              </router-link>`
          }
            
          </div>
        </div>
        </it-preloader>
    `;
  }
}

customElements.define('cart-page', CartPage);
