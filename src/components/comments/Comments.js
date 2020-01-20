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
    newId: 1,
    // newComment: false,

    newPost: ''

  }

  componentDidMount = () => {
    this.fetchData()
    this.scrollEventListener();
  }

  componentDidUpdate(prevProps, {sort_by, order, newPost, toDelete}) {
    console.log('COMPONENTDIDUPDATE? new comment?: ', this.state.newPost)
    const newSort = sort_by !== this.state.sort_by
    const newOrder = order !== this.state.order
    if ( newSort || newOrder ) { this.fetchData() }
 
    const newDeleteId = this.state.toDelete
    const somethingToDelete = newDeleteId !== toDelete;
    if (somethingToDelete) {this.deleteData(newDeleteId)}

    
    const newNewPost = this.state.newPost;
    const somethingToPost = (newPost !== '')
    if ( somethingToPost ) {
      this.postData(newNewPost)
      // this.setState({newPost: ''})
      // this.fetchData()
    }
  }

  render() {
    const { errFlag, err, hasMore, isLoading, loadedDocs, countChange, newPost } = this.state;
    const { comment_count, loggedIn, user } = this.props;
    return (
      <section className='data-list'>
        <h4 className='left'>Comments</h4>
        <p className='left'># comments: {1 * comment_count + countChange}</p>
        {loggedIn && (<PostComment handlePost={this.handlePost} />)}
        
        <SortDocs handleSort={this.handleSort} />
        <ul className='card-list'>
           {loadedDocs.map((doc, i) => {
             return <CommentCard comment={doc} user={user} key={i} newPost={newPost} deleteDataView={this.deleteDataView} idxToDelete={i}/>
           })}
        </ul>
        <hr />
        {errFlag && (<ErrorDisplay {...err} />)}
        {isLoading && <div>Loading...</div>}
        {!hasMore && (<div>No more comments.</div>)}
      </section>
      );
  }

  handlePost = (textBox) => {
    // event.preventDefault();
    console.log('\n\n\nSET STATE new value', textBox) 
    if (textBox.length > 0) {
      const { user } = this.props
      const {newId} = this.state;
      const userCommentView = {
        author: user,
        body: textBox,
        created_at: Date.now(),
        votes: 0,
        comment_id: 10000 + newId
      }
      this.setState(({loadedDocs, countChange}) => {
        const newDocs = [...loadedDocs]
        newDocs.unshift(userCommentView)    

        return { loadedDocs: newDocs, countChange: countChange + 1, newId: newId + 1, newPost: textBox }
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
    // const { loadedDocs } = this.state
      
    const newPost = {username: user, body}
    console.log('POST setting new state', newPost)
    api.postData('comment', `articles/${article_id}/comments`, 
      newPost)
        .then(newPost => {
          this.setState(({loadedDocs}) => {
            // const {  } = currentState;
            return { loadedDocs: [newPost, ...loadedDocs.slice(1)], newPost: ''}
          })
        })
        .catch(err => <ErrorDisplay {...err}/>)

  }


  deleteDataView = (idx) => {
    this.setState(({ loadedDocs, countChange }) => {
      const toDelete = loadedDocs[idx].comment_id;
      loadedDocs.splice(idx, 1)
      
      return { loadedDocs, toDelete, countChange: countChange - 1}
      
    })

    
  }

  deleteData = (id) => {
    api.deleteData(`comments/${id}`)
      .then(() => {
        
        console.log('DELETE deleted. do something with colours here')
      })
      .catch(err => <ErrorDisplay {...err} />)
    
  }

}

export default Comments;