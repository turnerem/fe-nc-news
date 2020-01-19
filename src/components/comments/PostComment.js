import React, { Component } from 'react';

class PostComment extends Component {
  state = {
    textBox: ''
  }
  render() {
    const { handlePost } = this.props
    // submittedPost && this.setState({ textBox: '' })
    return (
      <form onSubmit={handlePost}>
        <textarea placeholder='leave a comment' onChange={this.handleTextInput} value={this.state.textBox} className='comment-form' rows='4' cols='60'></textarea>
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