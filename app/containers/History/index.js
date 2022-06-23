/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import Wrapper from 'components/Wrapper';
import BankHeader from 'components/Header/BankHeader';
import Container from 'components/Container';
import Loader from 'components/Loader';
import SidebarBank from 'components/Sidebar/SidebarBank';
import Main from 'components/Main';
import Card from 'components/Card';
import Table from 'components/Table';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';
import { API_URL, CURRENCY } from '../App/constants';
import ReactPaginate from 'react-paginate';
import 'react-toastify/dist/ReactToastify.css';

const H4 = styled.h4`
  > span {
    font-size: 13px;
    color: #666;
  }
`;

toast.configure({
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const token = localStorage.getItem('bankLogged');

export default class History extends Component {
  constructor() {
    super();
    this.state = {
      loading:false,
      token: token,
      selectedRow: [],
      selectedRowCopy: [],
      allRow: [],
      receivedRow: [],
      sentRow: [],
      pagecount: 0,
    };

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
  }

  success = () => toast.success(this.state.notification);

  error = () => toast.error(this.state.notification);

  warn = () => toast.warn(this.state.notification);


  getHistory = async() => {
    try {
      const res = await axios.post(`${API_URL}/getBankHistory`, {
        token: token,
        from: 'operational',
        page: this.state.activePage,
        offset: this.state.perPage,
      });
      if (res.status === 200){
        return({history: res.data.history, loading: false})
      }
    }catch(err){
      console.log(err);
    }
  };

  handlePageClick = (data) =>{
    console.log(this.state.selectedRowCopy);
    const start = data.selected*10;
    const end = data.selected*10 + 10;
    console.log(start,end);
    const array = this.state.selectedRowCopy.slice(start, end);
    console.log(array);
    this.setState({
      selectedRow: array,
    });
  };

  filterData = (type) => {
    if(type==='ALL'){
      this.setState({
        selectedRow: this.state.allRow.slice(0, 10),
        selectedRowCopy: this.state.allRow,
        pagecount: Math.ceil(this.state.allRow.length / 10),
      });
    } else if(type==='DR'){
      this.setState({
        selectedRow: this.state.sentRow.slice(0, 10),
        selectedRowCopy: this.state.sentRow,
        pagecount: Math.ceil(this.state.sentRow.length / 10),
      });
    }else {
      this.setState({
        selectedRow: this.state.receivedRow.slice(0, 10),
        selectedRowCopy: this.state.receivedRow,
        pagecount: Math.ceil(this.state.receivedRow.length / 10),
      });

    }
  }

  getData = async() => {
    this.setState({
      loading: true,
    });
    const allhistory =  await this.getHistory();
    this.setState({
      selectedRow: allhistory.history.slice(0, 10),
      selectedRowCopy: allhistory.history,
      pagecount: Math.ceil(allhistory.history.length / 10),
      allRow: allhistory.history,
      receivedRow: allhistory.history.filter(val=> val.Value.tx_data[0].tx_type === 'CR'),
      sentRow: allhistory.history.filter(val=> val.Value.tx_data[0].tx_type === 'DR'),
      loading: allhistory.loading,
    });


  }


  componentDidMount() {
    // this.setState({ bank: this.props.match.params.bank });
    if (token !== undefined && token !== null) {
      this.getData();
      // this.getHistory();
    } else {
      // alert('Login to continue');
      // this.setState({loading: false, redirect: true });
    }
  }

  render() {

    const { loading, redirect } = this.state;
    if (loading) {
      return <Loader fullPage />;
    }
    if (redirect) {
      return <Redirect to="/" />;
    }
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var dis = this;
    return (
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>History | INFRA | E-WALLET</title>
        </Helmet>
        <BankHeader />
        <Container verticalMargin>
          {/* <SidebarBank /> */}
          <Main fullWidth>
            <Card bigPadding>
              <div className="cardHeader">
                <div className="cardHeaderLeft">
                  <i className="material-icons">playlist_add_check</i>
                </div>
                <div className="cardHeaderRight">
                  <h3>Operational Wallet Transaction</h3>
                  <h5>E-wallet activity</h5>
                </div>
              </div>
              <div className="cardBody">
                <div className="clr">
                  <div className="menuTabs" onClick={() => this.filterData('ALL')}>
                    All
                  </div>
                  <div
                    className="menuTabs"
                    onClick={() => this.filterData('DR')}
                  >
                    Payment Sent
                  </div>
                  <div
                    className="menuTabs"
                    onClick={() => this.filterData('CR')}
                  >
                    Payment Recieved
                  </div>
                </div>
                <Table marginTop="34px" smallTd textAlign="left">
                  <thead>
                    <tr>
                      <th>Date</th><th>Details</th><th>Amount</th><th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.selectedRow && this.state.selectedRow.length > 0
                      ? this.state.selectedRow.map(function (b) {
                        var isoformat = b.Timestamp;
                        var readable = new Date(isoformat);
                        var m = readable.getMonth(); // returns 6
                        var d = readable.toDateString(); // returns 15
                        var h = readable.getHours();
                        var mi = readable.getMinutes();
                        var mlong = months[m];
                        var fulldate =
                          d + ' ' + h + ':' + mi;

                        return (
                            <tr key={b.TxId}>
                              <td>
                                <div className="labelGrey">{fulldate}</div>
                              </td>
                              <td>
                                <div className="labelBlue">
                                  {b.Value.tx_data[0].tx_details}
                                </div>{' '}
                                <div className="labelSmallGrey">
                                  {b.Value.tx_data[0].tx_type == 'DR' &&
                                    "Debit"
                                  }
                                  {b.Value.tx_data[0].tx_type == 'CR' &&
                                    "Credit"
                                  }

                                </div>
                              </td>
                              <td className="right">
                                <div className="labelGrey">
                                  {
                                    b.Value.tx_data[0].tx_type == 'DR'
                                      ?
                                      <span>{CURRENCY} -{b.Value.tx_data[0].amount.toFixed(2)}</span>
                                      :
                                      <span>{CURRENCY} {b.Value.tx_data[0].amount.toFixed(2)}</span>
                                  }

                                </div>
                              </td>
                              <td className="right">
                                <div className="labelGrey">
                                 
                                      <span>{CURRENCY} {b.Value.balance.toFixed(2)}</span>
                                     

                                </div>
                              </td>
                            </tr>
                          )
                      })
                      : null}
                  </tbody>
                </Table>
                <ReactPaginate
               previousLabel={'previous'}
               nextLabel={'next'}
               breakLabel={'...'}
               breakClassName={'break-me'}
               pageCount={this.state.pagecount}
               marginPagesDisplayed={10}
               pageRangeDisplayed={10}
               onPageChange={this.handlePageClick}
               containerClassName={'pagination'}
               subContainerClassName={'pages pagination'}
               activeClassName={'active'}
             />
              </div>
            </Card>
          </Main>
        </Container>
      </Wrapper>
    );
  }
}
