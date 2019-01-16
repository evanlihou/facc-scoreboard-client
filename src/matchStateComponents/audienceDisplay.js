import React, { Component } from 'react';

import '../images/bg.jpg';
import '../images/rocket.jpg';
import '../Scoreboard.css';

// import { subscribeToMatchUpdates } from '../socket';
import ScoresPosted from './scoresPosted';
import MatchTimer from './matchTimer';

class AudienceDisplay extends Component {
  constructor(props) {
    super(props);
    // subscribeToMatchUpdates(updatedMatch =>
    //   this.setState({ currentMatch: updatedMatch })
    // );
    // state.currentMatch = this.props.currentMatch;
  }
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
    if (currentMatch) {
      return (
        <div className="app">
          <div id="background" />
          <div id="rocket" />
          <div id="MatchInfo">
            <span id="eventName">{currentMatch.eventName}</span>
            <span id="matchName">
              {currentMatch.matchType + ' ' + currentMatch.matchNumber}
            </span>
          </div>
          {
            {
              posted: <ScoresPosted currentMatch={currentMatch} />,
              pending: <h1>Match is Pending</h1>,
              inProgress: <MatchTimer currentMatch={currentMatch} />,
              eStop: <h1 className="red">EMERGENCY STOP</h1>
            }[currentMatch.matchStatus]
          }
        </div>
      );
    } else {
      return 'loading';
    }
  }
}

export default AudienceDisplay;
