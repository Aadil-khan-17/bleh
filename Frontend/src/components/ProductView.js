import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Product from './Product';

function ProductView() {
    const [Products, setProducts] = useState([])
    let history = useHistory();
    const fetchProducts = async () => {
        const result = await axios.get('http://localhost:8000/api/product/');

        console.log(result.data)
        setProducts(result.data)
    }
    const addCart = async (id) => {
        await axios({
            method: 'post',
            url:`http://127.0.0.1:8000/api/cart/1/${id}/add/`,
        
          }).then(response=>{
            console.log(response.data);
            history.push('/')
          })
      }
      

    useEffect(() => {
        fetchProducts();
    }, [])
   
    return (
       
            <div className="main-Products-show" >
            {
                Products.map((Product, index) => (
                   
                    <Card className="m-3 rounded shadow-lg main-Products-show" style={{ width: '22em'}}>
                    
                    <Link to={{
                        pathname: '/DeleteProd',
                        state: {id: Product.id,r_id:Product.user_id}
                        }}>
                        <Card.Img variant="top" src={'http://127.0.0.1:8000' + Product.image} />
                     </Link>
                    

                    <Card.Body>
                        <Card.Title>Product Id :{Product.id}</Card.Title>
                        <Card.Title>Product Name :{Product.name}</Card.Title>
                        <Card.Text> Product Description :{Product.description} </Card.Text>
                        <Card.Text> Price : {Product.price} </Card.Text>
                        <Card.Text> Retailer Id :{Product.user_id} </Card.Text>
                       
                        <Button variant="primary" size="lg" onClick={() => addCart(Product.id)}>Add to Cart</Button>{' '}
                        
                        <Link to={{
                            pathname: '/CartDetails',
                            state: {id: Product.id}
                            }}>
                            <Button variant="primary" size="lg" >Go to Cart</Button>{' '}
                        </Link>
           

                    </Card.Body>
                    </Card>
                  
                ))

            }
            </div>
     
    );
};

export default ProductView