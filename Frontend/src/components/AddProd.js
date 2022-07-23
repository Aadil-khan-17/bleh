import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Description } from '@ethersproject/properties';


const AddProd = () => {

    let history = useHistory();
    const [image, setImage] = useState(null)
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [description, setDescription] = useState(null)
    const [warranty_period, setWarranty_period] = useState(null)

    const addNewProduct = async () => {
        let formField = new FormData()
        formField.append('name',name)
        formField.append('price',price)
        formField.append('description',description)
        formField.append('warranty_period',warranty_period)

        if(image !== null) {
          formField.append('image', image)
        }

        await axios({
          method: 'post',
          url:'http://localhost:8000/api/product/1/add/',
          data: formField
        }).then(response=>{
          console.log(response.data);
          history.push('/')
        })
    }
   
    return (
        <div className="container">
            <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add a Product</h2>
        

        <div className="form-group">
        <label>Image</label>
             <input type="file" className="form-control" onChange={(e)=>setImage(e.target.files[0])}/>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
         
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Warranty period"
              name="warranty_period"
              value={warranty_period}
              onChange={(e) => setWarranty_period(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className="btn btn-primary btn-block" onClick={addNewProduct}>Add Product</button>
       
      </div>
    </div>
        </div>
    );
};

export default AddProd;