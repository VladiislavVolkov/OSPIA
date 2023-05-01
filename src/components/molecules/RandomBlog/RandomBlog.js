import { Component } from '../../../core/Component';

class RandomBlog extends Component {
  static get observedAttributes() {
    return ['title', 'id'];
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { title, id } = this.props;

    return `
      <div class="articleitem__block__one__item">
        <a href="/article/${id}">${title}</a>
      </div>  
    `;
  }
}
customElements.define('tc-randomblog', RandomBlog);
