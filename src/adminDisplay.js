import React, { Component } from 'react';

import { Button, Menu } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

class AdminDisplay extends Component {
  // static contextTypes = {
  //   router: React.PropTypes.object
  // };

  constructor(props) {
    super(props);
    // subscribeToMatchUpdates(updatedMatch =>
    //   this.setState({ currentMatch: updatedMatch })
    // );
    // var socket = this.props.socket;
  }
  state = { currentMatch: null };

  componentWillMount(props) {
    this.setState({ currentMatch: this.props.currentMatch });
    this.props.socket.on('updateMatch', updatedMatch => {
      console.log('UPDATE');
      this.setState({ currentMatch: updatedMatch });
    });
  }

  updateMatch = object => {
    return () => {
      this.props.socket.emit('updateMatch', {
        ...object,
        _id: this.state.currentMatch._id
      });
    };
  };

  newMatch = () => {
    this.props.socket.emit('newMatch');
  };

  render() {
    return (
      <div id="adminDisplay">
        <Button
          onClick={this.updateMatch({
            matchStatus: 'posted'
          })}
        >
          Post Scores
        </Button>
        <Button onClick={this.newMatch}>New Match</Button>
      </div>
    );
  }
}

export default AdminDisplay;
