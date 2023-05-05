import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';
import { APP_EVENTS } from '../../../constants/appEvents';
import { databaseService } from '../../../services/DatabaseService';
import { FIRESTORE_KEYS } from '../../../constants/firestoreKeys';

import '../../molecules/CategoryBlock';
import '../../molecules/CategoryName';
import '../../organisms/CardList';
import '../../molecules/Pagination';
import '../../pages/ProductPage';
import '../../../services/DatabaseService';
import '../../../constants/firestoreKeys';

import './CatalogPage.scss';

class CatalogPage extends Component {
  constructor() {
    super();
    this.state = {
      limit: 9,
      currentPage: 1,
      products: [],
      categoriesDatabase: [],
    };
  }

  getProducts = async () => {
    try {
      const productsDatabase = await databaseService.getCollection(FIRESTORE_KEYS.products);
      this.setProducts(productsDatabase);
    } catch (error) {
      console.log(error);
    }
  };

  setProducts = (productsDatabase) => {
    this.setState((state) => {
      return {
        ...state,
        productsDatabase,
        products: productsDatabase,
      };
    });
  };

  getCategories = async () => {
    try {
      const categoriesDatabase = await databaseService.getCollection(FIRESTORE_KEYS.categories);
      this.setCategories(categoriesDatabase);
    } catch (error) {
      console.log(error);
    }
  };

  setCategories = (categoriesDatabase) => {
    this.setState((state) => {
      return {
        ...state,
        categoriesDatabase,
      };
    });
  };

  sliceData(currentPage = 1) {
    const { limit } = this.state;

    const start = (currentPage - 1) * limit;
    const end = currentPage * limit;

    return this.state.products.slice(start, end);
  }

  onChangePaginationPage = (evt) => {
    this.setState((state) => {
      return {
        ...state,
        currentPage: Number(evt.detail.page),
      };
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  onFilterProductsByCategory = (evt) => {
    const { selectedCategory } = evt.detail;
    this.setState((state) => {
      return {
        ...state,
        products: this.state.productsDatabase.filter(
          (item) => item.category === selectedCategory.name,
        ),
        currentPage: 1,
      };
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (this.state.products.length === 0) {
      console.log('нет товаров в категории.');
    }
  };

  onSearch = (evt) => {
    const { data } = evt.detail;
    const text = data.search;
    this.setState((state) => {
      return {
        ...state,
        text,
        products: this.state.productsDatabase.filter((item) => {
          return item.title.toLowerCase().includes(data.search.toLowerCase());
        }),
        currentPage: 1,
      };
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.noProducts(this.state.products);
  };

  noProducts = (products) => {
    if (products.length === 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.innerHTML = `
        <section class="noproducts">
          <div class="noproducts__top">
            <div class="noproducts__top__one">
              <img class="image-fit" src='../../../assets/images/ico__error__big.png'/>
            </div>  
            <div class="noproducts__top__text">
              Нам очень жаль, но товара "${this.state.text}" в нашем каталоге нет ...
            </div>  
          </div>  
          <div class="noproducts__bottom">
            <a href="./catalog">Перейти в каталог</a>
          </div>  
        </section>`;
    }
  };

  isTitleAndDescriprionCategory = (evt) => {
    const { selectedCategory } = evt.detail;
    this.setState((state) => {
      return {
        ...state,
        categories: selectedCategory.name,
        categoriesdescr: selectedCategory.description,
        image: selectedCategory.image,
      };
    });
  };

  componentDidMount() {
    this.getProducts();
    this.getCategories();
    this.sliceData();
    eventEmitter.on(APP_EVENTS.changePaginationPage, this.onChangePaginationPage);
    eventEmitter.on(APP_EVENTS.setCategoryProducts, this.onFilterProductsByCategory);
    eventEmitter.on(APP_EVENTS.setCategoryProducts, this.isTitleAndDescriprionCategory);
    eventEmitter.on(APP_EVENTS.searchProducts, this.onSearch);
  }

  componentWillUnmount() {
    this.getProducts();
    this.getCategories();
    this.sliceData();
    eventEmitter.off(APP_EVENTS.changePaginationPage, this.onChangePaginationPage);
    eventEmitter.off(APP_EVENTS.setCategoryProducts, this.onFilterProductsByCategory);
    eventEmitter.off(APP_EVENTS.setCategoryProducts, this.isTitleAndDescriprionCategory);
    eventEmitter.off(APP_EVENTS.searchProducts, this.onSearch);
  }

  render() {
    return `

          <tc-categoryname 
              categories="${this.state.categories}"
              categoriesdescr="${this.state.categoriesdescr}"
              image="${this.state.image}"
          ></tc-categoryname>
          
          <main class="background_1">

            <section class="section">
  
              <div class="section__left">
  
                <tc-categoryblock 
                    categories='${JSON.stringify(this.state.categoriesDatabase)}'
                    isactivecategory="${this.state.categories}">
                </tc-categoryblock>

              </div>
  
              <div class="section__right">
                
                <tc-cardlist 
                  products='${JSON.stringify(this.sliceData(this.state.currentPage))}'>
                </tc-cardlist>
                  
                <tc-pagination 
                  total='${this.state.products.length}'
                  limit='${this.state.limit}'
                  currentpage='${this.state.currentPage}'>
                </tc-pagination>
                
              </div>
  
            </section> 
          </main>`;
  }
}

customElements.define('catalog-page', CatalogPage);
