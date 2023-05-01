import { APP_EVENTS } from '../../../constants/appEvents';
import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';
import { readerFile } from '../../../utils/readFile';

class BlogForm extends Component {
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
      eventEmitter.emit(APP_EVENTS.createBlog, { data });
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

  componentDidMount() {
    this.addEventListener('submit', this.onSubmit);
    this.addEventListener('change', this.onChange);
  }

  componentWillUnmount() {
    this.removeEventListener('submit', this.onSubmit);
    this.removeEventListener('change', this.onChange);
  }

  render() {
    return `
    <div class="productform">

      <div class="productform__left">
        <form action="../" enctype="multipart/form-data">

          <input name="heading" type="text" placeholder="Название рубрики">

          <input name="title" type="text" placeholder="Название (заголовок) статьи">

          <textarea name="description" placeholder="Текст статьи"></textarea>

          <label class="input-file">
            <input name="images" type="file" class="preview-input" accept="image/png, image/jpeg">
            <span>Выберите файл изображения для статьи</span>
          </label>  

          <button type="submit" class="btn btn-primary">Сохранить статью</button>

        </form>
      </div>
      
      <div class="productform__right">
        <div class="preview-image"></div>
        <div class="preview-text">
          Для перехода на новую строку встаьте тег: <xmp><br></xmp>
        </div>
        <div class="preview-text">
          Заголовок уровней H2, H3, H4 оберните в соответсвующий тег: <xmp><h2></h2></xmp><xmp><h3></h3></xmp><xmp><h4></h4></xmp>
        </div>
      </div>  

    </div>
        `;
  }
}

customElements.define('blog-form', BlogForm);
