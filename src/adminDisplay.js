import React, { Component } from 'react';

import { Button, Form, Container, Message, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class AdminDisplay extends Component {
  state = { currentMatch: null };

  componentWillMount(props) {
    this.setState({ currentMatch: this.props.currentMatch });
    this.props.socket.on('updateMatch', updatedMatch => {
      console.log('UPDATE');
      this.setState({ currentMatch: updatedMatch });
      this.props.socket.emit('getMatchHistory');
      console.log(updatedMatch);
    });

    this.props.socket.on('matchHistory', matches => {
      console.log('Received Match History');
      this.setState({ matchHistory: matches });
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
      [data.name]: data.value || '0',
      _id: this.state.currentMatch._id
    });
  };

  changeMultilineField = (e, data) => {
    data.value = data.value.split('\n');
    this.changeField(e, data);
  };

  changeCheckbox = (e, data) => {
    this.props.socket.emit('updateMatch', {
      [data.name]: data.checked,
      _id: this.state.currentMatch._id
    });
  };

  setCurrentMatch = (e, data) => {
    console.log(e, data);
    this.props.socket.emit('setCurrentMatch', data.value);
  };

  render() {
    if (this.state.currentMatch) {
      var redAlliance = this.state.currentMatch.redAlliance;
      var blueAlliance = this.state.currentMatch.blueAlliance;
    }
    return (
      <Container id="adminDisplay">
        <Message info>
          <b>
            NOTE: Values here should be counts (e.g.: number of hatches), not
            the point values. Point values will be calculated
          </b>
        </Message>
        <Button onClick={this.newMatch}>New Match</Button>
        {this.state.currentMatch && (
          <div style={{ marginTop: '10px' }}>
            <Button
              onClick={this.updateMatch({
                matchStatus: 'inProgress',
                setStart: true
              })}
            >
              Start Match
            </Button>
            <Button
              color="red"
              onClick={this.updateMatch({
                matchStatus: 'eStop'
              })}
            >
              E-STOP
            </Button>
            <Button
              onClick={this.updateMatch({
                matchStatus: 'posted'
              })}
            >
              Post Scores
            </Button>
          </div>
        )}

        {this.state.currentMatch && (
          <Form>
            <Form.Input
              autoComplete="off"
              name="eventName"
              label="Event Name"
              onChange={this.changeField}
              value={this.state.currentMatch.eventName}
            />
            <Form.Group widths="equal">
              <Form.Input
                autoComplete="off"
                name="matchType"
                label="Match Type"
                onChange={this.changeField}
                value={this.state.currentMatch.matchType}
              />
              <Form.Input
                autoComplete="off"
                fluid
                label="Match Number"
                name="matchNumber"
                onChange={this.changeField}
                value={this.state.currentMatch.matchNumber}
              />
            </Form.Group>
            {/* RED SCORING DETAILS */}
            <div id="redBox" style={{ margin: '10px' }}>
              <Form.TextArea
                lines="3"
                name="redAlliance.teams"
                label="Teams"
                onChange={this.changeMultilineField}
                value={redAlliance.teams.join('\n')}
              />
              <b>Sandstorm</b>
              <Form.Group widths="equal">
                <Form.Input
                  autoComplete="off"
                  fluid
                  label="Level 1"
                  name="redAlliance.scoringDetails.sandstorm.level1"
                  onChange={this.changeField}
                  value={redAlliance.scoringDetails.sandstorm.level1}
                />
                <Form.Input
                  autoComplete="off"
                  fluid
                  label="Level 2"
                  name="redAlliance.scoringDetails.sandstorm.level2"
                  onChange={this.changeField}
                  value={redAlliance.scoringDetails.sandstorm.level2}
                />
              </Form.Group>
              <Form.Input
                autoComplete="off"
                fluid
                label="Hatch Panels"
                name="redAlliance.scoringDetails.hatchPanels"
                onChange={this.changeField}
                value={redAlliance.scoringDetails.hatchPanels}
              />
              <Form.Input
                autoComplete="off"
                fluid
                label="Cargo"
                name="redAlliance.scoringDetails.cargo"
                onChange={this.changeField}
                value={redAlliance.scoringDetails.cargo}
              />
              <b>Hab Climb</b>
              <Form.Group widths="equal">
                <Form.Input
                  autoComplete="off"
                  fluid
                  label="Level 1"
                  name="redAlliance.scoringDetails.habClimb.level1"
                  onChange={this.changeField}
                  value={redAlliance.scoringDetails.habClimb.level1}
                />
                <Form.Input
                  autoComplete="off"
                  fluid
                  label="Level 2"
                  name="redAlliance.scoringDetails.habClimb.level2"
                  onChange={this.changeField}
                  value={redAlliance.scoringDetails.habClimb.level2}
                />
                <Form.Input
                  autoComplete="off"
                  fluid
                  label="Level 3"
                  name="redAlliance.scoringDetails.habClimb.level3"
                  onChange={this.changeField}
                  value={redAlliance.scoringDetails.habClimb.level3}
                />
              </Form.Group>
              <b>RP Params</b>
              <Form.Group widths="equal">
                <Form.Checkbox
                  label="Hab Docking"
                  name="redAlliance.scoringDetails.habDocking"
                  onChange={this.changeCheckbox}
                  checked={redAlliance.scoringDetails.habDocking}
                />
                <Form.Checkbox
                  label="Complete Rocket"
                  name="redAlliance.scoringDetails.completeRocket"
                  onChange={this.changeCheckbox}
                  checked={redAlliance.scoringDetails.completeRocket}
                />
              </Form.Group>
              <b>RED Fouls</b>
              <Form.Group widths="equal">
                <Form.Input
                  autoComplete="off"
                  fluid
                  label="Fouls"
                  name="redAlliance.fouls"
                  onChange={this.changeField}
                  value={redAlliance.fouls}
                />
                <Form.Input
                  autoComplete="off"
                  fluid
                  label="Tech Fouls"
                  name="redAlliance.techFouls"
                  onChange={this.changeField}
                  value={redAlliance.techFouls}
                />
              </Form.Group>
            </div>
            {/* BLUE SCORING DETAILS */}
            <div id="blueBox" style={{ margin: '10px' }}>
              <Form.TextArea
                lines="3"
                name="blueAlliance.teams"
                label="Teams"
                onChange={this.changeMultilineField}
                value={blueAlliance.teams.join('\n')}
              />
              <b>Sandstorm</b>
              <Form.Group widths="equal">
                <Form.Input
                  autoComplete="off"
                  fluid
                  label="Level 1"
                  name="blueAlliance.scoringDetails.sandstorm.level1"
                  onChange={this.changeField}
                  value={blueAlliance.scoringDetails.sandstorm.level1}
                />
                <Form.Input
                  autoComplete="off"
                  fluid
                  label="Level 2"
                  name="blueAlliance.scoringDetails.sandstorm.level2"
                  onChange={this.changeField}
                  value={blueAlliance.scoringDetails.sandstorm.level2}
                />
              </Form.Group>
              <Form.Input
                autoComplete="off"
                fluid
                label="Hatch Panels"
                name="blueAlliance.scoringDetails.hatchPanels"
                onChange={this.changeField}
                value={blueAlliance.scoringDetails.hatchPanels}
              />
              <Form.Input
                autoComplete="off"
                fluid
                label="Cargo"
                name="blueAlliance.scoringDetails.cargo"
                onChange={this.changeField}
                value={blueAlliance.scoringDetails.cargo}
              />
              <b>Hab Climb</b>
              <Form.Group widths="equal">
                <Form.Input
                  autoComplete="off"
                  fluid
                  label="Level 1"
                  name="blueAlliance.scoringDetails.habClimb.level1"
                  onChange={this.changeField}
                  value={blueAlliance.scoringDetails.habClimb.level1}
                />
                <Form.Input
                  autoComplete="off"
                  fluid
                  label="Level 2"
                  name="blueAlliance.scoringDetails.habClimb.level2"
                  onChange={this.changeField}
                  value={blueAlliance.scoringDetails.habClimb.level2}
                />
                <Form.Input
                  autoComplete="off"
                  fluid
                  label="Level 3"
                  name="blueAlliance.scoringDetails.habClimb.level3"
                  onChange={this.changeField}
                  value={blueAlliance.scoringDetails.habClimb.level3}
                />
              </Form.Group>
              <b>RP Params</b>
              <Form.Group widths="equal">
                <Form.Checkbox
                  label="Hab Docking"
                  name="blueAlliance.scoringDetails.habDocking"
                  onChange={this.changeCheckbox}
                  checked={blueAlliance.scoringDetails.habDocking}
                />
                <Form.Checkbox
                  label="Complete Rocket"
                  name="blueAlliance.scoringDetails.completeRocket"
                  onChange={this.changeCheckbox}
                  checked={blueAlliance.scoringDetails.completeRocket}
                />
              </Form.Group>
              <b>Blue Fouls</b>
              <Form.Group widths="equal">
                <Form.Input
                  autoComplete="off"
                  fluid
                  label="Fouls"
                  name="blueAlliance.fouls"
                  onChange={this.changeField}
                  value={blueAlliance.fouls}
                />
                <Form.Input
                  autoComplete="off"
                  fluid
                  label="Tech Fouls"
                  name="blueAlliance.techFouls"
                  onChange={this.changeField}
                  value={blueAlliance.techFouls}
                />
              </Form.Group>
            </div>
          </Form>
        )}

        {this.state.matchHistory ? (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Match Name</Table.HeaderCell>
                <Table.HeaderCell>Blue Teams</Table.HeaderCell>
                <Table.HeaderCell>Blue Score</Table.HeaderCell>
                <Table.HeaderCell>Red Teams</Table.HeaderCell>
                <Table.HeaderCell>Red Score</Table.HeaderCell>
                <Table.HeaderCell>Match State</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.matchHistory.map(match => (
                <Table.Row key={match._id}>
                  <Table.Cell>
                    {match.matchType + ' ' + match.matchNumber}
                  </Table.Cell>
                  <Table.Cell>{match.blueAlliance.teams.join(', ')}</Table.Cell>
                  <Table.Cell>{match.blueAlliance.totalPoints}</Table.Cell>
                  <Table.Cell>{match.redAlliance.teams.join(', ')}</Table.Cell>
                  <Table.Cell>{match.redAlliance.totalPoints}</Table.Cell>
                  <Table.Cell>{match.matchStatus}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={this.setCurrentMatch} value={match._id}>
                      Set Current
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : null}
      </Container>
    );
  }
}

export default AdminDisplay;
