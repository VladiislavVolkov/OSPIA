import { APP_EVENTS } from '../../../constants/appEvents';
import { Component } from '../../../core/Component';
import { eventEmitter } from '../../../core/EventEmitter';

class Blog extends Component {
  static get observedAttributes() {
    return ['images', 'title', 'description', 'heading', 'id', 'page'];
  }

  clickBlog = (evt) => {
    if (
      evt.target.closest('.article__top__one__title') ||
      evt.target.closest('.article__bottom__button') ||
      evt.target.closest('.article__top__main__left__title') ||
      evt.target.closest('.article__top__main__right')
    ) {
      eventEmitter.emit(APP_EVENTS.changeRoute, { target: `/article/${this.props.id}` });
      window.scrollTo(0, { behavior: 'smooth' });
    }
  };

  componentDidMount() {
    this.addEventListener('click', this.clickBlog);
  }

  componentWillUnmount() {
    this.removeEventListener('click', this.clickBlog);
  }

  render() {
    const { images, title, heading } = this.props;
    const mainPage = this.props.page === 'main';

    return `
      <article class="sectionblog__archive__article">
        <div class="article">
          <div class="article__top">
            <div class="article__top__image">
              <img src='${images}'/>
            </div>
            

            ${
              !mainPage
                ? `<div class="article__top__one">
                    <div class="article__top__one__heading">
                      ${heading}
                    </div>
                    <div class="article__top__one__title">
                      <a href='#'>${title}</a>
                    </div>
                  </div> `
                : `<div class="article__top__main">
                    <div class="article__top__main__left">
                      <div class="article__top__main__left__heading">
                        ${heading}
                      </div>
                      <div class="article__top__main__left__title">
                        <a href='#'>${title}</a>
                      </div>
                    </div>  
                    <div class="article__top__main__right">
                      <a href='#'><img src='../assets/images/ico__left.png'/></a>
                    </div>
                  </div>`
            }

          </div> 
          ${
            mainPage
              ? ``
              : `<div class="article__bottom">
                  <div class="article__bottom__button"><a href='#'>читать статью ></a></div>
                </div> `
          } 
          
        </div>  
      </article>
        `;
  }
}

customElements.define('tc-blog', Blog);
