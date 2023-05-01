import { Component } from '../../../core/Component';

import './CategoryName.scss';

class CategoryName extends Component {
  static get observedAttributes() {
    return ['categories', 'categoriesdescr', 'class', 'image'];
  }

  render() {
    const { categories, categoriesdescr, classname, image } = this.props;

    return `

        <section class="category ${classname ? classname : ''}">
          ${
            categories !== 'undefined'
              ? `
                <div class="category__section">
                  ${
                    image !== 'undefined'
                      ? `<div class="category__section__left">
                          <img class="image-fit" src='${image}'/>
                        </div>`
                      : ``
                  } 
                  <div class="category__section__right">
                    <div class="category__section__right__top">${categories}</div>
                      ${
                        categoriesdescr !== 'undefined'
                          ? `<div class="category__section__right__bottom">${categoriesdescr}</div>`
                          : ``
                      } 
                    </div>
                  </div>            
                </div>`
              : `<div class="category__section">
                    <div class="category__section__left">
                      <img class="image-fit" src='../assets/images/ico__home__big.png'/>
                    </div>
                    <div class="category__section__right">
                      <div class="category__section__right__top">все товары</div>
                      <div class="category__section__right__bottom">лучшие товары на мебельном рынке</div>
                    </div>
                </div>`
          } 
        </section> 
      
    `;
  }
}

customElements.define('tc-categoryname', CategoryName);
