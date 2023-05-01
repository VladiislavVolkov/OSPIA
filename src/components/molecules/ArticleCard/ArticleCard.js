import { FIRESTORE_KEYS } from '../../../constants/firestoreKeys';
import { Component } from '../../../core/Component';
import { databaseService } from '../../../services/DatabaseService';

import './ArticleCard.scss';
import '../../organisms/ArticleList';

class ArticleCard extends Component {
  constructor() {
    super();
    this.state = {
      randomblogs: [],
    };
  }

  static get observedAttributes() {
    return ['images', 'title', 'description', 'heading', 'id'];
  }

  getBlogs = async () => {
    try {
      const blogsFromDatabase = await databaseService.getCollection(FIRESTORE_KEYS.blogs);
      this.setBlogs(blogsFromDatabase);
    } catch (error) {
      console.error(error);
    }
  };

  setBlogs = (blogsFromDatabase) => {
    this.setState((state) => {
      return {
        ...state,
        randomblogs: blogsFromDatabase.sort(() => 0.5 - Math.random()).slice(0, 3),
      };
    });
  };

  componentDidMount() {
    this.getBlogs();
  }

  componentWillUnmount() {
    this.getBlogs();
  }

  render() {
    const { images, title, description, id, heading } = this.props;

    return `

      <section class="sectionarticle">

        <div class="sectionarticle__left">

          <div class="articleitem__category">${heading}</div>
          <div class="articleitem__title">${title}</div>

          
          <div class="articleitem__block">
            <div class="articleitem__block__one">
              <div class="articleitem__block__one__name">Рекомендуем к прочтению:</div>
              <tc-articlelist randomblogs='${JSON.stringify(
                this.state.randomblogs,
              )}'></tc-articlelist>
            </div>
          </div>

        </div>

        <div class="sectionarticle__right">

          <div class="articleitem">
            <div class="articleitem__img">
              <img class="image-fit" src='${images}'/>
            </div>
            <div class="articleitem__description">${description}</div>
          </div>

        </div>
  
      </section>
    
    `;
  }
}
customElements.define('article-card', ArticleCard);
