import { Component } from '../../../core/Component';
import { APP_EVENTS } from '../../../constants/appEvents';
import { eventEmitter } from '../../../core/EventEmitter';

import '../../atoms/Link';

import './MenuNavLi.scss';
import { localStorageService } from '../../../services/LocalStorageService';

class MenuNavLi extends Component {
  constructor() {
    super();
    // this.state = {};
  }

  static get observedAttributes() {
    return ['itemsmenunavli'];
  }

  isActiveRoute = () => {
    this.setState((state) => {
      return {
        ...state,
      };
    });
  };

  componentDidMount() {
    eventEmitter.on(APP_EVENTS.activeRoute, this.isActiveRoute);
  }

  componentWillUnmount() {
    eventEmitter.off(APP_EVENTS.activeRoute, this.isActiveRoute);
  }

  render() {
    const itemsmenunavli = JSON.parse(this.props.itemsmenunavli);
    const route = localStorageService.getItem('route');
    return `
          ${itemsmenunavli
            .map((item) => {
              return `
                  <li class="navlist__li"> 
                    <tc-link 
                      class="${item.href === route ? 'active' : ''}"
                      href="${item.href ? item.href : ''}"
                      content="${item.label}"
                    ></tc-link>
                  </li> 
              `;
            })
            .join('')}
    `;
  }
}

customElements.define('tc-menunavli', MenuNavLi);
