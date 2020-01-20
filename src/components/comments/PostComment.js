import React, { Component } from 'react';

class PostComment extends Component {
  state = {
    textBox: ''
  }
  render() {
    const { handlePost, newPost } = this.props
    const { textBox } = this.state
    // submittedPost && this.setState({ textBox: '' })
    // console.log('HANDLING POST')
    return (
      <form onSubmit={(event) => {
          event.preventDefault()
          handlePost(textBox)
        }}>
        <textarea placeholder='leave a comment' onChange={this.handleTextInput} value={newPost} className='comment-form' rows='4' cols='60'></textarea>
        <button type='submit' className='post-comment'>post</button>
      </form>
    );
  }

  handleTextInput = (event) => {
    const { value } = event.target;
    this.setState({ textBox: value })
  }
}

export default PostComment;