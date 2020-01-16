import React, { Component } from 'react';
import * as api from '../api';
import SortDocs from '../SortDocs';
import ArtSmCard from './ArtSmCard';
import ErrorDisplay from '../ErrorDisplay';

class Articles extends Component {
  state = {
    articles: [],
    params: {
      sort_by: 'created_at',
      order: 'desc',
      topic: this.props.topic,
      limit: this.props.limit
    },
    isLoading: true,
    err: {},
    errFlag: false
  }

  componentDidMount = () => {
    // axios request for 10 MOST RECENT articles
    const { params } = this.state;
    api.getData('articles', 'articles', params)
      .then((articles) => {
        this.setState({ articles, isLoading: false })
      })
      .catch(({ response }) => {
        const { msg } = response.data;
        const { status } = response
        // console.log(err.response, 'err after Art request')
        this.setState({ err: { status, msg }, errFlag: true, isLoading: false})
      })
  }
  
  render() {
    const { articles, isLoading, errFlag, err } = this.state;
    const { order } = this.state.params;
    console.log('THE ERROR IN ARTICLES', err)
    return isLoading ? <p className='loading-page'>Loading...</p>
      : (
        (errFlag) ? (<ErrorDisplay {...err} />)
        : (
          <div>
            <SortDocs handleClick={this.handleClick} order={order} />
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

  handleClick = (event) => {
    const { value } = event.target
    
    const { params } = this.state;
    const setKey = (['asc', 'desc'].includes(value)) ? 'order' : 'sort_by'
    params[setKey] = value;
    
    api.getData('articles', 'articles', params)
      .then((articles) => {
        this.setState({ articles, params })
      })   
  }
}

export default Articles;