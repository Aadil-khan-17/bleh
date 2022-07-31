import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Web3 from 'web3';
import contractABI from "../Contract.json";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

const NFTDetails = (props) => {

  const [Products, setProducts] = useState([]);
  const [isRepair, setRepair] = useState(false);
  const [isCheck, setCheck] = useState(false);
  const [username, setUsername] = useState(null)
  const [acc, setAcc] = useState(null)
  const [response,setResponse] = useState([])
  const history = useHistory();
  const [trans,settrans]=useState(false);
  const [pro,setPro]=useState(true);
  const date1=new Date(props.location.state.expiry_date);
  const date2=new Date();
  const [isShow, invokeModal] = React.useState(false)

  const initModal = () => {
     return invokeModal(!isShow)
  }
  

  const getSingleProducts = async () => {
    const  { data } = await axios.get(`http://127.0.0.1:8000/api/product/${props.location.state.product_id}/`)
    console.log(data);
    setProducts(data);
  }
  
 async function transferHistory(){
    window.web3 = new Web3(window.ethereum);
    const web3 = new Web3(window.ethereum);
    const block = await web3.eth.getBlockNumber();
    const contractAddress = "0x74EE8f104FCABE391C8d9d07A14b7bc1A650bf54"
    const contractInstance = new web3.eth.Contract(contractABI,contractAddress);
    contractInstance.getPastEvents('Transfer', {
                  // filter: {from:'0xbf6f03450452271073877Bb4A36A5c4ED6244957' },
                  fromBlock: block-999,
                  toBlock: 'latest'
    }, (error, events) => { 
        if (!error){
            settrans(true)
            console.log(events)
            setResponse(events)
        }
    })
   
  }
  

  async function repair(){
    if(window.ethereum) {
      console.log('detected');

      try {
          await window.ethereum.enable()
        
      } catch (ex) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
         
    console.log(accounts[0]);
    if(accounts[0]==props.location.state.acc_address && date1>date2){
      setRepair(true);
      console.log("repair initiated");
    }else{
      setCheck(true);
    }


  }
  async function transfer(username,acc){
    window.web3 = new Web3(window.ethereum);
    const web3 = new Web3(window.ethereum);
    console.log(username,acc);

    const contractAddress = "0x74EE8f104FCABE391C8d9d07A14b7bc1A650bf54"
    const contractInstance = new web3.eth.Contract(contractABI,contractAddress);
    const transaction = {
          from: props.location.state.acc_address,
          to: "0x74EE8f104FCABE391C8d9d07A14b7bc1A650bf54", //contractAddress of the concerned token (same in data below)
          data: contractInstance.methods.transfer(
            props.location.state.acc_address,
            acc,
            props.location.state.token_id
          ).encodeABI()
          //value given by user should be multiplied by 1000
        };
        await window.web3.eth
          .sendTransaction(transaction)
          .on("confirmation", function (confirmationNumber, result) {
            if (result && confirmationNumber === 1) {
              const transactionHash = result.transactionHash;
              console.log("transaction" , transactionHash);
              
            }
    
        });
        console.log("abc");
       await updateTransfer(username,acc);
   
  }
  async function redeem(){
    window.web3 = new Web3(window.ethereum);
    const web3 = new Web3(window.ethereum);
    console.log(username,acc);

    const contractAddress = "0x74EE8f104FCABE391C8d9d07A14b7bc1A650bf54"
    const contractInstance = new web3.eth.Contract(contractABI,contractAddress);
    const transaction = {
          from: props.location.state.acc_address,
          to: "0x74EE8f104FCABE391C8d9d07A14b7bc1A650bf54", //contractAddress of the concerned token (same in data below)
          data: contractInstance.methods.applyExpiryDiscount(
            props.location.state.token_id
          ).encodeABI()
          //value given by user should be multiplied by 1000
        };
        await window.web3.eth
          .sendTransaction(transaction)
          .on("confirmation", function (confirmationNumber, result) {
            if (result && confirmationNumber === 1) {
              const transactionHash = result.transactionHash;
              console.log("transaction" , transactionHash);
              
            }
    
        });
        console.log("abc");
       await updateWarranty();
       await updateRedeem();
   
  }

  const updateWarranty=async ()=>{
    await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/api/warranty/${props.location.state.token_id}/`,
     
  }).then(response => {
      alert('Surprise !! Your Warranty duration is extended !!')
      console.log(response.data);
      history.push("./UserProfile");
  })

  }
  const updateRedeem=async ()=>{
    await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/api/redeem/${props.location.state.token_id}/`,
     
  }).then(response => {
     
      console.log(response.data);
      history.push("./UserProfile");
  })

  }

  const updateTransfer = async (username,acc) => {
    console.log(username,acc,props.location.state.token_id)
      
    await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/api/nft/${props.location.state.token_id}/${username}/${acc}/update/`,
     
  }).then(response => {
      alert('Transfer Completed!!')
      console.log(response.data);
      history.push("./UserProfile");
  })

 }


  useEffect(() => {
    getSingleProducts();
  },[])

    return (
      <div class="e-card e-card-horizontal" style={{marginLeft:30,marginTop:30,marginBottom:30,marginRight:30}}>
      <div class="row no-gutters">
          <div class="col-md-4">
          <img src={'http://127.0.0.1:8000' + Products.image} height="400" width="400"/>
          </div>
          <div class="col-md-8">
          <div class="card-body">
          <h5 style={{fontFamily: "Georgia, serif",fontSize:30 }} class="card-title">{Products.name}</h5>
          <p style={{fontFamily: "arial"}}>User account address :{props.location.state.acc_address}</p>
                <p style={{fontFamily: "arial"}}>Token Id: {props.location.state.token_id}</p>
                <p style={{fontFamily: "arial"}}>Expiry Date: {props.location.state.expiry_date}</p>
                <p style={{fontFamily: "arial"}}>Warranty time remaining : {props.location.state.diff}</p>
                <p style={{fontFamily: "arial"}}>{Products.description}</p>
                <p style={{fontFamily: "arial"}}>Price: Rs.{Products.price}</p>
          <p class="card-text" style={{fontFamily: "arial"}}><small class="text-muted">In case of any defect within the warranty period apply for 
            repair/replacement!</small></p>
          
            <button style={{fontFamily: "arial",fontSize:14}} variant="outlined" 
                     className="btn btn-outline-primary mr-2" disabled = {isRepair?true:false} onClick={()=>repair()}> 
                     {isRepair?(
                        <p className="text-capitalize mb-0" disabled>
                          {""}
                          Repair initiated
                        </p>
                        ):(
                            <p className="text-capitalize mb-0" >Need Repair?</p>
                        )}</button>{' '}
               
                 <button style={{fontFamily: "arial",fontSize:14}} variant="outlined" 
                     className="btn btn-outline-primary mr-2"onClick={initModal}>Transfer</button>{' '}
                      <Modal show={isShow}>
                        <Modal.Header closeButton onClick={initModal}>
                        <Modal.Title style={{fontFamily:"arial"}} >Add Receiver's Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                         
                        <div>
                        <label style={{fontFamily:"arial",fontSize:14}}>Add Username:</label><br></br>
                            <div className="form-group">
                              <input style={{fontFamily: "arial",fontSize:14}}
                               type="text"
                               className="form-control form-control-lg"
                               placeholder="Enter Reciever's username"
                               name="username"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}

                              />
                            </div>
                            <label style={{fontFamily:"arial",fontSize:14}}>Add Receiver's Metamask Account address:</label><br></br>
                            <div className="form-group">
                              <input style={{fontFamily: "arial",fontSize:14}}
                               type="text"
                               className="form-control form-control-lg"
                               placeholder="Enter metamask account address"
                               name="acc"
                               value={acc}
                               onChange={(e) => setAcc(e.target.value)}
                           
                              />
                            </div>
                        </div>
                        
                        </Modal.Body>
                        <Modal.Footer>
                        <Button style={{fontFamily:"arial"}} variant="outlined" className="btn btn-outline-danger mb-3 px-5" onClick={initModal}>
                            Close
                        </Button>
                        
                        <Button style={{fontFamily:"arial"}} variant="outlined" className="btn btn-outline-success mb-3 px-5"  onClick={() => transfer(username,acc)}>
                            Transfer
                        </Button>
                        
                        </Modal.Footer>
                    </Modal>
                     <button style={{fontFamily: "arial",fontSize:14}}  variant="outlined" 
                     className="btn btn-outline-primary mr-2"
                    onClick={() => transferHistory()}>See transfer History</button>{' '}
                    <button style={{fontFamily: "arial",fontSize:14}}  variant="outlined"  disabled = {props.location.state.redeem? false:true}
                       className="btn btn-outline-success mr-2" onClick={() => redeem()}>
                      {props.location.state.redeem?(
                        <p className="text-capitalize mb-0">
                          Redeem Gift</p>
                        ):(
                            <p className="text-capitalize mb-0" disabled>Already Redeemed</p>
                        )}</button><br></br>

                     <p> {isCheck?(
                        <p style={{fontFamily:"arial",color:"red"}} className="text-capitalize mb-0" disabled>
                          {""}<br></br>
                          Make sure you are connected with same metamask account. <br></br>if connected! then your warranty period is over!!! Repair cant be initiated. 
                        </p>
                        ):(
                            <p className="text-capitalize mb-0" ></p>
                        )}</p>
                    <div >
                    {trans?(
                        <p style={{ color: 'red',fontFamily:"arial",fontSize:14}}>
                          {""}
                          Transfer history of this product is as follows:
                        </p>
                        ):(
                            <p></p>
                        )}
                    </div>
                    <div>
                      {response.map((res, index) => {
                        if (res.returnValues[0]!="0x0000000000000000000000000000000000000000" 
                        && res.returnValues[1]!="0x0000000000000000000000000000000000000000"){
                          return <div style={{ color: 'Brown',fontFamily:"arial",fontSize:12}}>
                          <p>{index}</p>
                          <p>from :{res.returnValues[0]}</p>
                          <p>to :{res.returnValues[1]}</p>
                          <p>Token ID :{res.returnValues[2]}</p>
                        </div>;

                        }
    
                      })}
                    </div>
                  
           </div>
          </div>
          </div>
        </div>
      
    );
};

export default NFTDetails;