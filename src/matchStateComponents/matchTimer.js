import React, { Component } from 'react';
// import Moment from 'moment';
const moment = require('moment');

class MatchTimer extends Component {
  state = {
    // currentMatch: null,
    startedAtMoment: null,
    matchState: null
  };
  componentWillMount(props) {
    // console.log(moment());
    // this.setState({ currentMatch: this.props.currentMatch });
    this.setState({
      // currentMatch: updatedMatch,
      startedAtMoment: moment(this.props.currentMatch.startedAt)
    });
    this.props.socket.on('updateMatch', updatedMatch => {
      // console.log('UPDATEEEE', updatedMatch);
      // console.log(updatedMatch.startedAt);
      // console.log(moment(updatedMatch.startedAt));
      this.setState({
        // currentMatch: updatedMatch,
        startedAtMoment: moment(updatedMatch.startedAt)
      });
      // console.log(this.state.startedAtMoment);
    });
  }

  componentDidMount() {
    let gameTime;
    let tMinus;
    setInterval(() => {
      gameTime = moment
        .duration(moment().diff(this.state.startedAtMoment))
        .as('seconds');
      tMinus = 150 - gameTime;
      if (gameTime < 0) {
        this.setState({ matchState: 'Ready' });
      } else if (tMinus < 150 && tMinus > 135) {
        this.setState({ matchState: 'Sandstorm' });
      } else if (tMinus < 135 && tMinus > 0) {
        this.setState({ matchState: 'Normal Play' });
      } else if (tMinus <= 0) {
        this.setState({ matchState: 'Scores Pending' });
      }
      this.forceUpdate();
    }, 50);
  }

  render() {
    if (this.props.currentMatch && this.state.startedAtMoment) {
      let gameTime = moment
        .duration(moment().diff(this.state.startedAtMoment))
        .as('seconds')
        .toFixed(2);
      let tMinus = 150 - gameTime;
      return (
        <div>
          <h1 className="big">
            {this.state.matchState}
            <br />

            {this.state.matchState === 'Ready' ? (
              <span>
                {Math.floor(gameTime)}
                <small>
                  {String(
                    Number.parseFloat(gameTime - Math.floor(gameTime)).toFixed(
                      2
                    )
                  ).substring(1)}
                </small>
              </span>
            ) : this.state.matchState !== 'Scores Pending' ? (
              <span>
                {Math.floor(tMinus)}
                <small>
                  {String(
                    Number.parseFloat(tMinus - Math.floor(tMinus)).toFixed(2)
                  ).substring(1)}
                </small>
              </span>
            ) : null}
          </h1>
          <div id="scoreInfo" style={{ marginTop: '5%' }}>
            <div id="redBox" style={{ minWidth: '20%' }}>
              <div className="teams">
                Teams
                <ul>
                  {this.props.currentMatch.redAlliance.teams.map(team => (
                    <li key={team}>{team}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div id="blueBox" style={{ minWidth: '20%' }}>
              <div className="teams">
                Teams
                <ul>
                  {this.props.currentMatch.blueAlliance.teams.map(team => (
                    <li key={team}>{team}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <h1>test</h1>;
  }
}

export default MatchTimer;
