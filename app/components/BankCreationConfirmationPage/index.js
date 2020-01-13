import Header from '../Header';
import React, { Component } from 'react';
import Button from 'components/Button';

// import Logo from './Logo';
// import Nav from './Nav';
// import TopBar from './TopBar';
// import Welcome from './Welcome';
// import Container from 'components/Container';
// import A from 'components/A';

class BankCreationConfirmationPage extends Component {
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
              fontSize: '30px',
            }}
          >
            Registration Successfull!
          </p>
          <p
            style={{
              fontSize: '20px',
            }}
          >
            Kindly login
          </p>
          <Button>Login</Button>
        </div>
      </div>
    );
  }
}

export default BankCreationConfirmationPage;
