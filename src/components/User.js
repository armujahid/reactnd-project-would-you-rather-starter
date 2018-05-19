import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class User extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <span>{user.name}</span>
        <img src={user.avatarURL} className='avatar' alt={`Avatar of ${user.name}`}/>
      </Fragment>
    );
  }
}

function mapStateToProps ({ users }, { id }) {
  return {
    user : users[id]
  }
}


export default connect(mapStateToProps)(User)
