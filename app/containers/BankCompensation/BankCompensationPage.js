import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import axios from 'axios';
import BankHeader from '../../components/Header/BankHeader';
import Wrapper from '../../components/Wrapper';
import Container from '../../components/Container';
import SidebarBank from '../../components/Sidebar/SidebarBank';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Main from '../../components/Main';
import ActionBar from '../../components/ActionBar';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Table from '../../components/Table';
import { STATIC_URL, API_URL } from '../App/constants';
import Loader from '../../components/Loader';
import { postRequest, getRequest } from '../App/ApiCall';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  chip: {
    fontSize: '20px',
  }
}));

function BankCompensationPage(props) {
  const classes = useStyles();
  const [selected, setselected] = React.useState(false);
  const [bankList, setBankList] = React.useState([]);
  const [copyCustomerList, setCopyCustomerList] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const token = localStorage.getItem('bankLogged');

  const handlePopupClick = () => {
    setPopup(true);
  };


  const fetchData = async () => {
    const res = await postRequest("bank/getBanks", token, {})
    if (res.data.data.status === 0) {
      toast.error(res.data.data.message);
      return { list: [], loading: false };
    } else {
      return { list: res.data.data.banks, loading: false };
    }
  };

  useEffect(() => {
    setLoading(true);
    const getCustomerList = async () => {
      const data = await fetchData();
      console.log(data);
      setBankList(data.list);
      setLoading(data.loading);
    };
    getCustomerList();
  }, []); // Or [] if effect doesn't need props or state

  if (isLoading) {
    return <Loader fullPage />;
  }
  const bank = bankList.map(bank => (
    <tr key={bank._id}>
      <td className="tac">25/17/21</td>
      <td className="tac">0</td>
      <td className="tac">0</td>
      <td className="tac">0</td>
      <td className="tac">0</td>
      <td className="tac">0</td>
      <td className="tac">0</td>
      <td className="tac">0</td>
      <td className="tac">0</td>
      <td className="tac">0</td>
      <td className="tac">0</td>
      <td className="tac">0</td>
      <td className="tac">0</td>
      <td className="tac">0</td>
      <td className="tac">0</td>
      <td className="tac">0</td>

    </tr>
  ));
  const searchlistfunction = (value) => {
    console.log(value)
    // console.log(this.state.searchrules)
    const newfilterdata = copyCustomerList.filter(element =>
      element.name.toLowerCase().includes(value.toLowerCase()),
    );
    setPartnerList(newfilterdata)


  }
  return (
    <Wrapper from="bank">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Banks | INFRA | E-WALLET</title>
      </Helmet>
      <BankHeader active="compensation" />
      <Container verticalMargin>
      <ActionBar
            marginBottom="33px"
            // inputWidth="calc(100% - 241px)"
            className="clr"
          >
            <div className={classes.root}>
              {/* {bankList&& bankList.length > 0
                ? bankList.map(function (b) {
                    return (
                      <Chip
                      avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                      label={b.name}
                      variant="outlined"
                    />
                    );
                  
                })
                : null} */}
                <Chip
                  className={classes.chip}
                  avatar={<Avatar>C</Avatar>}
                  label="Canara Bank"
                  variant="outlined"
                  color="primary"
                />
                <Chip
                  className={classes.chip}
                  avatar={<Avatar>S</Avatar>}
                  label="SBI Bank"
                  variant="outlined"
                />
                <Chip
                  className={classes.chip}
                  avatar={<Avatar>B</Avatar>}
                  label="Bank Of India"
                  variant="outlined"
                />
                <Chip
                  className={classes.chip}
                  avatar={<Avatar>P</Avatar>}
                  label="Punjab National Bank"
                  variant="outlined"
                />
      

            </div>
           
          </ActionBar>
        <Main fullWidth>
          <Card bigPadding>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th rowspan="2">Date</th>
                    <th colspan="2" style={{borderLeft:'5px solid white'}}>Non Wallet to Non Wallet</th>
                    <th colspan="2" style={{borderLeft:'5px solid white'}}>Non Wallet to Wallet</th>
                    <th colspan="2" style={{borderLeft:'5px solid white'}}>Wallet to Wallet</th>
                    <th colspan="2" style={{borderLeft:'5px solid white'}}>Wallet to Non Wallet</th>
                    <th colspan="2" style={{borderLeft:'5px solid white'}}>Wallet to Merchant</th>
                    <th colspan="2" style={{borderLeft:'5px solid white'}}>Non Wallet to Merchant</th>
                    <th rowspan="2" style={{borderLeft:'5px solid white'}}>Inward Amount</th>
                    <th rowspan="2" style={{borderLeft:'5px solid white'}}>Outward Amount</th>
                    <th rowspan="2" style={{borderLeft:'5px solid white'}}>Compensation</th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th></th>
                    <th style={{borderLeft:'5px solid white', borderTop: '5px solid white'}}>Inward Amoumt</th>
                    <th style={{borderLeft:'5px solid white' , borderTop: '5px solid white'}}>Outward Amount</th>
                    <th style={{borderLeft:'5px solid white', borderTop: '5px solid white'}}>Inward Amoumt</th>
                    <th style={{borderLeft:'5px solid white', borderTop: '5px solid white'}}>Outward Amount</th>
                    <th style={{borderLeft:'5px solid white', borderTop: '5px solid white'}}>Inward Amoumt</th>
                    <th style={{borderLeft:'5px solid white', borderTop: '5px solid white'}}>Outward Amount</th>
                    <th style={{borderLeft:'5px solid white', borderTop: '5px solid white'}}>Inward Amoumt</th>
                    <th style={{borderLeft:'5px solid white', borderTop: '5px solid white'}}>Outward Amount</th>
                    <th style={{borderLeft:'5px solid white', borderTop: '5px solid white'}}>Inward Amoumt</th>
                    <th style={{borderLeft:'5px solid white', borderTop: '5px solid white'}}>Outward Amount</th>
                    <th style={{borderLeft:'5px solid white', borderTop: '5px solid white'}}>Inward Amoumt</th>
                    <th style={{borderLeft:'5px solid white', borderTop: '5px solid white'}}>Outward Amount</th>
                    <th style={{borderLeft:'5px solid white'}}></th>
                    <th style={{borderLeft:'5px solid white'}}></th>
                    <th style={{borderLeft:'5px solid white'}}></th>
                  </tr>
                </thead>
                <tbody>
                  {bankList && bankList.length > 0 ? bank : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
     
    </Wrapper>
  );
}

export default BankCompensationPage;
