import { APP_EVENTS } from '../../../constants/appEvents';
import { APP_ROUTES_MenuTop } from '../../../constants/appRoutesMenuTop';
import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';
import { authService } from '../../../services/Auth';

import '../../molecules/Preloader';
import '../../organisms/RegisterForm';

class SignOutPage extends Component {
  componentDidMount() {
    authService
      .signOut()
      .then(() => {
        eventEmitter.emit(APP_EVENTS.changeRoute, { target: APP_ROUTES_MenuTop[2].signin });
        eventEmitter.emit(APP_EVENTS.authorizeUser, { user: null });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentWillUnmount() {}

  render() {
    return `
      <it-preloader is-loading="${JSON.stringify(true)}">
        <h1>You are signed out</h1>    
      </it-preloader> 
    `;
  }
}

customElements.define('signout-page', SignOutPage);
