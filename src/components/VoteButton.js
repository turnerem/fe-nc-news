import React, { Component } from 'react';
import * as api from './api';

class VoteButton extends Component {
  state = {
    inc_votes: 0
  }
  
  componentDidUpdate = (prevProps, {inc_votes}) => {
    const { key, endpoint } = this.props.patch
    const voted = (inc_votes !== this.state.inc_votes);
    if (voted) {
      api.patchData(key, endpoint, { inc_votes: this.state.inc_votes })
        .then(response => {
          
          return
        })
        .catch(err => console.log('an error', err))
      // handle success/ catch error (COLOURS) 
    }
  }
  
  render() {
    const { votes } = this.props
    const { inc_votes } = this.state;
    return (
      <div className='vote-buttons'>
        <button onClick={() => this.aVote(1)} className='vote-button'>
          <span role='img' aria-label={'clapping'}> 👏 </span>
        </button>
        <span className='vote-count'> {votes + inc_votes} </span>
        <button onClick={() => this.aVote(-1)} className='vote-button'>
          <span role='img' aria-label={'thumbs down'}> 👎 </span>
        </button>
      </div>
    );
  }
  
  aVote = (voteDir) => {
    this.setState(({ inc_votes}) => {
      const total = inc_votes + voteDir;
      if (total > 1) return {inc_votes : 1}
      else if (total < -1) return {inc_votes: -1}
      else return {inc_votes: total}
    })
  }

}

export default VoteButton;