import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductView() {
    const [students, setStudents] = useState([])

    const fetchStudents = async () => {
        const result = await axios.get('http://localhost:8000/api/product/');

        console.log(result.data)
        setStudents(result.data)
    }

    useEffect(() => {
        fetchStudents();
    }, [])

   

    return (
        <div>

            <div className="main-students-show">
            {
                students.map((student, index) => (
                    <Card className="m-3 rounded shadow-lg main-students-show" style={{ width: '22em' }}>

                    <Card.Img variant="top" src={'http://127.0.0.1:8000' + student.image} />

                    <Card.Body>
                        <Card.Title>Product Id :{student.id}</Card.Title>

                        <Card.Title>Product Name :{student.name}</Card.Title>
                        <Card.Text> Product Description :{student.description} </Card.Text>
                        <Card.Text> Price : {student.price} </Card.Text>
                        <Card.Text> Retailer Id :{student.retailer_id} </Card.Text>
        

                    </Card.Body>
                    </Card>
                ))

            }
            </div>
           
            
        </div>
    );
};

export default ProductView