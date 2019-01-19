import React, { Component } from 'react';

class ScoresPosted extends Component {
  render() {
    let currentMatch = this.props.currentMatch;
    let redAlliance = currentMatch.redAlliance;
    let blueAlliance = currentMatch.blueAlliance;
    return (
      <div id="scoreInfo">
        <div id="redScore">
          <div className="teams">
            Teams
            <ul>
              {currentMatch.redAlliance.teams.map(team => (
                <li key={team}>{team}</li>
              ))}
            </ul>
          </div>
          <div className="pointsBreakdown">
            <div className="scoreBox">
              <span className="score">{redAlliance.totalPoints}</span>
              <span className="win">
                {redAlliance.totalPoints > blueAlliance.totalPoints
                  ? 'WIN'
                  : ''}
              </span>
            </div>

            <span className="sandstorm">
              Sandstorm:{' '}
              <b>
                {redAlliance.scoringDetails.sandstorm.level1 * 3 +
                  redAlliance.scoringDetails.sandstorm.level2 * 6}
              </b>
            </span>
            <span className="hatch">
              Hatch: <b>{redAlliance.scoringDetails.hatchPanels * 2}</b>
            </span>
            <span className="cargo">
              Cargo: <b>{redAlliance.scoringDetails.cargo * 3}</b>
            </span>
            <span className="climb">
              Climb:{' '}
              <b>
                {redAlliance.scoringDetails.habClimb.level1 * 3 +
                  redAlliance.scoringDetails.habClimb.level2 * 6 +
                  redAlliance.scoringDetails.habClimb.level3 * 12}
              </b>
            </span>
            <span className="fouls">
              Blue Fouls:{' '}
              <b>{blueAlliance.fouls * 3 + blueAlliance.techFouls * 10}</b>
            </span>
          </div>
          <div className="rpBreakdown">
            <span
              className={
                'docking ' +
                (redAlliance.scoringDetails.habDocking ? 'won' : 'lost')
              }
            >
              Docking
            </span>
            <span
              className={
                'rocket ' +
                (redAlliance.scoringDetails.completeRocket ? 'won' : 'lost')
              }
            >
              Rocket
            </span>
          </div>
        </div>
        <div id="blueScore">
          <div className="teams">
            Teams
            <ul>
              {blueAlliance.teams.map(team => (
                <li key={team}>{team}</li>
              ))}
            </ul>
          </div>
          <div className="pointsBreakdown">
            <div className="scoreBox">
              <span className="score">{blueAlliance.totalPoints}</span>
              <span className="win">
                {blueAlliance.totalPoints > redAlliance.totalPoints
                  ? 'WIN'
                  : ''}
              </span>
            </div>

            <span className="sandstorm">
              Sandstorm:{' '}
              <b>
                {blueAlliance.scoringDetails.sandstorm.level1 * 3 +
                  blueAlliance.scoringDetails.sandstorm.level2 * 6}
              </b>
            </span>
            <span className="hatch">
              Hatch: <b>{blueAlliance.scoringDetails.hatchPanels * 2}</b>
            </span>
            <span className="cargo">
              Cargo: <b>{blueAlliance.scoringDetails.cargo * 3}</b>
            </span>
            <span className="climb">
              Climb:{' '}
              <b>
                {blueAlliance.scoringDetails.habClimb.level1 * 3 +
                  blueAlliance.scoringDetails.habClimb.level2 * 6 +
                  blueAlliance.scoringDetails.habClimb.level3 * 12}
              </b>
            </span>
            <span className="fouls">
              Red Fouls:{' '}
              <b>{redAlliance.fouls * 3 + redAlliance.techFouls * 10}</b>
            </span>
          </div>
          <div className="rpBreakdown">
            <span
              className={
                'docking ' +
                (blueAlliance.scoringDetails.habDocking ? 'won' : 'lost')
              }
            >
              Docking
            </span>
            <span
              className={
                'rocket ' +
                (blueAlliance.scoringDetails.completeRocket ? 'won' : 'lost')
              }
            >
              Rocket
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ScoresPosted;
