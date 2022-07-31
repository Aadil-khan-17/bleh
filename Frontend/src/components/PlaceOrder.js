import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Title from './Title';
import Divider from "@material-ui/core/Divider";

const PlaceOrder = () => {
    let history = useHistory();
    
    const [Order, setOrder] = useState([])
    const orderDetails = async () => {
        const result = await axios.get(`http://127.0.0.1:8000/api/order/1/`);
        console.log(result.data)
        setOrder(result.data)
    }
    const clearOrder = async () => {
        await axios.delete(`http://127.0.0.1:8000/api/order/1/cancel/`)
        history.push("./CartDetails");     
    }
    useEffect(() => {
        
        orderDetails();
    }, [])

    return (
        
            <div className="container">
              <div className="w-75 mx-auto shadow p-5">
              <Title name="Order" title="Details" /><br></br>
                
                <h5 style={{ color: 'black',fontFamily:"arial",fontSize:19}}>Final Products in Order :</h5>
                {Order.map((order, index) => (
                    <Card>
                        <Card.Header  style={{fontFamily:"arial",fontSize:19}}>Product {index+1} :</Card.Header>
                        <Card.Body>
                        <Card.Text style={{fontFamily:"arial",fontSize:14}}>
                            Name : {order.name}<br></br>
                            Price : {order.price}<br></br>
                            Quantity : {order.quantity}<br></br>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                                        
                ))}<br></br>
                <Divider /><br></br>
                    <div>
                    <Button style={{fontFamily:"arial"}} variant="outlined" className="btn btn-outline-danger mb-3 px-5"  onClick={()=> clearOrder()}>
                        Cancel Order
                    </Button>{' '}
                            
                    <Link to={{pathname: '/PaymentScreen',}}>
                        <Button style={{fontFamily:"arial"}} variant="outlined" className="btn btn-outline-success mb-3 px-5">
                            Proceed to PAY
                        </Button>
                    </Link>

                </div>
              </div>
            </div>
        
    );
};

export default PlaceOrder;
