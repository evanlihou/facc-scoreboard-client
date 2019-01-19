import React, { Component } from 'react';

import '../images/bg.jpg';
import '../images/rocket.jpg';
import '../Scoreboard.css';

import ScoresPosted from './scoresPosted';
import MatchTimer from './matchTimer';

class AudienceDisplay extends Component {
  state = {
    currentMatch: null
  };
  componentWillMount(props) {
    this.setState({ currentMatch: this.props.currentMatch });
    this.props.socket.on('updateMatch', updatedMatch => {
      console.log('UPDATE', updatedMatch);
      this.setState({ currentMatch: updatedMatch });
    });
  }
  render() {
    let currentMatch = this.state.currentMatch;
    return (
      <div className="app">
        <div id="background" />
        <div id="rocket" />
        {!this.props.socket.connected ? (
          <h1 className="red">Not connected to websocket</h1>
        ) : null}
        {currentMatch ? (
          <div>
            <div id="MatchInfo">
              <span id="eventName">{currentMatch.eventName}</span>
              <span id="matchName">
                {currentMatch.matchType + ' ' + currentMatch.matchNumber}
              </span>
            </div>
            {
              {
                posted: <ScoresPosted currentMatch={currentMatch} />,
                pending: (
                  <div>
                    <h1>Match is Pending</h1>
                    <div id="scoreInfo" style={{ marginTop: '5%' }}>
                      <div id="redBox" style={{ minWidth: '20%' }}>
                        <div className="teams">
                          Teams
                          <ul>
                            {currentMatch.redAlliance.teams.map(team => (
                              <li key={team}>{team}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div id="blueBox" style={{ minWidth: '20%' }}>
                        <div className="teams">
                          Teams
                          <ul>
                            {currentMatch.blueAlliance.teams.map(team => (
                              <li key={team}>{team}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
                inProgress: (
                  <MatchTimer
                    currentMatch={currentMatch}
                    socket={this.props.socket}
                  />
                ),
                eStop: <h1 className="red">EMERGENCY STOP</h1>
              }[currentMatch.matchStatus]
            }
          </div>
        ) : (
          <h1 className="lonelyH1">No current match</h1>
        )}
      </div>
    );
  }
}

export default AudienceDisplay;
