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
        <button onClick={this.deleteToggle}>
          delete
        </button>
  
      )
    } else {
      return (
        <>
        <button onClick={this.deleteToggle}>
          undo
        </button>
        <button onClick={deleteComment}>
          definitely delete
        </button>
        </>
      )
    }

  }

  deleteToggle = () => {
    this.setState(({toDelete}) => {
      return { toDelete: !toDelete }
    })
  }

  // deleteAction = () => {
  //   this.setState(({toDelete}) => {
  //     if (!toDelete) {return { toDelete: true }}
  //   })
  // }
};

export default DeleteButton;