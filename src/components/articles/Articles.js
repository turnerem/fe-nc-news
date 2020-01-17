import React, { Component } from 'react';
import * as api from '../api';
import SortDocs from '../SortDocs';
import ArtSmCard from './ArtSmCard';
import ErrorDisplay from '../ErrorDisplay';

class Articles extends Component {
  state = {
    articles: [],
    total_count: 1,
    p: 1,
    sort_by: 'created_at',
    order: 'desc',
    isLoading: true,
    err: {},
    errFlag: false

  }

  componentDidMount = () => {
    // axios request for 10 MOST RECENT articles
    const { p, sort_by, order } = this.state;
    const { topic } = this.props;
    const params = {p, sort_by, order, topic}

    api.getData('articles', 'articles', params, true)
      .then(({ articles, total_count }) => {
        console.log(articles, 'articles from api')
        this.setState({ articles, total_count, isLoading: false })
      })
      .catch(({ response }) => {
        const { msg } = response.data;
        const { status } = response
        // console.log(err.response, 'err after Art request')
        this.setState({ err: { status, msg }, errFlag: true, isLoading: false})
      })
  }
  
  render() {
    const { articles, isLoading, errFlag, err, order } = this.state;
    return isLoading ? <p className='loading-page'>Loading...</p>
      : (
        errFlag ? (<ErrorDisplay {...err} />)
        : (
          <div>
            <SortDocs handleSortClick={this.handleSortClick} handlePageClick={this.handlePageClick} order={order} />
            {/* <ChangePage handleClick={this.handleClick}  /> */}
            <ul>
              {
                articles.map(article => {
                  return <ArtSmCard article={article} key={article.article_id}/>
                })
              }
            </ul>
          </div>

        )
    );
  }

  handleSortClick = (event) => {
    const { value } = event.target

    const { p, sort_by, order } = this.state;
    const { topic } = this.props;
    const params = {p, sort_by, order, topic}

    const setKey = (['asc', 'desc'].includes(value)) ? 'order' : 'sort_by'
    params[setKey] = value;

    api.getData('articles', 'articles', params)
      .then((articles) => {
        this.setState({ articles, p: 1, sort_by: params.sort_by, order: params.order })
      })   
  }


  handlePageClick = (event) => {
    const { value } = event.target

    const { p, sort_by, order } = this.state;
    const { topic } = this.props;
    const params = {p, sort_by, order, topic}

    let setKey = 'p'
    if (['asc', 'desc'].includes(value)) {
      setKey = 'order'
      params[setKey] = value;
    } else if (['created_at', 'comment_count', 'votes'].includes(value)) {
      setKey = 'sort_by'
      params[setKey] = value;
    } 
    
    api.getData('articles', 'articles', params)
      .then((articles) => {
        this.setState({ articles, p, sort_by, order })
      })   
  }

  // getSetArticles = ()
}

export default Articles;