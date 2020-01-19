import React, { Component } from 'react';
import CommentCard from './CommentCard';
import PostComment from './PostComment';
import * as api from '../api'
import { debounce } from 'lodash';
import ErrorDisplay from '../ErrorDisplay';
import SortDocs from '../SortDocs';

class Comments extends Component {
  state = {
    errFlag: false,
    hasMore: true,
    isLoading: true,

    loadedDocs: [],
    
    p: 1,
    toDelete: null,
    countChange: 0

  }

  componentDidMount = () => {
    console.log('mounting')
    this.fetchData()
    this.scrollEventListener();
  }

  componentDidUpdate(prevProps, {sort_by, order}) {
    const newSort = sort_by !== this.state.sort_by
    const newOrder = order !== this.state.order
    if ( newSort || newOrder ) { this.fetchData() }
  }

  // componentDidUpdate = (prevProps, { comments }) => {
  //   if (comments.length > this.state.comments.length) {
  //     api.deleteData(`comments/${this.state.toDelete}`)
  //       .then((data) => {
  //       })
  //       .catch(err => {console.log('an err', err)})

  //     this.setState({ toDelete: null })
      
  //   }

  // }


  render() {
    const { errFlag, err, hasMore, isLoading, loadedDocs, countChange } = this.state;
    const { comment_count, loggedIn, user } = this.props;
    return (
      <section className='data-list'>
        <h4 className='left'>Comments</h4>
        <p className='left'># comments: {1 * comment_count + countChange}</p>
        {loggedIn && (<PostComment handlePost={this.handlePost} />)}
        
        <SortDocs handleSort={this.handleSort} />
        <ul className='card-list'>
           {loadedDocs.map((doc) => {
             return <CommentCard comment={doc} currentUser={user} key={`new_comment${Math.random}`} deleteComment={this.deleteComment}/>
           })}
        </ul>
        <hr />
        {errFlag && (<ErrorDisplay {...err} />)}
        {isLoading && <div>Loading...</div>}
        {!hasMore && (<div>No more comments.</div>)}
      </section>
      );
  }

  handlePost = (event) => {
    event.preventDefault();
    const { value } = event.target[0]
    if (value.length > 0) {
      const { currentUser } = this.state
      const { article_id } = this.props
      const userComment = {
        author: currentUser,
        body: value,
        created_at: Date.now(),
        votes: 0,
        article_id
      }
      this.setState(({loadedDocs, countChange}) => {
        const newDocs = [...loadedDocs]
        newDocs.unshift(userComment)        
        return { loadedDocs: newDocs, countChange: countChange + 1 }
      })
      this.postData(value)

    }
  }

  scrollEventListener = () => {
    console.log('in event listener')
    document.querySelector('.data-list').addEventListener('scroll', this.handleScroll)
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = debounce((event) => {
    const docOffset = document.documentElement.offsetHeight;
    const windowInner = window.innerHeight;
    const docScrollTop = document.documentElement.scrollTop
    
    console.log('difference: ', docOffset - windowInner - docScrollTop)
      // 'LHS - RHS: ', window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight )
    const { errFlag, hasMore, isLoading } = this.state;

    if (errFlag || !hasMore || isLoading) return;
    if ((docOffset - windowInner - docScrollTop) < 500) {
        console.log('condition met NOW - updating p')
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
    console.log('sortby', newSort, 'order', newOrder)

    this.setState({ sort_by: newSort, order: newOrder, p: 1 })
  }

  fetchData = () => {
    const { sort_by, order, p, loadedDocs } = this.state;
    console.log('page updating?', p)
    const { article_id, comment_count } = this.props;
    const params = { sort_by, order, p, limit: 5 }

    api.getData('comments', `articles/${article_id}/comments`, params)
      .then(({ comments }) => {
        const freshDocs = (p === 1) ? comments : [...loadedDocs, ...comments]
        console.log('tot articles on page now: ', freshDocs.length)
        this.setState({ 
          loadedDocs: freshDocs,  
          isLoading: false,
          hasMore: freshDocs.length < comment_count
        })
      })
      .catch(({ response }) => {
        const { msg } = response.data;
        const { status } = response
        this.setState({ err: { status, msg }, errFlag: true, isLoading: false})
      })
  }

  postData = (body) => {
    const { article_id } = this.props
    const { currentUser } = this.state
      
    const toPost = {username: currentUser, body}
    api.postData('comment', `articles/${article_id}/comments`, 
      toPost)
        .then(response => {
          console.log(response, 'response after posting')
        })
        .catch(err => console.log(err, 'err after post'))

  }

  deleteData = (id) => {
    console.log('back in comments with ', this.state.currentUser)
    this.setState((currentState) => {
      const { loadedDocs, countChange } = currentState;
      const newLoadedDocs = loadedDocs.filter(doc => {
        return doc[id] !== id
      })
      return { loadedDocs: newLoadedDocs, toDelete: id, countChange: countChange - 1}
    })
  }
}

export default Comments;