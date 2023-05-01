import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';
import { APP_EVENTS } from '../../../constants/appEvents';

import './Pagination.scss';

class Pagination extends Component {
  static get observedAttributes() {
    return ['total', 'limit', 'currentpage'];
  }

  onChangePage = (evt) => {
    evt.preventDefault();
    if (evt.target.closest('.number-link')) {
      eventEmitter.emit(APP_EVENTS.changePaginationPage, { page: evt.target.dataset.page });
    }
    if (evt.target.closest('.previous-link')) {
      const { currentpage } = this.props;
      eventEmitter.emit(APP_EVENTS.changePaginationPage, { page: Number(currentpage) - 1 });
    }
    if (evt.target.closest('.next-link')) {
      const { currentpage } = this.props;
      eventEmitter.emit(APP_EVENTS.changePaginationPage, { page: Number(currentpage) + 1 });
    }
  };

  componentDidMount() {
    this.addEventListener('click', this.onChangePage);
  }

  componentWillUnmount() {
    this.removeEventListener('click', this.onChangePage);
  }

  render() {
    const { total, limit, currentpage } = this.props;
    const count = new Array(Math.ceil(total / limit)).fill(null);

    const onlyPageOne = count.length === 1;

    const isFirst = Number(currentpage) === 1;
    let isLast = Number(currentpage) === count.length;
    if (count.length == 0) {
      isLast = true;
    }

    return `
        <div class="pagination">

            <div class="pagination__number arrow previous-link ${isFirst ? 'disabled' : ''}">
                <span class="pagination__span">Назад</span> 
            </div>

            ${count
              .map((_, index) => {
                const page = index + 1;
                const isActive = page === Number(currentpage);

                return `
                      <div 
                        class="pagination__number number-link 
                          ${isActive ? 'active' : ''} 
                          ${onlyPageOne ? 'disabled' : ''}"
                        href='#'
                        data-page="${page}"
                      >${page}</div>
                  `;
              })
              .join('')}

            <div class="pagination__number arrow next-link ${isLast ? 'disabled' : ''}">
                <span class="pagination__span">Вперед</span> 
            </div>

        </div

        `;
  }
}

customElements.define('tc-pagination', Pagination);
