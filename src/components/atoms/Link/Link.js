import { Component } from '../../../core/Component';

import '../../../core/Router/Link';

class Link extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static get observedAttributes() {
    return ['class', 'href', 'content', 'id'];
  }

  onClick = (evt) => {
    if (!this.props.href) {
      evt.preventDefault();
    }
  };

  componentDidMount() {
    this.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener('click', this.onClick);
  }

  render() {
    const href = this.props.href ? this.props.href : ``;
    const content = this.props.content;
    const classsname = this.props.classsname ? this.props.classsname : `''`;
    const id = this.props.id ? this.props.id : ``;

    return `
      <router-link to="${href}">
        <a class="${classsname}" href="${href}" title="${content}" data-id="${id}">${content}</a>
      </router-link>
    `;
  }
}

customElements.define('tc-link', Link);
