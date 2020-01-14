import React, { Component } from 'react';

class Comments extends Component {
  state = {
    comments: []
  }

  componentDidMount = () => {

  }
  render() {
    // if (only renderig some comments) {do this}
    // else {do that}
    console.log(this.props)
    return (
      <div>
        <h2>Article Name</h2>
        <h3>Comments</h3>
      </div>
    );
  }
}

export default Comments;