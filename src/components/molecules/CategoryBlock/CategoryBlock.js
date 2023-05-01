import { Component } from '../../../core/Component';

import '../../molecules/CategoryItems';

class CategoryBlock extends Component {
  static get observedAttributes() {
    return ['categories', 'isactivecategory'];
  }

  render() {
    const categories = this.props.categories;
    const isactivecategory = this.props.isactivecategory;

    return `

          <tc-categoryitems 
            itemscategory='${categories}'
            isactivecategory='${isactivecategory}'
          >
          </tc-categoryitems>
          
        `;
  }
}

customElements.define('tc-categoryblock', CategoryBlock);
