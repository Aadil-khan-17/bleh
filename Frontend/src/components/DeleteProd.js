import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
const DeleteProd = (props) => {

  const [student, setSetudent] = useState([])
  const history = useHistory();
  console.log(props.location.state);
  useEffect(() => {
    getSingleStudent();
  },[])
  const getSingleStudent = async () => {
    const  { data } = await axios.get(`http://127.0.0.1:8000/api/product/${props.location.state.id}/`)
    console.log(data);
    setSetudent(data);
  }
  const deleteUser = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/product/${id}/delete/`)
    history.push("/")
  }
  return (
        <div>
            <h2>Detail of Single Students </h2>
            <hr></hr>
            <div className="full-student-detail" style={{textAlign:"center"}}>
                <img src={'http://127.0.0.1:8000' + student.image} height="400" width="300"/>
                <div className="student-detail" style={{textAlign:"center"}}>
                    <p>Product id :{student.id}</p>
                    <p>Product Name:{student.name}</p>
                    <p>Product price :{student.price}</p>
                    <p>Description :{student.description}</p>
                    <p>Warranty Period :{student.warranty_period}</p>
                </div> 
            </div>
            <div style={{textAlign:"center"}}>
            <Link to={{
                pathname: '/UpdateProd',
                state: {id: props.location.state.id, r_id:props.location.state.r_id}
            }}>
                <Button variant="primary" size="lg" >
                Update</Button>{' '}
                       
            </Link>
            
            <Button variant="primary" size="lg" onClick={() => deleteUser(student.id)}>
                Delete
             </Button>{' '}
            </div>


        </div>
    );
};

export default DeleteProd;