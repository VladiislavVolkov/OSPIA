import { APP_EVENTS } from '../../../constants/appEvents';
import { FIRESTORE_KEYS } from '../../../constants/firestoreKeys';
import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';
import { databaseService } from '../../../services/DatabaseService';
import { readerFile } from '../../../utils/readFile';

import '../ProductForm/ProductForm.scss';

class CategoryForm extends Component {
  constructor() {
    super();
    this.state = {
      categoriesFromDatabase: [],
    };
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    const image = this.querySelector('.preview-image');
    const formData = new FormData(evt.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const isValid = Object.keys(data).every((key) => data[key] !== '');

    if (isValid) {
      eventEmitter.emit(APP_EVENTS.createCategory, { data });
      evt.target.reset();
      image.innerHTML = '';
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

  getCategories = async () => {
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

  componentDidMount() {
    this.getCategories();
    this.addEventListener('submit', this.onSubmit);
    this.addEventListener('change', this.onChange);
  }

  componentWillUnmount() {
    this.getCategories();
    this.removeEventListener('submit', this.onSubmit);
    this.removeEventListener('change', this.onChange);
  }

  render() {
    const categories = this.state.categoriesFromDatabase;
    return `
      <div class="productform">
 
        <div class="productform__left">
          <form action="../" enctype="multipart/form-data">

            <input name="name" type="text" placeholder="Введите название категории">
            <input name="description" type="text" placeholder="Введите краткое описание категории">

            <div class="preview-image"></div>
            <label class="input-file">
              <input name="image" type="file" class="preview-input" accept="image/png, image/jpeg">
              <span>Выберите файл для иконки категории</span>
            </label>

            <button type="submit" class="btn btn-primary">Сохранить категорию</button>

          </form>
        </div>

        <div class="productform__right">
          <div class="list">
            Существующие категории:
            ${categories
              .map((item) => {
                return `
                  <div class="list__item">${item.name}</div>
              `;
              })
              .join('')}
          </div>  
        </div>

      </div>
    
    `;
  }
}

customElements.define('category-form', CategoryForm);
