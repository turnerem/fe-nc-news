import React, { Component } from 'react';
import * as api from './api';
// import SortDocs from './SortDocs';
import ArtSmCard from './ArtSmCard';

class Articles extends Component {
  state = {
    articles: [],
    params: this.props.params
  }

  componentDidMount = () => {
    // axios request for 10 MOST RECENT articles
    const { params } = this.state;
    api.getArticles(params)
      .then((articles) => {
        this.setState({ articles })
        console.log(typeof articles[0].created_at, 'date type')

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