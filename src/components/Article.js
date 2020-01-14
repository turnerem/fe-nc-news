import React, { Component } from 'react';
import * as api from './api';
import ArtBigCard from './ArtBigCard';

class Article extends Component {
  state = {
    article: null,
    comments: []
  }


  componentDidMount = () => {
    const { article_id } = this.props;
    api.getData('article', `articles/${article_id}`)
      .then((article) => {
        console.log(article)
        this.setState({ article })
      })
    api.getData('comments', `articles/${article_id}/comments`)
      .then((comments) => {
        console.log(comments)
        this.setState({ comments })
      })
    // console.log(this.props, 'props in article')
  }

  render() {
    const { article, comments } = this.state;
    return (
      <div>
        <ArtBigCard article={article} />
        {/* < */}
      </div>
    );
  }
}

export default Article;