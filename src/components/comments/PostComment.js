import React, { Component } from 'react';

class PostComment extends Component {
  state = {
    textBox: ''
  }
  render() {
    // const { textBox } = this.state;
    const { handlePost, submittedPost } = this.props
    // submittedPost && this.setState({ textBox: '' })
    submittedPost && this.setState({ textBox: '' })
    return (
      <form onSubmit={handlePost}>
        <label>post comment<textarea onChange={this.handleTextInput} value={this.state.textBox} className='b-form-control' rows='3'></textarea></label>
        <button type='submit'>post</button>
      </form>
    );
  }

  handleTextInput = (event) => {
    const { value } = event.target;
    this.setState({ textBox: value })
  }
}

export default PostComment;