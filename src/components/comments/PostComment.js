import React, { Component } from 'react';

class PostComment extends Component {
  state = {
    textBox: ''
  }
  render() {
    // const { textBox } = this.state;
    const { handlePost } = this.props
    return (
      <form onSubmit={handlePost}>
        <label>post comment<textarea onChange={this.handleTextInput} className='b-form-control' rows='3'></textarea></label>
        <button type='submit'>post</button>
      </form>
    );
  }

  handleTextInput = (event) => {
    const { value } = event.target;
    this.setState(({textBox}) => {
      return { textBox: textBox + value }
    })
  }
}

export default PostComment;