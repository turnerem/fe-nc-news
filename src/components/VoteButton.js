import React, { Component } from 'react';
import * as api from './api';

class VoteButton extends Component {
  state = {
    isUpClicked: false,
    // upClickedOnce: false,
    isDownClicked: false,
    inc_votes: 0
  }
  
  componentDidUpdate = (prevProps, {isUpClicked, isDownClicked, inc_votes}) => {
    const { key, endpoint } = this.props.patch
    const anUpClick = (isUpClicked !== this.state.isUpClicked);
    const aDownClick = (isDownClicked !== this.state.isDownClicked);
    // console.log('prevState', prevState, 'currState', this.state)

    if (anUpClick || aDownClick) {
      // console.log('HAPPENING: upclick update', anUpClick, 'downclick update', aDownClick,
      // 'inc votes:', this.state.inc_votes)

      api.patchData(key, endpoint, { inc_votes: this.state.inc_votes })
        .then(response => {
          console.log('data from response', response)
        })
        .catch(err => console.log('an error', err))
      // handle success/ catch error (COLOURS) 
    }
  }
  
  render() {
    const { votes } = this.props
    const { isUpClicked, isDownClicked } = this.state;
    return (
      <span className='vote-buttons'>
        <button onClick={this.upVote}>
          <span role='img' aria-label={'clapping'}>👏</span>,
        </button>
        <button onClick={this.downVote}>
          <span role='img' aria-label={'thumbs down'}>👎:</span>,
        </button>
        <span>: {votes + 1 * (isUpClicked - isDownClicked)}</span>
      </span>
    );
  }
  
  upVote = () => {
    console.log('upclick')
    this.setState(({ isUpClicked, isDownClicked}) => {

      if (!isUpClicked && isDownClicked) {
        return { isUpClicked: false, isDownClicked:false, inc_votes: 1 }
      } else if (!isUpClicked && !isDownClicked) {
        return { isUpClicked: true, isDownClicked:false, inc_votes: 1 }
      } 
    })
  }

  downVote = () => {
    console.log('downclick')

    this.setState(({ isUpClicked, isDownClicked}) => {
      // const alreadyUpClicked = false
      if (!isDownClicked && isUpClicked) {
        return { isUpClicked: false, isDownClicked:false, inc_votes: -1 }
      } else if (!isDownClicked && !isUpClicked) {
        return { isUpClicked: false, isDownClicked:true, inc_votes: -1 }
      } 
    })
  }
}

export default VoteButton;