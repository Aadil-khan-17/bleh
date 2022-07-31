import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Title from './Title';
import Divider from "@material-ui/core/Divider";

function CartDetails(props) {
    let history = useHistory();
    const [Product, setProduct] = useState([])
    const [Total, setTotal] = useState([])

    const addOrder = async () => {
        await axios({
            method: 'post',
            url:`http://127.0.0.1:8000/api/order/1/add/`,
        
          }).then(response=>{
            
            console.log(response.data);
            history.push("./PlaceOrder");
          })
    }
    const fetchProduct = async () => {
        const result = await axios.get(`http://127.0.0.1:8000/api/cart/1/`);
        console.log(result.data)
        setProduct(result.data)
    }
    
    const totalProduct = async () => {
        const result1 = await axios.get(`http://127.0.0.1:8000/api/cart/1/total/`);
        console.log(result1.data)
        setTotal(result1.data)
    }
    const deleteItem = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/cart/1/${id}/delete/`)
        history.go(0);
    }
    const clearCart = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/cart/1/clear/`)
        history.go(0);
    }
      
    const incCart = async (id) => {
        await axios({
            method: 'PUT',
            url: `http://127.0.0.1:8000/api/cart/1/${id}/`,
            
        }).then(response => {
            console.log(response.data);
            history.go(0);
        })
    }
    const decCart = async (id) => {
        await axios({
            method: 'PUT',
            url: `http://127.0.0.1:8000/api/cart/1/${id}/dec/`,
            
        }).then(response => {
            console.log(response.data);
            history.go(0);
        })
    }

    useEffect(() => {
        fetchProduct();
        totalProduct();
        
    }, [])
   
    return (
        
           
            <React.Fragment>
            <Title name="Your" title="Cart" /><br></br>
            <Divider /><br></br>
            <div className="main-Product-show" >
                {Product.map((prods, index) => (
                    <div style={{marginBottom:15}}>
                        <div className="row my-8 text-capitalize text-center">
                        <div style={{ color: 'black',fontFamily:"arial",fontSize:16}} className="col-10 mx-auto col-lg-2">
                            
                                {index+1}
                        </div>
                        <div style={{ color: 'black',fontFamily:"arial",fontSize:16}} className="col-10 mx-auto col-lg-2">
                           
                                {prods.name}
                        </div>
                        <div style={{ color: 'black',fontFamily:"arial",fontSize:16}} className="col-10 mx-auto col-lg-2">
                             <span > Rs. </span>
                                {prods.price}
                        </div>
                        <div style={{ color: 'black',fontFamily:"arial",fontSize:16}} className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                            <div className="d-flex justify-content-center">
                            </div>
            
                            <span className="btn btn-black mx-1" onClick={()=> decCart(prods.product_id)}> - </span>
                            <span className="btn btn-black mx-1">
                                {prods.quantity}
                            </span>
            
                            <span className="btn btn-black mx-1" onClick={()=> incCart(prods.product_id)}> + </span>
            
                        </div>
                   
                        <div style={{ color: 'black',fontFamily: "arial",fontSize:16}} className="col-10 mx-auto col-lg-2">
                            <div className="cart-icon" onClick={() => deleteItem(prods.product_id)}>
                                 <i className="fas fa-trash"></i>
                            </div>
            
                        </div>
                        <div style={{ color: 'black',fontFamily: "arial",fontSize:16}} className="col-10 mx-auto col-lg-2">
                            <strong>Final: Rs. {prods.total_amount} </strong>
                        </div>
            
                        </div>
                    </div>
                    
                ))
                }
             <Divider />
                <div style={{alignSelf: 'flex-end',textAlign:"right",marginRight:25}}>
                    {Total.map((tol, index) => (
                        
                            <div style={{ fontWeight:900,marginRight :10,color: 'black',fontFamily:"arial",fontSize:16}}>
                                Order Total : {tol.total}
                            </div>
                    ))
                    }<br></br>
                    <div>  
                        <button style={{ fontFamily:"arial"}} className="btn btn-outline-danger mb-3 px-5" type="button" onClick={()=> clearCart()}>
                            Clear Cart 
                        </button>{' '}
                            
                        <button style={{fontFamily:"arial"}} className="btn btn-outline-success mb-3 px-5" type="button" onClick={()=>addOrder()}>
                        Place Order
                        </button>
                    </div>
                </div>
            
            </div>

        </React.Fragment>
              
     
    );
};

export default CartDetails