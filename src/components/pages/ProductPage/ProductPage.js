import { Component } from '../../../core/Component';
import { FIRESTORE_KEYS } from '../../../constants/firestoreKeys';
import { databaseService } from '../../../services/DatabaseService';
import { localStorageService } from '../../../services/LocalStorageService';
import { APP_STORAGE_KEYS } from '../../../constants/appStorageKeys';

import '../../molecules/ProductCard';

import './ProductPage.scss';

class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 4,
      productsFromDatabase: [],
      product: [],
    };
  }

  static get observedAttributes() {
    return ['id'];
  }

  getProducts = async () => {
    try {
      const productsFromDatabase = await databaseService.getCollection(FIRESTORE_KEYS.products);
      this.setProducts(productsFromDatabase);
      this.sliceData();
    } catch (error) {
      console.error(error);
    }
  };

  setProducts = (productsFromDatabase) => {
    this.setState((state) => {
      return {
        ...state,
        productsFromDatabase,
        product: productsFromDatabase.find((item) => item.id === this.props.id),
      };
    });
  };

  clickCard = (evt) => {
    if (evt.target.closest('.button__buy')) {
      const allItems = localStorageService.getItem(APP_STORAGE_KEYS.cardData) ?? [];
      localStorageService.setItem(APP_STORAGE_KEYS.cardData, [...allItems, this.props]);
    }
  };

  sliceData() {
    const allProducts = this.state.productsFromDatabase;
    const length = this.state.productsFromDatabase.length;
    const start = length - this.state.quantity;
    const end = length;
    return allProducts.slice(start, end);
  }

  componentDidMount() {
    this.getProducts();
    this.addEventListener('click', this.addToCart);
  }

  componentWillUnmount() {
    this.getProducts();
    this.removeEventListener('click', this.addToCart);
  }

  render() {
    const { images, title, description, id, price, oldprice, sale, category } = this.state.product;
    return `

    <main class="background_product">

      <product-card
        images='${images}'
        title='${title}'
        price='${price}'
        oldprice='${oldprice}'
        sale='${sale}'
        description='${description}'
        id='${id}'
        category='${category}'
        >
      </product-card>

    </main>

    <section class="sectionmain sectionbg__one">

      <div class="sectionmain__section">
        <div class="sectionmain__section__top">
          советуем товары 
          <img class="image-info"src="https://img.icons8.com/pastel-glyph/64/ffffff/circled-chevron-down.png"/>
        </div>
        <div class="sectionmain__section__bottom"></div>
      </div>
 
    </section>

    <section class="sectionmain">

      <div class="sectionmain__section">
        <div class="sectionmain__section__sale">
          <tc-cardlist
          products='${JSON.stringify(this.sliceData())}' page='product'>
          </tc-cardlist>
        </div>
      </div>

    </section>
    
    `;
  }
}

customElements.define('product-page', ProductPage);
