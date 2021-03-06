import React, { PureComponent } from 'react';
import Poll from './Poll'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class DashBoard extends PureComponent {
  static propTypes = {
    answeredPolls : PropTypes.array.isRequired,
    unansweredPolls : PropTypes.array.isRequired
  }
  state = {
    activeTab: '1'
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    const { answeredPolls, unansweredPolls } = this.props
    return (
      <div>
        <Nav tabs className="justify-content-center">
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Unanswered
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Answered
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              {unansweredPolls.map(qid =>
              <Col key={qid} sm="6" md="4">
                <Poll id={qid}/>
              </Col>
              )}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              {answeredPolls.map(qid =>
              <Col key={qid} sm="6" md="4">
                <Poll id={qid}/>
              </Col>
              )}
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

function mapStateToProps ({ polls, users, authedUser }) {
  const user = users[authedUser];
  const answeredPolls = Object.keys(user.answers)
    .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
  return {
    answeredPolls,
    unansweredPolls : Object.keys(polls).filter(qid => !answeredPolls.includes(qid))
      .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
  }
}

export default connect(mapStateToProps)(DashBoard)
