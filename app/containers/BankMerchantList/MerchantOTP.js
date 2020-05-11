import { FormattedMessage } from 'react-intl';
import React from 'react';
import messages from '../BankBranchList/messages';
import Popup from '../../components/Popup';
import FormGroup from '../../components/FormGroup';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

function MerchantOTP() {
  return (
    <Popup>
      <div>
        <h1>
          <FormattedMessage {...messages.verify} />
        </h1>
        <form action="" method="post" onSubmit={this.verifyOTP}>
          <FormGroup>
            <label>
              <FormattedMessage {...messages.otp} />*
            </label>
            <TextInput
              type="text"
              name="otp"
              onFocus={inputFocus}
              onBlur={inputBlur}
              value={this.state.otp}
              onChange={this.handleInputChange}
              required
            />
          </FormGroup>
          {this.state.verifyOTPLoading ? (
            <Button filledBtn marginTop="50px" disabled>
              <Loader />
            </Button>
          ) : (
            <Button filledBtn marginTop="50px">
              <span>
                <FormattedMessage {...messages.verify} />
              </span>
            </Button>
          )}

          <p className="resend">
            Wait for <span className="timer">{this.state.timer}</span> to{' '}
            {this.state.resend ? (
              <span className="go" onClick={this.generateOTP}>
                Resend
              </span>
            ) : (
              <span>Resend</span>
            )}
          </p>
        </form>
      </div>
    </Popup>
  );
}
