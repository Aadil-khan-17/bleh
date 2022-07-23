import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Title from './Title';

function CartDetails(props) {
    const [Product, setProduct] = useState([])
    const [Total, setTotal] = useState([])
    let history = useHistory();
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
        history.push("/")
    }
    const clearCart = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/cart/1/clear/`)
        history.push("/")
    }
    const incCart = async (id) => {
        await axios({
            method: 'PUT',
            url: `http://127.0.0.1:8000/api/cart/1/${id}/`,
            
        }).then(response => {
            console.log(response.data);
            history.push("/");
        })
    }
    const decCart = async (id) => {
        await axios({
            method: 'PUT',
            url: `http://127.0.0.1:8000/api/cart/1/${id}/dec/`,
            
        }).then(response => {
            console.log(response.data);
            history.push("/");
        })
    }

    useEffect(() => {
        fetchProduct();
        totalProduct();
    }, [])
   
    return (
           
            <React.Fragment>
            <Title name="your" title="cart" />
            <div className="main-Product-show" >
                {Product.map((prods, index) => (
                    <div style={{marginBottom:15}}>
                        <div className="row my-8 text-capitalize text-center">
                        <div className="col-10 mx-auto col-lg-2">
                            
                                {index+1}
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                           
                                {prods.name}
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                             <span > Rs. </span>
                                {prods.price}
                        </div>
                        <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                            <div className="d-flex justify-content-center">
                            </div>
            
                            <span className="btn btn-black mx-1" onClick={()=> decCart(prods.product_id)}> - </span>
                            <span className="btn btn-black mx-1">
                                {prods.quantity}
                            </span>
            
                            <span className="btn btn-black mx-1" onClick={()=> incCart(prods.product_id)}> + </span>
            
                        </div>
                   
                        <div className="col-10 mx-auto col-lg-2">
                            <div className="cart-icon" onClick={() => deleteItem(prods.product_id)}>
                                 <i className="fas fa-trash"></i>
                            </div>
            
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <strong>Total Price: Rs. {prods.total_amount} </strong>
            
                        </div>
            
                        </div>
                    </div>
                    
                ))
                

            }
            <div>
                {Total.map((tol, index) => (
                       
                        <div className="col-10 mx-auto col-lg-2" style={{float : "right"}}>
                            Order Total : {tol.total}
                        </div>
                ))
                }
            </div>
            <div style={{textAlign:"center"}} >
            <Link to ="./CartDetails" >
                <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button" onClick={()=> clearCart()}>
                    Clear Cart 
                </button>
            </Link>
            <Link to ="./Account" >
                <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button">
                    Place Order
                </button>
            </Link>
            
            </div>
            </div>

        </React.Fragment>
              
     
    );
};

export default CartDetails