
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// Importing modules
import React, { useState } from "react";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import contractABI from "../Contract.json";

function Account() {

const [data, setdata] = useState({
	address: "",
	Balance: null,
});


const btnhandler = () => {

	if (window.ethereum) {

	window.ethereum
		.request({ method: "eth_requestAccounts" })
		.then((res) => accountChangeHandler(res[0]));
	} else {
	alert("install metamask extension!!");
	}
  if (window.ethereum.networkVersion !== 3){
    alert("Network ID is not Ropsten !!! Switch to Ropsten");
  }
};

const getbalance = (address) => {

	// Requesting balance method
	window.ethereum
	.request({
		method: "eth_getBalance",
		params: [address, "latest"]
	})
	.then((balance) => {
		// Setting balance
		setdata({
		Balance: ethers.utils.formatEther(balance),
		});
	});
};

const accountChangeHandler = (account) => {
	
	setdata({
	address: account,
	});

	// Setting a balance
	getbalance(account);
};
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = "0xBFDC614F51b9564bfAb73F17ef9Be2eAcA0BAABD"
  const contractData = new ethers.Contract(contractAddress, contractABI, signer);

const mintNFT = async () => {
 
  const result = await contractData.safeMint("0xbf6f03450452271073877Bb4A36A5c4ED6244957",12,120);
  let res = await result.wait();
  console.log(res);
}
const transferNFT = async () => {
  const result = await contractData.transfer("0xbf6f03450452271073877Bb4A36A5c4ED6244957","0xf35d095590614477b35645Fcd18422b9945cdBc7",12);
  let res = await result.wait();
  console.log(res);
}


return (
	<div className="App">
	{/* Calling all values which we
	have stored in usestate */}

	<Card className="text-center">
		<Card.Header>
		<strong>Address: </strong>
		{data.address}
		</Card.Header>
		<Card.Body>
		<Card.Text>
			<strong>Balance: </strong>
			{data.Balance}
		</Card.Text>
    <div className="mb-2" style={{textAlign:'center'}}>
        <Button variant="primary" size="lg" onClick={btnhandler}>
          Connect wallet
        </Button>{' '}
        <Button variant="primary" size="lg"  onClick={mintNFT}>
          Create NFT
        </Button>{' '}
        <Button variant="primary" size="lg"  onClick={transferNFT}>
          Transaction
        </Button>{' '}
        
    </div>
		<span></span>
		</Card.Body>
	</Card>
	</div>
);
}

export default Account;

/*import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ethers } from "ethers";


const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No matamask found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
    } catch (err) {
    setError(err.message);
    }
};


function Account() {
  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [iso, setIso] = useState(false);
  const onbtnck = () => {
    setIso(true);
    setIsConnected(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
      
    });
   
  };

  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });
  
  // Button handler button for handling a
  // request event for metamask
  const btnhandler = () => {
  
    // Asking if metamask is already present or not
    if (window.ethereum) {
  
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };
  
  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {
  
    // Requesting balance method
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [address, "latest"] 
      })
      .then((balance) => {
        // Setting balance
        setdata({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };
  
  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });
  
    // Setting a balance
    getbalance(account);
  };
 

  return (
    <div className="app">
      <header className="clearfix mt-4">
        <h1 style={{textAlign: 'center',fontFamily:"cursive"}}>User profile</h1>
      </header>
      <div className="mb-2" style={{textAlign:'center'}}>
        <Button variant="primary" size="lg" onClick={{btnhandler} }>
          Connect wallet
        </Button>{' '}
        <Button variant="primary" size="lg"  onClick={onbtnck}>
          Transaction 
        </Button>{' '}
        
        
      </div>
      {iso && (
      <form className="m-4" onSubmit={handleSubmit} style={{textAlign: 'center',fontFamily:"cursive"}}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4" style={{textAlign: 'center',fontFamily:"cursive"}}>
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH payment
          </h1>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Recipient Address"
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount in ETH"
              />
            </div>
          </div>
        </main>
      
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full" >
            Pay now
          </button>
      </div>
    </form>
    )}
     
        <div className="app-wrapper" style={{textAlign: 'center',fontFamily:"cursive"}}>
          <div className="app-details" >
           
            <div>
            <div className="app-account">
              <span >Account number:</span>
              {data.address}
            </div>
            <div className="app-balance">
              <span>Balance:</span>
              {data.Balance}
            </div>
            
            </div>
          </div>
          
        </div>
     
    </div>
  );
}

export default Account; */