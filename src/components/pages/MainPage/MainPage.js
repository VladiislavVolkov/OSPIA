import { Component } from '../../../core/Component';
import { databaseService } from '../../../services/DatabaseService';
import { FIRESTORE_KEYS } from '../../../constants/firestoreKeys';
import { APP_ROUTES_MenuTop } from '../../../constants/appRoutesMenuTop';

import '../../organisms/CardList';

import './MainPage.scss';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      sale: [],
      quantity: 4,
      blogs: [],
      quantityblogs: 4,
    };
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
        sale: productsFromDatabase.filter((item) => item.sale === 'yes'),
        products: productsFromDatabase,
      };
    });
  };

  getBlogs = async () => {
    try {
      const blogsDatabase = await databaseService.getCollection(FIRESTORE_KEYS.blogs);
      this.setBlogs(blogsDatabase);
    } catch (error) {
      console.log(error);
    }
  };

  setBlogs = (blogsDatabase) => {
    this.setState((state) => {
      return {
        ...state,
        blogs: blogsDatabase,
      };
    });
  };

  sliceData() {
    const start = this.state.products.length - this.state.quantity;
    const end = this.state.products.length;
    return this.state.products.slice(start, end);
  }

  sliceDataSale() {
    const start = this.state.sale.length - this.state.quantity;
    const end = this.state.sale.length;
    return this.state.sale.slice(start, end);
  }

  sliceDataBlogs() {
    const start = 0;
    const end = 2;
    return this.state.blogs.slice(start, end);
  }

  componentDidMount() {
    this.getProducts();
    this.getBlogs();
  }

  componentWillUnmount() {
    this.getProducts();
    this.getBlogs();
  }

  render() {
    return `

      <section class="sectionmain">
        <div class="sectionmain__section bg__one">
          <div class="sectionmain__section__info">
            <div class="sectionmain__section__info__image">
                <img class="" src='../../../assets/images/info__2.png'/>
            </div>
             
            <div class="sectionmain__section__info__descr">
              <img class="image" src='../../../assets/images/logo__i.png'/>
              <div class="text">
                Начинаем работать 5 мая!
              </div>
              <div class="text sale">
                <router-link to="${APP_ROUTES_MenuTop[3].sale}">
                  <a href='#'>Скидки уже здесь!<img src='https://img.icons8.com/pastel-glyph/64/null/forward.png'/></a>
                </router-link>
              </div>
            </div> 
          </div>
        </div>
      </section> 

      <section class="sectionmain ">
        <div class="sectionmain__section">
          <div class="sectionmain__section__top">
            <router-link to="${APP_ROUTES_MenuTop[3].catalog}">
              Каталог
            </router-link>
          </div>
          <div class="sectionmain__section__bottom bg__descr">
            рекомендуем наши новинки</div>
        </div>
      </section> 

      <section class="sectionmain">
        <div class="sectionmain__section bg__one">
          <div class="sectionmain__section__sale">
            <tc-cardlist 
              products='${JSON.stringify(this.sliceData())}' page='main'>
            </tc-cardlist>
          </div>    
        </div> 
      </section>

      <section class="sectionmain">
        <div class="sectionmain__section">
          <div class="sectionmain__section__top">
            <router-link to="${APP_ROUTES_MenuTop[3].blog}">
              Идеи & Тренды 
            </router-link>
          </div>
          <div class="sectionmain__section__bottom bg__descr">
            свежие блоги для чтения</div>
        </div>
      </section> 

      <section class="sectionmain">
        <div class="sectionmain__section  bg__one">
          <div class="sectionmain__section__blogs">
            <tc-bloglist 
              blogs='${JSON.stringify(this.sliceDataBlogs())}' page='main'>
            </tc-bloglist>
          </div>    
        </div> 
      </section>

      <section class="sectionmain">
        <div class="sectionmain__section">
          <div class="sectionmain__section__top saletitle">
            <div class="saletitle">
              <router-link to="${APP_ROUTES_MenuTop[3].sale}">
                SALE 
              </router-link>
            </div>
          </div>
          <div class="sectionmain__section__bottom bg__descr">
            товары стали доступнее</div>
        </div>
      </section> 

      <section class="sectionmain">
      <div class="sectionmain__section">
        <div class="sectionmain__section__sale">
          <tc-cardlist 
            products='${JSON.stringify(this.sliceDataSale())}' page='main'>
          </tc-cardlist>
        </div>    
      </div> 
    </section>


    `;
  }
}

customElements.define('main-page', MainPage);
