import { APP_EVENTS } from '../../../constants/appEvents';
import { Component } from '../../../core/Component';
import { routes } from '../../../constants/routes';
import { eventEmitter } from '../../../core/EventEmitter';
import { databaseService } from '../../../services/DatabaseService';
import { forms } from '../../molecules/Tabs/constants';
import { menuItems } from '../../molecules/Tabs/constants';
import { firebaseStorageService } from '../../../services/FirebaseStorageService';

import '../../molecules/Tabs';
import '../../organisms/BlogForm';
import '../../organisms/ProductForm';
import '../../organisms/CategoryForm';
import '../../molecules/Preloader';
import '../../molecules/CategoryName';

import './AdminPage.scss';

export class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: menuItems[0],
      isLoading: false,
    };
  }

  setIsLoading = (isLoading) => {
    this.setState((state) => {
      return {
        ...state,
        isLoading,
      };
    });
  };

  setActiveItem = (activeTab) => {
    this.setState((state) => {
      return {
        ...state,
        activeTab,
      };
    });
  };

  createCategory = ({ detail }) => {
    this.setIsLoading(true);
    const { data } = detail;
    firebaseStorageService
      .uploadFile(data.image, 'categories')
      .then((snapshot) => {
        firebaseStorageService.downloadURL(snapshot.ref).then((url) => {
          databaseService.createDocument('categories', {
            ...data,
            image: url,
          });
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  createProduct = ({ detail }) => {
    this.setIsLoading(true);
    const { data } = detail;
    firebaseStorageService
      .uploadFile(data.images, 'products')
      .then((snapshot) => {
        firebaseStorageService.downloadURL(snapshot.ref).then((url) => {
          databaseService.createDocument('products', {
            ...data,
            images: url,
          });
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  createBlog = ({ detail }) => {
    this.setIsLoading(true);
    const { data } = detail;
    console.log(data);
    firebaseStorageService
      .uploadFile(data.images, 'blogs')
      .then((snapshot) => {
        firebaseStorageService.downloadURL(snapshot.ref).then((url) => {
          databaseService.createDocument('blogs', {
            ...data,
            images: url,
          });
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  onChangeTab = ({ detail }) => {
    this.setActiveItem(detail.activeItem);
  };

  componentDidMount() {
    eventEmitter.on(APP_EVENTS.changeTab, this.onChangeTab);
    eventEmitter.on(APP_EVENTS.createCategory, this.createCategory);
    eventEmitter.on(APP_EVENTS.createProduct, this.createProduct);
    eventEmitter.on(APP_EVENTS.createBlog, this.createBlog);
  }

  componentWillUnmount() {
    eventEmitter.off(APP_EVENTS.changeTab, this.onChangeTab);
    eventEmitter.off(APP_EVENTS.createCategory, this.createCategory);
    eventEmitter.off(APP_EVENTS.createProduct, this.createProduct);
    eventEmitter.off(APP_EVENTS.createBlog, this.createBlog);
  }

  render() {
    return `
      <it-preloader is-loading="${this.state.isLoading}">

        <tc-categoryname 
        categories="${routes.admin.name}"
        categoriesdescr="${routes.admin.description}"
        classname="${routes.admin.classname}"
        image="${routes.admin.image}"
        ></tc-categoryname>

        <main class="background_admin"> 

            <section class="sectionadmin">
                    <div class="menu-items">
                      <div class='menu-items__left'>
                        <tc-tabs menu-items='${JSON.stringify(menuItems)}' 
                          active-item='${JSON.stringify(this.state.activeTab)}'>
                        </tc-tabs>
                      </div> 
                      <div class='menu-items__right'>
                        ${forms[this.state.activeTab.id]}
                      </div>
                    </div>
            </section> 

        </main> 
        
      </it-preloader>      
    `;
  }
}

customElements.define('admin-page', AdminPage);
