import { Component } from '../../../core/Component';
import { FIRESTORE_KEYS } from '../../../constants/firestoreKeys';
import { databaseService } from '../../../services/DatabaseService';

import '../../molecules/ArticleCard';

class ArticlePage extends Component {
  constructor() {
    super();
    this.state = {
      blog: [],
    };
  }

  static get observedAttributes() {
    return ['id'];
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
        blog: blogsFromDatabase.find((item) => item.id === this.props.id),
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
    const { images, title, description, id, heading } = this.state.blog;

    return `
      <main class="background_article">

        <article-card
          images='${images}'
          title='${title}'
          heading='${heading}'
          description='${description}'
          id='${id}'
        >
        </article-card>

      </main>
    `;
  }
}

customElements.define('article-page', ArticlePage);
