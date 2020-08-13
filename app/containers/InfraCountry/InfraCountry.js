import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SearchIcon from '@material-ui/icons/Search';
import Header from 'components/Header/index';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import Wrapper from 'components/Wrapper';
import ActionBar from '../../components/ActionBar';
import Container from 'components/Container';
import Main from '../../components/Main';
import Button from '../../components/Button';
import Card from '../../components/Card';
import SidebarThree from '../../components/Sidebar/SidebarThree';
import Table from '../../components/Table';
import CreateCountryPopup from './CreateCountryPopup';
import { API_URL, STATIC_URL, CURRENCY } from 'containers/App/constants';

const InfraCountry = (props) => {
  const [addCountryPopup, setAddCountryPopup] = React.useState(false);
	const [countryList, setCountryList] = React.useState([]);
	const [infraID, setInfraID] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [defaultCountry, setDefaultCountry] = React.useState({});
  const [defaultCountryPopup, setDefaultCountryPopup] = React.useState(false);

  const handleCountryPopupClick = () => {
    setAddCountryPopup(true);
  };

  const onPopupClose = () => {
    setAddCountryPopup(false);
	};
	
	const getCountries = async () =>{
		axios
      .get(`${API_URL}/get-country`)
      .then(d => {
        if (d.data[0].country_list.length != 0) {
          setCountryList(d.data[0].country_list);
				}
      })
      .catch(err => {
        console.log(err.messages);
      });
  }

  const getCountry = () => {
    return countryList.map((country) => {
      return (
        <tr key={country._id}>
          <td className="tac">{country.name}</td>
          <td className="tac bold">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <td className="tac">{country.ccode}</td>
                <span className="absoluteMiddleRight primary popMenuTrigger">
                  <i className="material-icons ">more_vert</i>
                  <div className="popMenu">
                    <span
                      // onClick={() => handleDeleteOfferingPopupClick(offering)}
                    >
                      Delete
                    </span>
                  </div>
                </span>
              </div>
            </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <Wrapper>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Country | INFRA | E-WALLET</title>
      </Helmet>
      <Header active="" />
      <Container verticalMargin>
        <SidebarThree infraID={infraID} active="country" />
        <Main big>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            <div className="iconedInput fl">
              <i className="material-icons">
                <SearchIcon />
              </i>
              <input type="text" placeholder="Search Country" />
            </div>

            <Button
              className="addBankButton"
              flex
              onClick={() => handleCountryPopupClick()}
            >
              <AddIcon className="material-icons" />
              <span>Add Country</span>
            </Button>
          </ActionBar>
          <ActionBar
            marginBottom="33px"
            inputWidth="calc(100% - 241px)"
            className="clr"
          >
            {/* <div>
              {defaultCountry ? (
                <h3 style={{ margin: '6px' }}>
                  Default Country : {defaultCountry.name}
                </h3>
              ) : (
                <h3 style={{ margin: '6px' }}>Please set default country</h3>
              )}
            </div> */}
            {/* <Button
              className="addBankButton"
              style={{ float: 'right' }}
              onClick={() => handleDefaultCountryPopupClick()}
            >
              <span>Set Default Country</span>
            </Button> */}
          </ActionBar>
          <Card bigPadding topMargin="55px">
            <div className="cardHeader">
              <div className="cardHeaderLeft">
                <i className="material-icons">supervised_user_circle</i>
              </div>
              <div className="cardHeaderRight">
                <h3>Country List</h3>
              </div>
            </div>
            <div className="cardBody">
              <Table marginTop="34px" smallTd>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Country code</th>
                  </tr>
                </thead>
                <tbody>
                  {countryList && countryList.length > 0 ? getCountry() : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Main>
      </Container>
      {addCountryPopup ? (
        <CreateCountryPopup
          refreshcountrylist={(data) => getCountries(data)}
          onClose={() => onPopupClose()}
        />
      ) : null}
    </Wrapper>
  );
};
export default InfraCountry;
