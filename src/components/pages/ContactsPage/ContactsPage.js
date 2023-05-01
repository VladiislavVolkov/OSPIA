import { Component } from '../../../core/Component';
import { routes } from '../../../constants/routes';

import '../../molecules/CategoryName';

import './ContactsPage.scss';

class ContactsPage extends Component {
  render() {
    return `

    <tc-categoryname 
      categories="${routes.info.name}"
      categoriesdescr="${routes.info.description}"
      classname="${routes.info.classname}"
      image="${routes.info.image}"
    ></tc-categoryname>

    <section class="sectioncontacts">
      <div class="sectioncontacts__section">
        <div class="sectioncontacts__section__top">
          Наш адрес:
        </div> 
        <div class="sectioncontacts__section__map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.933726331374!2d30.92163130144457!3d52.40502180724094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d4420ee52c299d%3A0xac82f082a203ca76!2z0KDQtdGH0LjRhtC60LjQuSDQv9GA0L7RgdC_LiA4MCwg0JPQvtC80LXQu9GM!5e0!3m2!1sru!2sby!4v1682934850462!5m2!1sru!2sby" width="100%" height="350"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div> 
        </div>
    </section> 

    `;
  }
}

customElements.define('contacts-page', ContactsPage);
