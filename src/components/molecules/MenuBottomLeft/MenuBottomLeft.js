import { Component } from '../../../core/Component';
import { appPagesMenuTop } from '../../../constants/appPagesMenuTop';

import '../../atoms/MenuNavLi';

import './MenuBottomLeft.scss';

class MenuBottomLeft extends Component {
  render() {
    return `
          <ul class="navlist inline bold">
            <tc-menunavli 
              itemsmenunavli='${JSON.stringify(appPagesMenuTop[2])}'
            >
            </tc-menunavli>
          </ul>
    `;
  }
}

customElements.define('tc-menubottomleft', MenuBottomLeft);
