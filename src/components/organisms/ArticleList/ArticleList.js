import { Component } from '../../../core/Component';
import '../../molecules/RandomBlog';

class ArticleList extends Component {
  static get observedAttributes() {
    return ['randomblogs'];
  }

  render() {
    const randomblogs = JSON.parse(this.props.randomblogs);

    return `

        ${randomblogs
          .map((item) => {
            return `
              <tc-randomblog 
                title='${item.title}'
                id='${item.id}'
              ></tc-randomblog>
            `;
          })
          .join('')}</div>
        
        `;
  }
}

customElements.define('tc-articlelist', ArticleList);
