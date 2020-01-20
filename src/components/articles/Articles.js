import React, { Component } from 'react';
import * as api from '../api';
import SortDocs from '../SortDocs';
import ArtSmCard from './ArtSmCard';
import ErrorDisplay from '../ErrorDisplay';
import { debounce } from 'lodash';

class Articles extends Component {
  state = {
    errFlag: false,
    hasMore: true,
    isLoading: true,
    loadedArticles: [],

    p: 1,
    sort_by: 'created_at',
    order: 'desc'
  }

  componentDidMount() {
    this.fetchData()
    this.scrollEventListener();
  }

  componentDidUpdate(prevProps, {sort_by, order}) {
    const newSort = sort_by !== this.state.sort_by
    const newOrder = order !== this.state.order
    if ( newSort || newOrder ) { this.fetchData() }
  }
  
  render() {
    const { errFlag, err, hasMore, isLoading, loadedArticles } = this.state;
    return (
      <section className='data-list'>
        <h3 className='left'>Latest Articles</h3>
        <SortDocs handleSort={this.handleSort} areArticles={true} />
         <ul className='list-group'>
          {
            loadedArticles.map(article => {
              return <ArtSmCard article={article} key={loadedArticles.article_id}/>
            })
          }
        </ul>
        <hr />
        {errFlag && (<ErrorDisplay {...err} />)}
        {isLoading && <div>Loading...</div>}
        {!hasMore && (<div>No more articles.</div>)}
      </section>


    )
  }

  scrollEventListener = () => {
    document.querySelector('.data-list').addEventListener('scroll', this.handleScroll)
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = debounce((event) => {
    const docOffset = document.documentElement.offsetHeight;
    const windowInner = window.innerHeight;
    const docScrollTop = document.documentElement.scrollTop
    // 'LHS - RHS: ', window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight )
    const { errFlag, hasMore, isLoading } = this.state;

    if (errFlag || !hasMore || isLoading) return;
    if ((docOffset - windowInner - docScrollTop) < 500) {
        this.setState(({p}) => {
          return {p: p + 1}
        })
        this.fetchData()
      }
  }, 100)

  handleSort = (event) => {
    const { value } = event.target
    const newSort = value.split(' ')[0]
    const newOrder = value.split(' ')[1]
    this.setState({ sort_by: newSort, order: newOrder, p: 1 })

  }

  fetchData = () => {
    const { sort_by, order, p, loadedArticles } = this.state;
    const { topic } = this.props;
    const params = {sort_by, order, topic, p}

    api.getData('articles', 'articles', params, true)
      .then(({ articles, total_count }) => {
        const freshArticles = (p === 1) ? articles : [...loadedArticles, ...articles]
        this.setState({ 
          loadedArticles: freshArticles, 
          total_count, 
          isLoading: false,
          hasMore: freshArticles.length < total_count
        })
      })
      .catch(({ response }) => {
        const { msg } = response.data;
        const { status } = response
        this.setState({ err: { status, msg }, errFlag: true, isLoading: false})
      })
  }
}

export default Articles;