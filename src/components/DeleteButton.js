import React, {Component} from 'react';

class DeleteButton extends Component {
  state = {
    toDelete: false,
    deleteConfirmed: false
  }
  render () {
    const { toDelete } = this.state;
    const { deleteComment } = this.props;
    if (!toDelete) {
      return (
        <button onClick={this.deleteToggle} className='delete-button'>
          delete
        </button>
  
      )
    } else {
      return (
        <div className='def-delete'>
        <button onClick={this.deleteToggle} className='no-delete'>
          undo
        </button>
        <button onClick={deleteComment} className='yes-delete'>
          definitely delete
        </button>
        </div>
      )
    }

  }

  deleteToggle = () => {
    this.setState(({toDelete}) => {
      return { toDelete: !toDelete }
    })
  }
};

export default DeleteButton;