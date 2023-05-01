import { Component } from '../../../core/Component';
import '../../molecules/Card';

class CardList extends Component {
  static get observedAttributes() {
    return ['products', 'page'];
  }

  render() {
    const products = JSON.parse(this.props.products);

    return `

        <div class="section__cardblock">
        ${products
          .map((item) => {
            return `
                <tc-card 
                    images='${item.images}'
                    title='${item.title}'
                    price='${item.price}'
                    oldprice='${item.oldprice}'
                    sale='${item.sale}'
                    description='${item.description}'
                    id='${item.id}'
                    category='${item.category}'
                    page='${this.props.page}'
                ></tc-card>
            `;
          })
          .join('')}</div>
        
        `;
  }
}

customElements.define('tc-cardlist', CardList);
