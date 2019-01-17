import React, { Component } from 'react';

import { Button, Form, Container, Message } from 'semantic-ui-react';
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

  changeField = (e, data) => {
    this.props.socket.emit('updateMatch', {
      [data.name]: data.value,
      _id: this.state.currentMatch._id
    });
  };

  render() {
    return (
      <Container id="adminDisplay">
        <Message info>
          <b>
            NOTE: Values here should be counts (e.g.: number of hatches), not
            the point values. Point values will be calculated
          </b>
        </Message>
        <Button
          onClick={this.updateMatch({
            matchStatus: 'posted'
          })}
        >
          Post Scores
        </Button>
        <Button onClick={this.newMatch}>New Match</Button>

        {this.state.currentMatch && (
          <Form>
            <Form.Group>
              <Form.Input
                name="matchType"
                label="Match Type"
                onChange={this.changeField}
                value={this.state.currentMatch.matchType}
              />
              <Form.Input label="Match Number" />
            </Form.Group>
            <Form.Group>
              <Form.TextArea label="Teams" />
            </Form.Group>
          </Form>
        )}
      </Container>
    );
  }
}

export default AdminDisplay;
