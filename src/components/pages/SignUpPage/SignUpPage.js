import { APP_EVENTS } from '../../../constants/appEvents';
import { APP_ROUTES_MenuTop } from '../../../constants/appRoutesMenuTop';
import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';
import { authService } from '../../../services/Auth';

import '../../molecules/Preloader';
import '../../organisms/RegisterForm';

class SignUpPage extends Component {
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

  register = async ({ detail }) => {
    const { data } = detail;
    this.setIsLoading(true);
    try {
      const user = await authService.signUp(data.email, data.password);
      eventEmitter.emit(APP_EVENTS.authorizeUser, { user });
      eventEmitter.emit(APP_EVENTS.changeRoute, { target: APP_ROUTES_MenuTop[0].main });
    } catch (error) {
      console.log(error);
      this.setError(error.message);
    } finally {
      this.setIsLoading(false);
    }
  };

  componentDidMount() {
    eventEmitter.on(APP_EVENTS.signUp, this.register);
  }
  componentWillUnmount() {
    eventEmitter.off(APP_EVENTS.signUp, this.register);
  }

  render() {
    const message = this.state.errorMessage;
    return `
      <it-preloader is-loading="${this.state.isLoading}">
        ${message ? `<div class="">${message}</div>` : ''}

        <register-form></register-form>
        
      </it-preloader>    
    `;
  }
}

customElements.define('signup-page', SignUpPage);
