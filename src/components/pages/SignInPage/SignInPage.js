import { APP_EVENTS } from '../../../constants/appEvents';
import { APP_ROUTES_MenuTop } from '../../../constants/appRoutesMenuTop';
import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';
import { authService } from '../../../services/Auth';

import '../../molecules/Preloader';
import '../../organisms/SignInForm';

class SignInPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      errorMessage: '',
    };
  }

  setIsLoading = (isLoading) => {
    this.setState((state) => {
      return {
        ...state,
        isLoading,
      };
    });
  };

  setError(error) {
    this.setState((state) => {
      return {
        ...state,
        errorMessage: error,
      };
    });
  }

  signIn = async ({ detail }) => {
    const { data } = detail;
    this.setIsLoading(true);
    try {
      const user = await authService.signIn(data.email, data.password);
      eventEmitter.emit(APP_EVENTS.authorizeUser, { user });
      eventEmitter.emit(APP_EVENTS.changeRoute, { target: APP_ROUTES_MenuTop[0].main });
    } catch (error) {
      this.setError(error.message);
    } finally {
      this.setIsLoading(false);
    }
  };

  componentDidMount() {
    eventEmitter.on(APP_EVENTS.signIn, this.signIn);
  }

  componentWillUnmount() {
    eventEmitter.off(APP_EVENTS.signIn, this.signIn);
  }

  render() {
    const message = this.state.errorMessage;
    return `

      <it-preloader is-loading="${this.state.isLoading}">

        ${message ? `<div class="">${message}</div>` : ''}
        <signin-form></signin-form>

      </it-preloader>    

    `;
  }
}

customElements.define('signin-page', SignInPage);
