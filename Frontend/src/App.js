import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import Navbar from "./components/Navbar";
import Default from "./components/Default";
import ProductView from './components/ProductView';
import AddProd from './components/AddProd';
import DeleteProd from './components/DeleteProd';
import UpdateProd from './components/UpdateProd';
import CartDetails from './components/CartDetails';
import UserProfile from './components/UserProfile';
import PlaceOrder from './components/PlaceOrder' 
import PaymentScreen from './components/PaymentScreen';
import NFTDetails from './components/NFTDetails';

export default class App extends Component {
  render(){
  return (
    <React.Fragment>
      <Navbar/>
      <Switch>
        <Route  exact path="/" component={ProductView} />
        <Route path="/ProductView" component={ProductView}/>   
        <Route path="/AddProd" component={AddProd}/>
        <Route path="/DeleteProd" component={DeleteProd}/>
        <Route path="/UpdateProd" component={UpdateProd}/>
        <Route path="/CartDetails" component={CartDetails}/>
        <Route path="/UserProfile" component={UserProfile}/>
        <Route path="/PlaceOrder" component={PlaceOrder}/>
        <Route path="/PaymentScreen" component={PaymentScreen}/>
        <Route path="/NFTDetails" component={NFTDetails}/>

        <Route component={Default}/>
      </Switch>

    </React.Fragment>
  )
  }
}

