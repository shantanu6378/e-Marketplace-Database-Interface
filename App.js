import React from 'react';
import './App.css';
import {useState} from 'react';
import Axios  from 'axios';




function App() {
  
  const [customerId, setcustomerId] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setpassword] = useState('');

  const [sellerId, set_sellerId] = useState('');
  const [sellerFirstName, set_sellerFirstName] = useState('');
  const [sellerLastName, set_sellerLastName] = useState('');
  const [sellerLocation, set_sellerLocation] = useState('');
  
  let [product_list, set_product_list] = useState([]);
  let [product_name, set_product_name] = useState('');

  const [newProductId, set_newProductId] = useState('');
  const [quantity, set_quantity] = useState('');
  const [orderAddress, set_orderAddress] = useState('');
  const [city, set_city] = useState('');
  const [custId, set_custId] = useState('');
  const [custPassword, set_custPassword] = useState('');

  const [del_id, set_del_id] = useState('');

  const [update_id, set_update_id] = useState('');
  const [update_firstName, set_update_firstName] = useState('');
  const [update_lastName, set_update_lastName] = useState('');

  const [oldSellerId, set_oldSellerId] = useState('');
  const [addProduct, set_addProduct] = useState('');

  const insertvalue = () =>{
    Axios.post('http://localhost:3001/api/insert', {
      customerId: customerId,
      firstName: firstName,
      lastName: lastName,
      password: password

    }).then(() => {
      alert('Successful insert')
    } )
  
  };

  const insertSellerInfo = () =>{
    Axios.post('http://localhost:3001/api/insertSeller', {
      sellerId: sellerId,
      sellerFirstName: sellerFirstName,
      sellerLastName: sellerLastName,
      sellerLocation: sellerLocation

    }).then(() => {
      alert('Successful insert')
    } )
  };

  const addToInventory = () =>{
    Axios.post('http://localhost:3001/api/addToInv', {
      oldSellerId: oldSellerId,
      addProduct: addProduct

    }).then(() => {
      alert('Successful insert')
    } )
  };

  const showProducts = () =>{
    Axios.get('http://localhost:3001/api/productList').then((response) => {
      set_product_name(product_name);
      set_product_list(response.data);
    })

  };

  const createOrder = () =>{

    Axios.post('http://localhost:3001/api/createOrder', {
    newProductId: newProductId,
    orderAddress: orderAddress,
    quantity: quantity,
    city: city,
    custId: custId,
    custPassword: custPassword

    }).then( () => {
      alert('Order created and database updated!')
    } )
  };

  const deletevalue = () =>{
    Axios.post('http://localhost:3001/api/delete', {
    del_id: del_id
    }).then( () => {
      alert('Successful delete')
    } )

  };

  const updatevalue = () =>{
    Axios.post('http://localhost:3001/api/update', {
    update_id: update_id,
    update_firstName: update_firstName,
    update_lastName: update_lastName

    }).then( () => {
      alert('Successful update')
    } )

  };
 


  return (
    <div className="App">
      <p></p>
      <h1>e-Marketplace</h1>
      <h2>New User:</h2>
      <div className='userinformation'>
        <label>ID:</label>
        <input type="number" name = 'customerId' onChange={(e) => {
          setcustomerId(e.target.value)
        }} ></input>
        <label>First Name:</label>
        <input type="text" name = 'firstName' onChange={(e) => {
          setfirstName(e.target.value)
        }} ></input>
        <label>Last Name:</label>
        <input type="text" name = 'lastName' onChange={(e) => {
          setlastName(e.target.value)
        }} ></input>
        <label>Password</label>
        <input type="text" name = 'password' onChange={(e) => {
          setpassword(e.target.value)
        }} ></input>
        <p></p>
        <button onClick={insertvalue}>Register</button>

      </div>

      <p></p>

      
      <div className='userupdate'>
        <label>ID:</label>
        <input type="number" name = 'update_id' onChange={(e) => {
          set_update_id(e.target.value)
        }} ></input>

        <label>First Name:</label>
        <input type="text" name = 'update_firstName' onChange={(e) => {
          set_update_firstName(e.target.value)
        }} ></input> 

        <label>Last Name:</label>
        <input type="text" name = 'update_lastName' onChange={(e) => {
          set_update_lastName(e.target.value)
        }} ></input>
        <p></p>


<button onClick={updatevalue}>Update</button>
        </div>
      
      <p></p>


      <div className='searchproduct'>
      <label>Search Product:</label>
        <input type="text" name = 'product_name' onChange={(e) => {
          set_product_name(e.target.value)
        }} ></input>
        <p></p>
      
      <button onClick = {showProducts}>Show Products</button>
        {product_list.filter((val)=>{
          if (product_name == ""){
            return ""
          } else if (val.Name.toLowerCase().startsWith(product_name.toLowerCase())){
            return val
          }
        }).map((val, key) => {
          return <div className='productdsiplay'> 
            <h3>Product Name: {val.Name}</h3>
            <h4>Product ID: {val.ID}</h4>
            <h4>Price: {val.Price}</h4>
            </div>;
        })
        }
      </div>
        
      <p></p>

      <div className='userinformation'>
        <label>Enter User ID:</label>
        <input type="number" name = 'custId' onChange={(e) => {
          set_custId(e.target.value)
        }} ></input>
        <label>Enter Password:</label>
        <input type="text" name = 'custPassword' onChange={(e) => {
          set_custPassword(e.target.value)
        }} ></input>
        <label>Product ID:</label>
        <input type="number" name = 'newProductId' onChange={(e) => {
          set_newProductId(e.target.value)
        }} ></input>
        <label>Quantity:</label>
        <input type="number" name = 'quantity' onChange={(e) => {
          set_quantity(e.target.value)
        }} ></input>
        <label>Address:</label>
        <input type="text" name = 'orderAddress' onChange={(e) => {
          set_orderAddress(e.target.value)
        }} ></input>
        <label>City:</label>
        <input type="text" name = 'city' onChange={(e) => {
          set_city(e.target.value)
        }} ></input>
        <p></p>
        <button onClick={createOrder}>Create Order</button>
        
      </div>

      
      <p></p>
      <h2>Merchant Information:</h2>
      <h3>New Merchant:</h3>
      <div className='userinformation'>
        <label>Seller ID:</label>
        <input type="number" name = 'sellerId' onChange={(e) => {
          set_sellerId(e.target.value)
        }} ></input>
        <label>First Name:</label>
        <input type="text" name = 'sellerFirstName' onChange={(e) => {
          set_sellerFirstName(e.target.value)
        }} ></input>
        <label>Last Name:</label>
        <input type="text" name = 'sellerLastName' onChange={(e) => {
          set_sellerLastName(e.target.value)
        }} ></input>
        <label>Location:</label>
        <input type="text" name = 'sellerLocation' onChange={(e) => {
          set_sellerLocation(e.target.value)
        }} ></input>
        <p></p>
        <button onClick={insertSellerInfo}>Register</button>

      </div>
      
      <p></p>

      <h3>Existing Merchant:</h3>
      <div className='userinformation'>
        <label>Seller ID:</label>
        <input type="number" name = 'oldSellerId' onChange={(e) => {
          set_oldSellerId(e.target.value)
        }} ></input>
        <label>Product ID:</label>
        <input type="text" name = 'addProduct' onChange={(e) => {
          set_addProduct(e.target.value)
        }} ></input>
        <p></p>
        <button onClick={addToInventory}>Add Product</button>

      </div>
      
      <p></p>
      <h2>Admin Use</h2>
      <div className='userinformation'>
        <label>User ID:</label>
        <input type="number" name = 'del_id' onChange={(e) => {
          set_del_id(e.target.value)
        }} ></input>
        <p></p>

        <button onClick={deletevalue}>Delete</button>

      </div>
      

      <p></p>

  </div> 
  
  );
}

export default App;
