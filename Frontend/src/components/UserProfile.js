import React from 'react';
import { Carousel } from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Divider from "@material-ui/core/Divider";
import {Row,Col} from 'react-bootstrap';

const UserProfile = () => {
    const [User, setUser] = useState([]);
    const [NFTd, setNft] = useState([]);

    const fetchUserDetails = async () => {
        const result = await axios.get('http://127.0.0.1:8000/api/user/2/');

        console.log(result.data)
        setUser(result.data)
    }

    const fetchNFTDetails = async () => {
        const result = await axios.get('http://127.0.0.1:8000/api/nft/2/');

        console.log(result.data)
        setNft(result.data)
    }
    useEffect(() => {
        fetchUserDetails();
        fetchNFTDetails();
    }, [])

    return (
        
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <div class="text-center"> 
		<img src="https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=" width="100" class="rounded-circle"/>
            <h3 style={{fontFamily:"arial"}} class="mt-2">{User.first_name} {User.last_name}</h3>
			<span style={{fontFamily:"arial"}}class="mt-1 clearfix">{User.email}</span>
            <span style={{fontFamily:"arial"}} class="mt-1 clearfix">{User.mobile_no}</span><br></br>
			<Divider/><br></br>
            
			  <Row class="row mt-2 mb-2">
			
			  <Col class="col-md-4">
				<h5 style={{fontFamily:"arial",fontSize:14}}>Digital collectibles</h5>
				<span style={{fontFamily:"arial",fontSize:14}} class="num">{NFTd.length}</span>
			  </Col>
			  <Col class="col-md-4">
			  <h5 style={{fontFamily:"arial",fontSize:14}}>User Name</h5>
				<span style={{fontFamily:"arial",fontSize:14}}>{User.username}</span>
			  </Col>
			 
			  </Row>
			
			  <hr class="line"/>
            <div>
               <h5>Digital Collection :</h5>
                      <Carousel>
                        { NFTd.map((nft, index) => (
                          <Carousel.Item  key={nft.id} style={{fontFamily:"arial"}}>
                            <Link to={{
                              pathname: '/NFTDetails',
                              state: {token_id: nft.token_id,
                              product_id:nft.product_id,
                              acc_address:nft.acc_address,
                              expiry_date:nft.expiry_date,diff:nft.diff,
                              redeem:nft.redeem}}}>
                              <img className="d-block w-100"
                                src={'http://127.0.0.1:8000' + nft.image} alt="nft"/></Link>
                              <Carousel.Caption>
                                <h3 style={{fontFamily:"arial"}}>{nft.name}</h3>
                              </Carousel.Caption>
                          </Carousel.Item>

                          ))}
                      </Carousel>
            </div>
			  </div>
      </div>
    </div>

    );
};

export default UserProfile;