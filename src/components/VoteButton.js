import React, { Component } from 'react';
import * as api from './api';

class VoteButton extends Component {
  state = {
    isClicked: false
  }

  render() {
    const { votes, emoji, label } = this.props
    const { isClicked } = this.state;
    return (
      <>
        <button onClick={this.upVote}>
          <span role='img' aria-label={label}>{emoji}:</span>
        </button>
        <span>: {isClicked ? votes + 1 : votes}</span>
      </>
    );
  }
  
  upVote = () => {
    const { key, id } = this.props.patch

    this.setState({ isClicked: true })
    api.patchData(key, `${key}/${id}`, { inc_votes: 1 })
    // handle success/ catch error (COLOURS)
  }
}

export default VoteButton;