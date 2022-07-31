import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const DeleteProd = (props) => {

  const [Products, setProducts] = useState([])
  const history = useHistory();
  
  const getSingleProducts = async () => {
    const  { data } = await axios.get(`http://127.0.0.1:8000/api/product/${props.location.state.id}/`)
    console.log(data);
    setProducts(data);
  }
  const deleteUser = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/product/${id}/delete/`)
    history.push("/")
  }
  const addCart = async (id) => {
    await axios({
        method: 'post',
        url:`http://127.0.0.1:8000/api/cart/1/${id}/add/`,
    
      }).then(response=>{
        
        console.log(response.data);
        history.go(0);
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
            <p class="card-text" style={{fontFamily: "arial"}}>{Products.description}</p>
            <p class="card-text" style={{fontFamily: "arial"}}>Warranty period : {Products.warranty_period } yrs.</p>
            <p class="card-text" style={{fontFamily: "arial"}}>Price: Rs.{Products.price}</p>

            
            <div style={{textAlign:"center"}}>
            <p>
                <Link to={{
                    pathname: '/UpdateProd',
                    state: {id: props.location.state.id, r_id:props.location.state.r_id}
                }}> 
                    <Button style={{fontFamily: "arial"}} variant="outlined" className="btn btn-outline-primary mb-3 px-5">
                    Update</Button>{' '}         
                </Link>
                
                <Button style={{fontFamily: "arial"}} variant="outlined" className="btn btn-outline-danger mb-3 px-5" onClick={() => deleteUser(Products.id)}>
                    Delete
                </Button>{' '}
             </p>
              <p>
                  <Button style={{fontFamily: "arial"}} variant="outlined" className="btn btn-outline-primary mb-3 px-5" onClick={() => addCart(Products.id)}>
                    Add to Cart</Button>{' '}
                  <Link to={{pathname: '/CartDetails',}}>
                  <Button style={{fontFamily: "arial"}} variant="outlined" className="btn btn-outline-success mb-3 px-5">
                    Go to Cart</Button>{' '}</Link>
                 
              </p>
             </div>
             </div>
            </div>
            </div>
          </div>
        
    );
};

export default DeleteProd;