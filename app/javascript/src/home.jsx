import React from 'react'
import ReactDOM from 'react-dom'
import Guest from '@src/guest';
import User from '@src/user';
import { handleErrors } from '@utils/fetchHelper';

import './home.scss';

class Home extends React.Component {
  state = {
    authenticated: false,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })
  }

  render () {
    const { authenticated } = this.state;

    if (authenticated) {
      return (
        <User user_id={this.props.user_id} username={this.props.username} email={this.props.email} />
      );
    };

      return (
        <Guest />
      )
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));

  ReactDOM.render(
    // console.log(`${data.username}`),
    <Home user_id={data.user_id} username={data.username} email={data.email} />,
    document.body.appendChild(document.createElement('div')),
  )
})