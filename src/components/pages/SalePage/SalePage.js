import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';
import { APP_EVENTS } from '../../../constants/appEvents';
import { routes } from '../../../constants/routes';
import { databaseService } from '../../../services/DatabaseService';
import { FIRESTORE_KEYS } from '../../../constants/firestoreKeys';

import '../../organisms/CardList';
import '../../molecules/Pagination';

class SalePage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      limit: 9,
      currentPage: 1,
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
        products: productsDatabase.filter((item) => item.sale === 'yes'),
      };
    });
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
              Нам очень жаль, но товар "${this.state.text}" отсутствует на распродаже ...
            </div>  
          </div>  
          <div class="noproducts__bottom">
            <a href="./sale">Перейти в раздел "SALE"</a>
          </div>  
        </section>`;
    }
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

  componentDidMount() {
    this.getProducts();
    this.sliceData();
    eventEmitter.on(APP_EVENTS.changePaginationPage, this.onChangePaginationPage);
    eventEmitter.on(APP_EVENTS.searchProducts, this.onSearch);
  }

  componentWillUnmount() {
    this.getProducts();
    this.sliceData();
    eventEmitter.off(APP_EVENTS.changePaginationPage, this.onChangePaginationPage);
    eventEmitter.off(APP_EVENTS.searchProducts, this.onSearch);
  }

  render() {
    return `
        <tc-categoryname 
          categories="${routes.sale.name}"
          categoriesdescr="${routes.sale.description}"
          classname="${routes.sale.classname}"
          image="${routes.sale.image}"
        ></tc-categoryname>
        
        <main class="background_1">
          <section class="section">

            <div class="section__right">
              
              <tc-cardlist 
                products='${JSON.stringify(this.sliceData(this.state.currentPage))}' page='sale'>
              </tc-cardlist>
                
              <tc-pagination 
                total='${this.state.products.length}'
                limit='${this.state.limit}'
                currentpage='${this.state.currentPage}'>
              </tc-pagination>
              
            </div>

          </section> 
        </main>
    `;
  }
}

customElements.define('sale-page', SalePage);
