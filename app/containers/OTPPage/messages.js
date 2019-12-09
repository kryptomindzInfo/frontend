/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.OTPPage';

export default defineMessages({
  pagetitle: {
    id: `${scope}.pagetitle`,
    defaultMessage: 'OTP',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Enter OTP for',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Submit',
  }
});
