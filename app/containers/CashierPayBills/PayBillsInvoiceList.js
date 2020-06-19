import React, { useState } from 'react';
import Table from '../../components/Table';

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
      <h4 style={{ color: 'green' }}>{merchant.name}</h4>
      <p>
        Eius excepturi explicabo deleniti maxime repellat et qui qui et.
        Distinctio non ipsum dolorem ratione sit.
      </p>
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
    </div>
  );
};

export default PayBillsInvoiceList;
