import { Component } from '../../../core/Component';
import { routes } from '../../../constants/routes';
import { databaseService } from '../../../services/DatabaseService';
import { FIRESTORE_KEYS } from '../../../constants/firestoreKeys';
import { eventEmitter } from '../../../core/EventEmitter';
import { APP_EVENTS } from '../../../constants/appEvents';

import '../../molecules/Preloader';
import '../../organisms/BlogList';
import '../../molecules/Pagination';

import './BlogPage.scss';

class BlogPage extends Component {
  constructor() {
    super();
    this.state = {
      limit: 7,
      currentPage: 1,
      blogs: [],
      isLoading: false,
    };
  }

  getBlogs = async () => {
    try {
      const blogsDatabase = await databaseService.getCollection(FIRESTORE_KEYS.blogs);
      this.setBlogs(blogsDatabase);
    } catch (error) {
      console.log(error);
    }
  };

  setBlogs = (blogsDatabase) => {
    this.setState((state) => {
      return {
        ...state,
        blogsDatabase,
        blogs: blogsDatabase,
      };
    });
  };

  sliceData(currentPage = 1) {
    const { limit } = this.state;
    const start = (currentPage - 1) * limit;
    const end = currentPage * limit;
    return this.state.blogs.slice(start, end);
  }

  onChangePaginationPage = (evt) => {
    this.setState((state) => {
      return {
        ...state,
        currentPage: Number(evt.detail.page),
      };
    });
    window.scrollTo(0, { behavior: 'smooth' });
  };

  componentDidMount() {
    this.getBlogs();
    this.sliceData();
    eventEmitter.on(APP_EVENTS.changePaginationPage, this.onChangePaginationPage);
  }

  componentWillUnmount() {
    this.getBlogs();
    this.sliceData();
    eventEmitter.off(APP_EVENTS.changePaginationPage, this.onChangePaginationPage);
  }

  render() {
    return `
      <it-preloader is-loading="${this.state.isLoading}">

        <tc-categoryname 
          categories="${routes.blog.name}"
          categoriesdescr="${routes.blog.description}"
          classname="${routes.blog.classname}"
          image="${routes.blog.image}"
        ></tc-categoryname>

        <main class="background_admin">

          <section class="sectionblog">
            
              <tc-bloglist 
                blogs='${JSON.stringify(this.sliceData(this.state.currentPage))}'>
              </tc-bloglist>

              <div class="sectionblog__pagination">
                <tc-pagination 
                  total='${this.state.blogs.length}'
                  limit='${this.state.limit}'
                  currentpage='${this.state.currentPage}'>
                </tc-pagination>
              </div>

          </section> 

        </main> 
          
      </it-preloader>    
    `;
  }
}

customElements.define('blog-page', BlogPage);
