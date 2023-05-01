import { Component } from '../../../core/Component';
import '../../molecules/Blog';

class BlogList extends Component {
  static get observedAttributes() {
    return ['blogs', 'page'];
  }

  render() {
    const blogs = JSON.parse(this.props.blogs);

    return `
    <div class="sectionblog__archive">
        ${blogs
          .map((item) => {
            return `
                <tc-blog 
                    images='${item.images}'
                    title='${item.title}'
                    heading='${item.heading}'
                    description='${item.description}'
                    id='${item.id}'
                    page='${this.props.page}'
                ></tc-blog>
            `;
          })
          .join('')}</div>
        `;
  }
}

customElements.define('tc-bloglist', BlogList);
