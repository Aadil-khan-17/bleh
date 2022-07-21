import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';

const UpdateProd = () => {

    let history = useHistory();
    const { id } = useParams();

    const [image, setImage] = useState(null)
    const [name, setName] = useState(null)
    const [description, setdescription] = useState(null)
    const [price, setprice] = useState(null)
    const [warranty_period, setwarranty_period] = useState(null)


    useEffect(() => {
        loadStudents();
    }, [])


    // load students by its is and show data to forms by value

   let loadStudents = async () => {
    const result = await axios.get(`http://localhost:8000/api/product/1/8/update/`);
    
    console.log(result.data.name);
    setImage(result.data.image);
    setName(result.data.name);
    setdescription(result.data.description);
    setwarranty_period(result.data.warranty_period);
    setprice(result.data.price);
   }


// Update s single student by id

   const updateSingleStudent = async () => {
        let formField = new FormData()

        formField.append('name',name)
        formField.append('description',description)
        formField.append('price',price)
        formField.append('warranty_period',warranty_period)

        if(image !== null) {
          formField.append('image', image)
        }

        await axios({
            method: 'PUT',
            url: `http://localhost:8000/api/product/1/9/update/`,
            data: formField
        }).then(response => {
            console.log(response.data);
            history.push("/");
        })

    }

    return (
       
        <div className="container">
  <div className="w-75 mx-auto shadow p-5">
    <h2 className="text-center mb-4">Update A Student</h2>
    

    <div className="form-group">
      <img src={image} height="100" width="200" alt="" srcSet="" />
    <label>Upload Image</label>
         <input type="file" className="form-control" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your Name"
          name="name"
          value={name}
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
     
      <div className="form-group">
        <input
          type="description"
          className="form-control form-control-lg"
          placeholder="Enter Description"
          name="description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your warranty_period"
          name="warranty_period"
          value={warranty_period}
          onChange={(e) => setwarranty_period(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your price Name"
          name="price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
        />
      </div>
      <button onClick={updateSingleStudent} className="btn btn-primary btn-block">Update Product</button>
   
  </div>
</div>
 
    );
};

export default UpdateProd;