import { APP_EVENTS } from '../../../constants/appEvents';
import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';

import './CategoryItems.scss';

class CategoryItems extends Component {
  static get observedAttributes() {
    return ['itemscategory', 'isactivecategory'];
  }

  setCategoryProducts = (evt) => {
    evt.preventDefault();
    if (evt.target.closest('.categorylist__li')) {
      const id = evt.target.dataset.id;
      const itemscategory = JSON.parse(this.props.itemscategory);
      const selectedCategory = itemscategory.find((item) => item.id === id);
      eventEmitter.emit(APP_EVENTS.setCategoryProducts, { selectedCategory });
    }
  };

  componentDidMount() {
    this.addEventListener('click', this.setCategoryProducts);
  }

  componentWillUnmount() {
    this.removeEventListener('click', this.setCategoryProducts);
  }

  render() {
    const itemscategory = JSON.parse(this.props.itemscategory);
    const { isactivecategory } = this.props;

    return `
      <div class="section__left__item">Категории</div>
        <ul class="section__left__categorylist">
          ${itemscategory
            // .slice(0, 5)
            .map((item) => {
              const active = isactivecategory === item.name;
              return `
                <li class="categorylist__li ${active ? 'activecategory' : ''} capitalize ">
                  <a 
                    href="#" 
                    title="${item.name}" 
                    data-id='${item.id}'
                  >${item.name}</a>
                </li>
              `;
            })
            .join('')}   
        </ul>
    `;
  }
}

customElements.define('tc-categoryitems', CategoryItems);
