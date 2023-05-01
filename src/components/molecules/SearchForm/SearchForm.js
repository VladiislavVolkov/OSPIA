import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';
import { APP_EVENTS } from '../../../constants/appEvents';

import './SearchForm.scss';
import { localStorageService } from '../../../services/LocalStorageService';

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onSearch = (evt) => {
    evt.preventDefault();
    const data = {};
    const formData = new FormData(evt.target);
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (data.search) {
      eventEmitter.emit(APP_EVENTS.searchProducts, { data });
    }
  };

  componentDidMount() {
    this.addEventListener('submit', this.onSearch);
  }

  componentWillUnmount() {
    this.removeEventListener('submit', this.onSearch);
  }

  render() {
    const route = localStorageService.getItem('route');
    const isActiveFormSearch = route === '/sale' || route === '/catalog';

    return `
        ${
          isActiveFormSearch
            ? `<form class="search">
                <input name='search' type="search" class="search__input" placeholder='поиск'/>
                  <button class="search__button"><img
                    src="../assets/images/icons8-поиск-64.png"
                    alt=""
                    srcset=""
                    class="icons"
                /></button>
              </form>`
            : ``
        }
      `;
  }
}

customElements.define('tc-searchform', SearchForm);
