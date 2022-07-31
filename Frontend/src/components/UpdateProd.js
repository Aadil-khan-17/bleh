import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';

const UpdateProd = (props) => {
    let history = useHistory();

    const [image, setImage] = useState(null)
    const [name, setName] = useState(null)
    const [description, setdescription] = useState(null)
    const [price, setprice] = useState(null)
    const [warranty_period, setwarranty_period] = useState(null)

   let loadProducts = async () => {
    const result = await axios.get(`http://127.0.0.1:8000/api/product/${props.location.state.id}/`);
    
    console.log(result.data.name);
    setImage(result.data.image);
    setName(result.data.name);
    setdescription(result.data.description);
    setwarranty_period(result.data.warranty_period);
    setprice(result.data.price);
   }

   const updateSingleProduct = async () => {
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
            url: `http://localhost:8000/api/product/${props.location.state.r_id}/${props.location.state.id}/update/`,
            data: formField
        }).then(response => {
            console.log(response.data);
            history.push("/");
        })

    } 
    
    useEffect(() => {
      loadProducts();
    }, [])

    return (
       
        <div className="container">
          <div className="w-75 mx-auto shadow p-5">
            <h2 className="text-center mb-4" style={{fontFamily: "arial"}}>Update Product</h2>
    
            
              <div className="form-group">
              <label style={{fontFamily: "arial",fontWeight:500}}>Upload Product Image :</label><br></br>
                <img src={'http://127.0.0.1:8000' + image} height="100" width="200" alt="" srcSet="" />
                  
                  <input style={{fontFamily: "arial"}} type="file" className="form-control" defaultValue={image} onChange={(e)=>setImage(e.target.files[0])}/>
              </div>

              <div className="form-group">
              <label style={{fontFamily: "arial",fontWeight:500}}>Chnage Product Name:</label><br></br>
                <input style={{fontFamily: "arial"}}
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
              <label style={{fontFamily: "arial",fontWeight:500}}>Change Description :</label><br></br>
                <input style={{fontFamily: "arial"}}
                  type="description"
                  className="form-control form-control-lg"
                  placeholder="Enter Description"
                  name="description"
                  value={description}
                  defaultValue={description}
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>
              <div className="form-group">
              <label style={{fontFamily: "arial",fontWeight:500}}>Change product Warranty :</label><br></br>
                <input style={{fontFamily: "arial"}}
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your warranty_period"
                  name="warranty_period"
                  value={warranty_period}
                  defaultValue={warranty_period}
                  onChange={(e) => setwarranty_period(e.target.value)}
                />
              </div>
              <div className="form-group">
              <label style={{fontFamily: "arial",fontWeight:500}}>Change Product Price :</label><br></br>
                <input style={{fontFamily: "arial"}}
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your price Name"
                  name="price"
                  value={price}
                  defaultValue={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
              <button style={{fontFamily: "arial"}} onClick={updateSingleProduct} className="btn btn-primary btn-block">Update Product</button>
          
        </div>
      </div>
 
    );
};

export default UpdateProd;