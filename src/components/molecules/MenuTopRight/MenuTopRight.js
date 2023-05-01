import { Component } from '../../../core/Component';
import { appPagesMenuTop } from '../../../constants/appPagesMenuTop';
import { ADMIN } from '../../../constants/userRoles';
import { APP_ROUTES_MenuTop } from '../../../constants/appRoutesMenuTop';

import '../../atoms/MenuNavLi';

import './MenuTopRight.scss';

class MenuTopRight extends Component {
  static get observedAttributes() {
    return ['user'];
  }

  getItems() {
    const user = JSON.parse(this.props.user);

    if (user) {
      if (user.email === ADMIN) {
        return appPagesMenuTop[1].filter((menuItem) => {
          return [APP_ROUTES_MenuTop[2].signup, APP_ROUTES_MenuTop[2].signin].every(
            (item) => item !== menuItem.href,
          );
        });
      } else {
        return appPagesMenuTop[1].filter((menuItem) => {
          return [APP_ROUTES_MenuTop[2].signup, APP_ROUTES_MenuTop[2].signin].every(
            (item) => item !== menuItem.href,
          );
        });
      }
    } else {
      return appPagesMenuTop[1].filter((menuItem) => {
        return [APP_ROUTES_MenuTop[2].signout, APP_ROUTES_MenuTop[2].admin].every(
          (item) => item !== menuItem.href,
        );
      });
    }
  }

  render() {
    return `
          <ul class="navlist inline">
            <tc-menunavli 
              itemsmenunavli='${JSON.stringify(this.getItems())}'
            >
            </tc-menunavli>
          </ul>
    `;
  }
}

customElements.define('tc-menutopright', MenuTopRight);
