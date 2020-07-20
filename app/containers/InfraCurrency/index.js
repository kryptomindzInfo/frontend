/**
 *
 * InfraCurrency
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

// import SelectCurrency from 'react-select-currency';
import { toast } from 'react-toastify';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectInfraCurrency from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Wrapper from 'components/Wrapper';
import Header from 'components/Header/index';
import Container from 'components/Container';
import SelectInput from 'components/SelectInput';
import Main from 'components/Main';
import ActionBar from 'components/ActionBar';
import Card from 'components/Card';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Popup from 'components/Popup';
import FormGroup from 'components/FormGroup';
import TextInput from 'components/TextInput';
import UploadArea from 'components/UploadArea';
import Row from 'components/Row';
import Col from 'components/Col';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
// import MenuItem from "@material-ui/core/MenuItem";
// import TextField from "@material-ui/core/TextField";

import { API_URL, STATIC_URL, CONTRACT_URL } from '../App/constants';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MaterialButton from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import 'react-toastify/dist/ReactToastify.css';
import SidebarThree from '../../components/Sidebar/SidebarThree';
import Typography from '@material-ui/core/Typography';

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const onSelectedCurrency = currencyAbbrev => {
  debug(`Selected ${currencyAbbrev}`);
};
const token = localStorage.getItem('logged');

var isAdmin = localStorage.getItem('isAdmin');

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
  {
    value: 'XOF',
    label: 'XOF',
  },
];

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '70%',
  },
  textFieldModal: {
    width: '100%',
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class InfraCurrency extends Component {
  // useInjectReducer({ key: 'infraCurrency', reducer });
  // useInjectSaga({ key: 'infraCurrency', saga });

  constructor() {
    super();
    this.state = {
      addDenominationPopup: false,
      denomination: [],
      infraID: '',
      bank: '',
      name: '',
      username: '',
      password: '',
      mobile: '',
      email: '',
      ccode: '',
      loading: true,
      redirect: false,
      notification: 'Welcome',
      popup: false,
      user_id: token,
      banks: [],
      rules: [],
      otp: '',
      profile: [],
      permissions: {},
      showOtp: false,
      currency: 'XOF',
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);

    this.onChange = this.onChange.bind(this);
  }

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  showPopup = () => {
    //, name: v.name, address1: v.address1, state: v.state, zip: v.zip, country: v.country, ccode: v.ccode, mobile: v.mobile, email: v.email, logo: v.logo, contract: v.contract, username: v.username, bank_id: v._id
    this.setState({ popup: true });
  };

  closePopup = () => {
    this.setState({
      popup: false,
      addDemoninationPopup: false,
      showEditOtp: false,
      name: '',
      mobile: '',
      email: '',
      username: '',
      ccode: '',
      password: '',
    });
  };
  closeAddDenominationPopup = () => {
    this.setState({ addDenominationPopup: false });
  };

  logout = () => {
    // event.preventDefault();
    // axios.post(API_URL+'/logout', {token: token})
    // .then(res => {
    //    if(res.status == 200){
    localStorage.removeItem('logged');
    localStorage.removeItem('name');
    this.setState({ redirect: true });
    //     }else{
    //       const error = new Error(res.data.error);
    //       throw error;
    //     }
    // })
    // .catch(err => {
    //   alert('Login to continue');
    //   this.setState({ redirect: true });
    // });
  };

  removeFile = key => {
    this.setState({
      [key]: null,
    });
  };

  triggerBrowse = inp => {
    const input = document.getElementById(inp);
    input.click();
  };

  onChange(e) {
    if (e.target.files && e.target.files[0] != null) {
      this.fileUpload(e.target.files[0], e.target.getAttribute('data-key'));
    }
  }

  getBanks = () => {
    axios
      .post(`${API_URL}/getBank`, {
        token: token,
        bank_id: this.props.match.params.bank,
      })
      .then(res => {
        if (res.status == 200) {
          this.setState({
            loading: false,
            banks: res.data.banks,
            logo: res.data.banks.logo,
            name: res.data.banks.name,
            address1: res.data.banks.address1,
            state: res.data.banks.state,
            zip: res.data.banks.zip,
            country: res.data.banks.country,
            ccode: res.data.banks.ccode,
            mobile: res.data.banks.mobile,
            email: res.data.banks.email,
            logo: res.data.banks.logo,
            contract: res.data.banks.contract,
            username: res.data.banks.contract,
            bank_id: res.data.banks._id,
            username: res.data.banks.username,
          });
        }
      })
      .catch(err => {});
  };

  getProfile = () => {
    axios
      .post(`${API_URL}/getProfile`, { token: token })
      .then(res => {
        if (res.status == 200) {
          this.setState(
            {
              loading: false,
              profile: res.data.users,
              name: res.data.users.name,
              username: res.data.users.username,
              email: res.data.users.email,
              mobile: res.data.users.mobile,
              ccode: res.data.users.ccode,
            },
            () => {
              console.log(this.state.profile);
            },
          );
        }
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.setState({ bank: this.props.match.params.bank });
    if (token !== undefined && token !== null) {
      if (isAdmin == 'true') {
        this.setState({ permissions: 'all' });

      } else {
        axios
          .post(`${API_URL}/getPermission`, { token })
          .then(res => {
            if (res.status == 200) {
              this.setState({ permissions: res.data.permissions }, () => {
                console.log(this.state.permissions);
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.getProfile();
    } else {
      // alert('Login to continue');
      // this.setState({loading: false, redirect: true });
    }

    axios
      .get(`${API_URL}/get-currency`)
      .then(d => {
        console.log(d);
        if (d.data.length != 0) {
          this.setState(prevState => ({
            ...prevState,
            denomination: d.data[0].denomination,
            currency: d.data[0].value,
          }));
        }
      })
      .catch(err => {
        console.log(err.messages);
      });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  showAddDenominationPopup = () => {
    this.setState({ addDenominationPopup: true });
  };

  saveCurrency = () => {
    const { currency, denomination, notification } = this.state;
    axios
      .post(`${API_URL}/save-currency`, { value: currency, denomination })
      .then(d => {
        console.log(d);
        this.success();
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      addDenominationPopup: false,
      notification: 'Denomination Added',
    });
  };

  render() {
    const { classes } = this.props;
    // const { classes } = useStyles();
    // const [currency, setCurrency] = React.useState('EUR');

    const handleChange = event => {
      setCurrency(event.target.value);
    };
    function inputFocus(e) {
      const { target } = e;
      target.parentElement.querySelector('label').classList.add('focused');
    }

    function inputBlur(e) {
      const { target } = e;
      if (target.value == '') {
        target.parentElement.querySelector('label').classList.remove('focused');
      }
    }

    const { loading, redirect } = this.state;
    if (loading) {
      return <Loader fullPage />;
    }
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Banks | INFRA | E-WALLET</title>
        </Helmet>
        <Header active="" />
        <Container verticalMargin>
          <SidebarThree infraID={this.state.infraID} active="currency" />
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              className={classes.textField}
              value={this.state.currency}
              onChange={e => {
                const val = e.target.value;
                this.setState({ currency: val });
              }}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              // helperText="Please select your currency"
              margin="normal"
              variant="outlined"
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </form>

          <div>
            <Button
              filledBtn
              onClick={this.showAddDenominationPopup}
              style={{
                color: 'white',
                background: '#417505',
                margin: '3%',
                minWidth: '20%',
              }}
            >
              Show Denomination
            </Button>
            {/* <Button
              filledBtn
              onClick={this.saveCurrency}
              type="button"
              style={{
                minWidth: '30%',
                marginLeft:'25%',
              }}
            >
              Save
            </Button> */}
          </div>
        </Container>

        {this.state.addDenominationPopup ? (
          <Popup close={this.closeAddDenominationPopup.bind(this)} accentedH1>
            <h1>Add Denomination</h1>
            <form style={{ padding: '4% 0 7% 0' }} onSubmit>
              <Grid container spacing={8}>
                <Grid item>
                  <MaterialButton
                    variant="outlined"
                    onClick={() => {
                      this.setState(prevState => ({
                        ...prevState,
                        denomination: [...prevState.denomination, ' '],
                      }));
                    }}
                  >
                    Add more
                  </MaterialButton>
                </Grid>
                {this.state.denomination.map((element, index) => (
                  <Grid
                    item
                    key={`text-field-${index}`}
                    xs={12}
                    container
                    alignItems="center"
                    spacing={8}
                  >
                    <Grid item xs={9}>
                      <TextField
                        label="Number"
                        value={element}
                        onChange={e => {
                          const val = e.target.value;
                          const data = this.state.denomination;

                          data[index] = Number(val);
                          this.setState(prevState => ({
                            ...prevState,
                            denomination: data,
                          }));
                        }}
                        type="number"
                        className={classes.textFieldModal}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <MaterialButton
                        onClick={() => {
                          const data = this.state.denomination;
                          data.splice(index, 1);
                          this.setState(prevState => ({
                            ...prevState,
                            denomination: data,
                          }));
                        }}
                      >
                        Delete
                      </MaterialButton>
                    </Grid>
                  </Grid>
                ))}
              </Grid>

              <Button
                filledBtn
                type="button"
                onClick={this.saveCurrency}
                // onClick={this.showAddDenominationPopup}
                style={{
                  color: 'white',
                  background: '#417505',
                  marginTop: '10%',
                }}
              >
                Add Denomination
              </Button>
            </form>
          </Popup>
        ) : null}
      </Wrapper>
    );
  }
}

InfraCurrency.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  infraCurrency: makeSelectInfraCurrency(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withStyles(styles)(InfraCurrency);
