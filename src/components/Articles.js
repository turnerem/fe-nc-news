import React, { Component } from 'react';
import * as api from './api';
// import SortDocs from './SortDocs';
import ArtSmCard from './ArtSmCard';

class Articles extends Component {
  state = {
    articles: []
  }

  componentDidMount = () => {
    // axios request for 10 MOST RECENT articles
    const { params } = this.props;
    api.getData('articles', 'articles', params)
      .then((articles) => {
        this.setState({ articles })
      })
  }
  
  render() {
    const { articles } = this.state;
    return (
      <div>
        {/* <SortDocs /> */}
        <ul>
          {
            articles.map(article => {
              return <ArtSmCard article={article} key={article.article_id}/>
            })
          }
        </ul>
      </div>
    );
  }

  // reSort = (event) => {
  //   const { value } = event.target

  // }
}

export default Articles;