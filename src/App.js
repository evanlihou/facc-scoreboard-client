import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AudienceDisplay from './matchStateComponents/audienceDisplay';
import AdminDisplay from './adminDisplay';

import openSocket from 'socket.io-client';

class App extends Component {
  // socket;
  constructor(props) {
    super(props);
    this.socket = openSocket('http://' + window.location.hostname + ':9000');
    window.io = this.socket.io;
  }
  state = { currentMatch: null };

  render() {
    return (
      <Switch>
        <Route
          path="/admin"
          component={() => (
            <AdminDisplay
              currentMatch={this.state.currentMatch}
              socket={this.socket}
            />
          )}
        />
        <Route
          path="/"
          component={() => (
            <AudienceDisplay
              currentMatch={this.state.currentMatch}
              socket={this.socket}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
