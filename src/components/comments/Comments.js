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
    countChange: 0,
    newId: 1

  }

  componentDidMount = () => {
    console.log('mounting')
    this.fetchData()
    this.scrollEventListener();
  }

  componentDidUpdate(prevProps, {sort_by, order, loadedDocs}) {
    const newSort = sort_by !== this.state.sort_by
    const newOrder = order !== this.state.order
    if ( newSort || newOrder ) { this.fetchData() }
 
    // const lessArticlesNow = this.state.loadedDocs.length < loadedDocs.length
    // if (lessArticlesNow ) {this.deleteData()}
    
    const moreArticlesNow = this.state.loadedDocs.length > loadedDocs.length
    const newDoc = this.state.loadedDocs[0];
    if (moreArticlesNow) {
      this.postData(newDoc)
      
    }
    
  }

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
             return <CommentCard comment={doc} user={user} key={doc.comment_id} deleteDataView={this.deleteDataView}/>
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
      const { article_id, user } = this.props
      const {newId} = this.state;
      const userCommentView = {
        author: user,
        body: value,
        created_at: Date.now(),
        votes: 0,
        comment_id: 10000 + newId,
        article_id
      }
      this.setState(({loadedDocs, countChange}) => {
        const newDocs = [...loadedDocs]
        newDocs.unshift(userCommentView)        
        return { loadedDocs: newDocs, countChange: countChange + 1, newId: newId + 1 }
      })
      

    }
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
    const { sort_by, order, p, loadedDocs } = this.state;
    const { article_id, comment_count } = this.props;
    const params = { sort_by, order, p, limit: 5 }

    api.getData('comments', `articles/${article_id}/comments`, params)
      .then(({ comments }) => {
        const freshDocs = (p === 1) ? comments : [...loadedDocs, ...comments]
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
    const { article_id, user } = this.props
      
    const toPost = {username: user, body}
    api.postData('comment', `articles/${article_id}/comments`, 
      toPost)
        // .then(response => {
        //   console.log(response, 'response after posting')
        // })
        .catch(err => <ErrorDisplay {...err}/>)

  }


  deleteDataView = (id) => {
    this.setState((currentState) => {
      const { loadedDocs, countChange } = currentState;
      const newLoadedDocs = loadedDocs.filter(doc => {
        return doc.comment_id !== id
      })
      return { loadedDocs: newLoadedDocs, toDelete: id, countChange: countChange - 1}
    })

    api.deleteData(`comments/${id}`)
      // .then(() => {
      //   console.log('deleted. do something with colours here')
      // })
      .catch(err => <ErrorDisplay {...err} />)
    this.setState({ toDelete: null })   

  }

  // deleteData = (id) => {
  //   api.deleteData(`comments/${id}`)
  //     // .then(() => {
  //     //   console.log('deleted. do something with colours here')
  //     // })
  //     .catch(err => <ErrorDisplay {...err} />)
  //   this.setState({ toDelete: null })    
  // }
  
}

export default Comments;