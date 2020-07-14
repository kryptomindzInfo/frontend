import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AllRoutes = () => {
  const [branchUrl, setBranchUrl] = React.useState('');
  const [cashierUrl, setCashierUrl] = React.useState('');
  const [merchantBranchUrl, setMerchantBranchtUrl] = React.useState('');
  const [merchantCashiertUrl, setMerchantCashierUrl] = React.useState('');
  const bankUrl = 'http://91d90ac373dc.sn.mynetname.net:2020/bank';
  const merchantUrl = 'http://merchant.testbeyondwallet.tk';

  const handleBankBranchLink = event => {
    setBranchUrl(
      `http://91d90ac373dc.sn.mynetname.net:2020/branch/${event.target.value}`,
    );
  };

  const handleBankCashierLink = event => {
    setCashierUrl(
      `http://91d90ac373dc.sn.mynetname.net:2020/cashier/${event.target.value}`,
    );
  };

  const handleMerchantBranchLink = event => {
    setMerchantBranchtUrl(
      `http://merchant.testbeyondwallet.tk/merchant/branch/${
        event.target.value
      }`,
    );
  };

  const handleMerchantCashierLink = event => {
    setMerchantCashierUrl(
      `http://merchant.testbeyondwallet.tk/merchant/cashier/${
        event.target.value
      }`,
    );
  };

  return (
    <div>
      <div>
        <h1>Bank Link</h1>
        <button>
          <a href={bankUrl}>Go to Bank</a>
        </button>
      </div>
      <br />
      <div>
        <form onChange={handleBankBranchLink}>
          <h1>Bank Branch Link</h1>
          <input type="text" placeholder="Enter Bank Name" name="name" />
        </form>
        <button>
          <a href={branchUrl}>Go to Branch</a>
        </button>
      </div>
      <br />
      <div>
        <form onChange={handleBankCashierLink}>
          <h1>Bank Cashier Link</h1>
          <input type="text" placeholder="Enter Branch Name" name="name" />
        </form>
        <button>
          <a href={cashierUrl}>Go to Branch Cashier</a>
        </button>
      </div>
      <br />
      <div>
        <h1>Merchant Link</h1>
        <button>
          <a href={merchantUrl}>Go to Bank Merchant</a>
        </button>
      </div>
      <br />
      <div>
        <form onChange={handleMerchantBranchLink}>
          <h1>Merchant Branch Link</h1>
          <input type="text" placeholder="Enter Bank Name" name="name" />
        </form>
        <button>
          <a href={merchantBranchUrl}>Go to Merchant Branch</a>
        </button>
      </div>
      <br />
      <div>
        <form onChange={handleMerchantCashierLink}>
          <h1>Merchant Cashier Link</h1>
          <input
            type="text"
            placeholder="Enter Cashier Name"
            name="Cashier name"
          />
        </form>
        <button>
          <a href={merchantCashiertUrl}>Go to Merchant Cashier</a>
        </button>
      </div>
    </div>
  );
};

export default AllRoutes;
