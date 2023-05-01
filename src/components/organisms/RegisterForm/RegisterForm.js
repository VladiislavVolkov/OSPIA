import { APP_EVENTS } from '../../../constants/appEvents';
import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';
import { getFormData } from '../../../utils/form';

import './RegisterForm.scss';

class RegisterForm extends Component {
  onSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = getFormData(evt.target);
    eventEmitter.emit(APP_EVENTS.signUp, {
      data: {
        email,
        password,
      },
    });
  };

  componentDidMount() {
    this.addEventListener('submit', this.onSubmit);
  }

  componentWillUnmount() {
    this.removeEventListener('submit', this.onSubmit);
  }

  render() {
    return `
      <div class="login">
        <div class="formlogin">
          <h2>Регистрация на сайте</h2>
          <form>

            <input name="email" type="emails" placeholder="E-mail">

            <input name="password" type="password" placeholder="Придумайте пароль">

            <input name="confirm-password" type="password" placeholder="Повторите пароль">

            <button type="submit" class="btn btn-primary">Зарегистрироваться</button>

          </form>

        </div>
      </div>
    `;
  }
}

customElements.define('register-form', RegisterForm);
