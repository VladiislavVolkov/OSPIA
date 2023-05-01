import { APP_EVENTS } from '../../../constants/appEvents';
import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';
import { getFormData } from '../../../utils/form';

import '../RegisterForm/RegisterForm.scss';

class SignInForm extends Component {
  onSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = getFormData(evt.target);
    eventEmitter.emit(APP_EVENTS.signIn, {
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
        <h2>Вход на сайт</h2>
        <form>

          <input name="email" type="emails" placeholder="Введите Email">

          <input name="password" type="password" placeholder="Введите пароль">

          <button type="submit" class="btn btn-primary">Выполнить вход</button>

        </form>

      </div>
    </div>

    `;
  }
}

customElements.define('signin-form', SignInForm);
