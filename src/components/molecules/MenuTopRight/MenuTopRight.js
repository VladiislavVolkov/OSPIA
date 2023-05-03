import { Component } from '../../../core/Component';
import { appPagesMenuTop } from '../../../constants/appPagesMenuTop';
import { ADMIN } from '../../../constants/userRoles';
import { APP_ROUTES_MenuTop } from '../../../constants/appRoutesMenuTop';

import '../../atoms/MenuNavLi';

import './MenuTopRight.scss';
import { APP_EVENTS } from '../../../constants/appEvents';
import { eventEmitter } from '../../../core/EventEmitter';
import { authService } from '../../../services/Auth';

class MenuTopRight extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      user: null,
    };
  }

  static get observedAttributes() {
    return ['user'];
  }

  getItems() {
    const user = this.state.user;

    if (user) {
      if (user.email === ADMIN) {
        return appPagesMenuTop[1].filter((menuItem) => {
          return [APP_ROUTES_MenuTop[2].signup, APP_ROUTES_MenuTop[2].signin].every(
            (item) => item !== menuItem.href,
          );
        });
      } else {
        return appPagesMenuTop[1].filter((menuItem) => {
          return [
            APP_ROUTES_MenuTop[2].signup,
            APP_ROUTES_MenuTop[2].signin,
            APP_ROUTES_MenuTop[2].admin,
          ].every((item) => item !== menuItem.href);
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

  async authorizeUser() {
    try {
      const user = await authService.authorizeUser();
      this.setUser(user);
    } catch (error) {
      console.error(error);
    }
  }

  onAuthorizeUser = ({ detail }) => {
    this.setUser(detail.user);
  };

  setUser(user) {
    this.setState((state) => {
      return {
        ...state,
        user,
      };
    });
  }

  componentDidMount() {
    this.authorizeUser();
    eventEmitter.on(APP_EVENTS.authorizeUser, this.onAuthorizeUser);
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
