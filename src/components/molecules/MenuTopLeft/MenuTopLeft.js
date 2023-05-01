import { Component } from '../../../core/Component';
import { appPagesMenuTop } from '../../../constants/appPagesMenuTop';

import '../../atoms/MenuNavLi';

import './MenuTopLeft.scss';

class MenuTopLeft extends Component {
  render() {
    return `
          <ul class="navlist inline">
            <tc-menunavli itemsmenunavli='${JSON.stringify(appPagesMenuTop[0])}'>
            </tc-menunavli>
          </ul>
    `;
  }
}

customElements.define('tc-menutopleft', MenuTopLeft);
