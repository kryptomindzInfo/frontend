import React, { useState } from 'react';
import Card from 'components/Card';
import Table from '../../components/Table';
import { STATIC_URL } from '../App/constants';

const PayBillsInvoiceList = props => {
  const { merchant } = props;
  const [invoiceList, setInvoiceList] = useState(
    props.invoiceList.filter(i => i.paid === 0),
  );
  const getInvoiceList = () =>
    invoiceList.map(invoice => (
      <tr key={invoice._id}>
        <td className="tac">{invoice.name}</td>
        <td className="tac">{invoice.amount}</td>
        <td className="tac">{invoice.due_date} </td>
        <td className="tac bold">
          <div
            style={{
              display: 'flex',
              cursor: 'pointer',
              justifyContent: 'center',
              color: 'green',
            }}
          >
            <span onClick={() => props.setEditingInvoice(invoice)}>
              Pay Bill
            </span>
          </div>
        </td>
      </tr>
    ));

  return (
    <div>
      <Card>
        <div className="cardHeader">
          <div className="cardHeaderLeft">
            <img
              src={`${STATIC_URL}/${merchant.logo}`}
              alt=""
              style={{ height: '100px', width: '100px', paddingRight: '10px' }}
            />
          </div>
          <div className="cardHeaderRight">
            <h4 style={{ color: 'green' }}>{merchant.name}</h4>
            <p>{merchant.description}</p>
          </div>
        </div>
        <div />
        <Table marginTop="34px" smallTd>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {invoiceList && invoiceList.length > 0 ? getInvoiceList() : null}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default PayBillsInvoiceList;
