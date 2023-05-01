import { Component } from '../../../core/Component';

class ErrorPage extends Component {
  render() {
    return `
    <section class="sectionmain error">
        <section class="noproducts">
          <div class="noproducts__top">
            <div class="noproducts__top__one">
              <img class="image-fit" src='../../../assets/images/ico__404__big.png'/>
            </div>  
            <div class="noproducts__top__one">
            cтраница не найдена
            </div>  
          </div>  
          <div class="noproducts__bottom">
            <a href="./">Извините, такой страницы у нас нет.</a>
          </div>  
        </section>
        </section>
    `;
  }
}

customElements.define('error-page', ErrorPage);
