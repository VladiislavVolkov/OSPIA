import { appPagesMenuTop } from '../../../constants/appPagesMenuTop';
import { Component } from '../../../core/Component';

import './Footer.scss';

class Footer extends Component {
  render() {
    return `
      <footer>
        <div class="footer">

          <div class="footer__top">
            <div class="footer__column">
              <div class="footer__item2">Рады видеть Вас в нашем магазине "OSPIA"!</div>
              <div class="footer__item3">"OSPIA" - Online Shop Project IT Academy.</div>
            </div>
          </div>

          <div class="footer__center">
          
            <div class="footer__column">
              <div class="footer__item">Покупателям</div>
              <ul class="footer__ul">
                <li class="footer__li">
                  <router-link to="${appPagesMenuTop[2][0].href}">
                    <a title="${appPagesMenuTop[2][0].label}">${appPagesMenuTop[2][0].label}</a> 
                  </router-link>  
                </li>
                <li class="footer__li">
                  <router-link to="${appPagesMenuTop[2][2].href}">
                    <a title="${appPagesMenuTop[2][2].label}">${appPagesMenuTop[2][2].label}</a> 
                  </router-link>  
                </li>
              </ul>
            </div>

            <div class="footer__column">
              <div class="footer__item">Интересное</div>
              <ul class="footer__ul">
                <li class="footer__li">
                  <router-link to="${appPagesMenuTop[2][1].href}">
                    <a title="${appPagesMenuTop[2][1].label}">${appPagesMenuTop[2][1].label}</a> 
                  </router-link>  
                </li>
              </ul>
            </div>

            <div class="footer__column">
              <div class="footer__item">Информация</div>
              <ul class="footer__ul">
                <li class="footer__li">
                  <router-link to="${appPagesMenuTop[0][0].href}">
                    <a title="${appPagesMenuTop[0][0].label}">${appPagesMenuTop[0][0].label}</a> 
                  </router-link>  
                </li>
              </ul>
            </div>

            <div class="footer__column">
              <div class="footer__item">Платежные системы</div>
              <ul class="footer__ul paycard">
                <li class="footer__li">
                  <img src="https://cdn2.divan.ru/app/v1/node/website/4320a54ad9162a8d965f.svg" class="" alt="">
                </li>
                <li class="footer__li">
                  <img src="https://cdn2.divan.ru/app/v1/node/website/f2f36f0632b5d6439493.svg" class="" alt="">
                </li>
                <li class="footer__li">
                  <img src="https://cdn2.divan.ru/app/v1/node/website/8e3ad2fac3e49065a427.svg" class="" alt="">
                </li>
              </ul>
            </div>

          </div>

          <div class="footer__bottom">
            <div class="footer__bottom__left">© 2023. OSPIA. Сreator: Uladzilau Volkau</div>
            <div class="footer__bottom__right">
              <ul class="footer__bottom__ul">
                <li class="footer__li">info@ospia.ospia</li>
              </ul>
            </div>
          </div>

        </div>

      </footer>
    `;
  }
}

customElements.define('tc-footer', Footer);
