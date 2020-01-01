import Header from '../Header';
import React, { Component } from 'react';
// import Logo from './Logo';
// import Nav from './Nav';
// import TopBar from './TopBar';
// import Welcome from './Welcome';
// import Container from 'components/Container';
// import A from 'components/A';

class TermsConditions extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header />
        <div className="xspadding" />
        <div
          className="app"
          style={{
            margin: '0 auto',
            maxWidth: '55%',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '50px',
            }}
          >
            Terms And Conditions
          </p>
          <p
            style={{
              fontSize: '30px',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
        </div>
      </div>
    );
  }
}

export default TermsConditions;
