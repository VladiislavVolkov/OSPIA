import { APP_EVENTS } from '../../constants/appEvents';
import { Component } from '../Component';
import { eventEmitter } from '../EventEmitter';

export class Link extends Component {
  constructor() {
    super();
    this.isShadow = true;
  }

  static get observedAttributes() {
    return ['to', 'children'];
  }

  onClick = (evt) => {
    evt.preventDefault();
    eventEmitter.emit(APP_EVENTS.changeRoute, { target: this.props.to });
    window.scrollTo(0, { behavior: 'smooth' });
  };

  componentDidMount() {
    this.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener('click', this.onClick);
  }

  render() {
    return `
      <style>
        a {
          color: inherit;
          text-decoration: inherit; 
        }
      </style>
      <a href="${this.props.to}">
        <slot></slot>
      </a>
      `;
  }
}

customElements.define('router-link', Link);
