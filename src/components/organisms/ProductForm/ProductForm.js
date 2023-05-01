import { APP_EVENTS } from '../../../constants/appEvents';
import { FIRESTORE_KEYS } from '../../../constants/firestoreKeys';
import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';
import { databaseService } from '../../../services/DatabaseService';
import { readerFile } from '../../../utils/readFile';

import './ProductForm.scss';

class ProductForm extends Component {
  constructor() {
    super();
    this.state = {
      categoriesFromDatabase: [],
    };
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    const images = this.querySelector('.preview-image');
    const formData = new FormData(evt.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const isValid = Object.keys(data).every((key) => data[key] !== '');

    if (isValid) {
      eventEmitter.emit(APP_EVENTS.createProduct, { data });
      evt.target.reset();
      images.innerHTML = '';
    }
  };

  onChange = (evt) => {
    if (evt.target.closest('.preview-input')) {
      const file = evt.target.files[0];
      readerFile(file)
        .then((result) => {
          const image = new Image();
          image.src = result;
          const previewBlock = this.querySelector('.preview-image');
          previewBlock.append(image);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  getProducts = async () => {
    try {
      const categoriesFromDatabase = await databaseService.getCollection(FIRESTORE_KEYS.categories);
      this.setCategories(categoriesFromDatabase);
    } catch (error) {
      console.error(error);
    }
  };

  setCategories = (categoriesFromDatabase) => {
    this.setState((state) => {
      return {
        ...state,
        categoriesFromDatabase,
      };
    });
  };


  onSale = (evt) => {
    if (evt.target.closest('.sale')) {
      const id = document.querySelector('.oldprice');
      if (evt.target.value === 'yes') {
        id.setAttribute('class', 'oldprice');
        id.removeAttribute('value');
      }
      if (evt.target.value === 'no') {
        id.setAttribute('class', 'oldprice hidden');
        id.setAttribute('value', '0');
      }
    }
  };

  componentDidMount() {
    this.getProducts();
    this.addEventListener('submit', this.onSubmit);
    this.addEventListener('change', this.onChange);
    this.addEventListener('change', this.onSale);
  }

  componentWillUnmount() {
    this.getProducts();
    this.removeEventListener('submit', this.onSubmit);
    this.removeEventListener('change', this.onChange);
    this.removeEventListener('change', this.onSale);
  }

  render() {
    const categories = this.state.categoriesFromDatabase;

    return `

    <div class="productform">

      <div class="productform__left">
        <form action="../" enctype="multipart/form-data">

          <input name="title" type="text" placeholder="Название товара">

          <textarea name="description" placeholder="Описание товара"></textarea>

          <select name="category">
            <option value="">Выберите категорию товара</option>
            ${categories
              .map((item) => {
                return `
                    <option value="${item.name}">${item.name}</option>
                `;
              })
              .join('')}
          </select> 

          <input name="price" type="number" placeholder="Цена товара">

          <select name="sale" class='sale'>
            <option value="">Товар на скидке?</option>
            <option value="yes">Да, товар на скидке</option>
            <option value="no">Нет. Скидок на товар нет.</option>
          </select>
   
          <input name="oldprice" class="oldprice hidden" type="number" placeholder="Старая цена товара" value="0">

          <label class="input-file">
            <input name="images" type="file" class="preview-input" accept="image/png, image/jpeg">
            <span>Выберите файл изображения для товара</span>
          </label>  

          <button type="submit" class="btn btn-primary">Сохранить товар</button>

        </form>
      </div>
      
      <div class="productform__right">
        <div class="preview-image"></div>
      </div>  

    </div>

        `;
  }
}

customElements.define('product-form', ProductForm);
