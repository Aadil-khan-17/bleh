import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Product from "./components/Product";
import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart";
import Modal from './components/Modal';
import Account from './components/Account'
import ProductView from './components/ProductView';
import AddProd from './components/AddProd';
import DeleteProd from './components/DeleteProd';
import UpdateProd from './components/UpdateProd';
import CartDetails from './components/CartDetails';
export default class App extends Component {
  render(){
  return (
    <React.Fragment>
      <Navbar/>
      <Switch>
        <Route  exact path="/" component={ProductView} />
        <Route path="/ProductView" component={ProductView}/>
        <Route path="/Account" component={Account}/>
        <Route path="/AddProd" component={AddProd}/>
        <Route path="/Cart" component={Cart}/>
        <Route path="/DeleteProd" component={DeleteProd}/>
        <Route path="/UpdateProd" component={UpdateProd}/>
        <Route path="/CartDetails" component={CartDetails}/>

        <Route component={Default}/>
      </Switch>
      <Modal />

    </React.Fragment>
  )
  }
}

