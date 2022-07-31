import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Divider from "@material-ui/core/Divider";
import "bootstrap/dist/css/bootstrap.min.css";
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3';

const PaymentScreen = () => {
    let history = useHistory();
   
    const [address, setAddress] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [isSave, setSave] = useState(false)
    const [acc,setacc]=useState("")
    const [response,setResponse]=useState([])
    const [trans,settrans]=useState(false);
   
    const { library } = useWeb3React();

    async function connect() {
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
           setacc(accounts[0]);
          console.log(accounts[0],"abc");
          await transaction(accounts[0]);
           
    }
   
    
    const transaction= async (acc) => {
            
      const {data} = await axios({
         
          method: 'post',
          url:`http://127.0.0.1:8000/api/token/1/${acc}/`,
      
        })
        settrans(true);
        console.log(data);
        setResponse(data);
          
      }
    

    const addShippingAddress = async () => {
        let formField = new FormData()
        formField.append('address',address)
        formField.append('city',city)
        formField.append('state',state)
        formField.append('postalCode',postalCode)
        console.log(formField.getAll('city'));
        await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/api/order/1/ship/',
          data: {
            "address":address,
            "city": city,
            "state":state,
            "postal_code": postalCode
        }
        }).then(response=>{
          setSave(true);
          console.log(response.data);
         
    })}

    return (
       
            <div className="container">
              <div className="w-75 mx-auto shadow p-5">
              
              <h5 style={{ color: 'black',fontFamily:"arial",fontSize:19}}>Add Shipment address :</h5>
              <Divider /><br></br>    
                    <div className="form-group">
                        <input style={{fontFamily: "arial",fontSize:14}}
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter shipping Address :"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input style={{fontFamily: "arial",fontSize:14}}
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter City :"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                         />
                    </div>
                    <div className="form-group">
                        <input style={{fontFamily: "arial",fontSize:14}}
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter State :"
                        name="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                            
                    <div className="form-group">
                        <input style={{fontFamily: "arial",fontSize:14}}
                        type="text"
                         className="form-control form-control-lg"
                        placeholder="Enter Postal Code :"
                        name="postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                    <button style={{fontFamily: "arial",fontSize:14}} variant="outlined" 
                     className="btn btn-outline-primary mr-2" disabled = {isSave?true:false} onClick={()=>addShippingAddress()}> 
                     {isSave?(
                        <p className="text-capitalize mb-0" disabled>
                          {""}
                          Saved
                        </p>
                        ):(
                            <p className="text-capitalize mb-0" >save</p>
                        )}</button><br></br><br></br>
                    <Divider /><br></br>
                    <h5 style={{ color: 'black',fontFamily:"arial",fontSize:19}}>Payment :</h5>
                    <p style={{fontFamily: "arial",fontSize:14}}>NFT related transactions are initiated using metamask so make sure  pre installed.</p>
                    <p style={{fontFamily: "arial",fontSize:14}}>If not !! install it from the here <i class="fas fa-arrow-right"></i> {' '}
                    <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Install Metamask</a>
                    </p>
                    
                    <p style={{color:"red",fontFamily: "arial",fontSize:14}}>Wallet Address:{acc}</p>
                  
                    <button style={{fontFamily: "arial",fontSize:14}} className="btn btn-success btn-block" 
                    onClick={() => connect()}>Proceed to Pay</button><br></br>
                    <div >
                    {trans?(
                        <p style={{ color: 'red',fontFamily:"arial",fontSize:14}}>
                          {""}
                          Transaction Completed <br></br>Hash id per Token id is as follows :
                        </p>
                        ):(
                            <p></p>
                        )}
                    </div>
                    <p>{response.map((i)=>
                    (<div style={{ color: 'red',fontFamily:"arial",fontSize:14}}>{
                    `${Object.keys(i)[0]}`} : {Object.values(i)[0]
                    }</div>))}</p>
                    <div >
                    {trans?(
                        <p style={{ color: 'red',fontFamily:"arial",fontSize:14}}>
                          {""}
                          Your User Profile is updated with your recent purchase !! <br></br>
                          You can check your payment status using Hash id in the link given 
                          <a href="https://mumbai.polygonscan.com/"> HERE</a>!!
                        </p>
                        ):(
                            <p></p>
                        )}
                    </div>
                 
            </div>
        </div>

    );
};

export default PaymentScreen;