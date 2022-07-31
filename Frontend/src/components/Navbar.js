import React, { Component } from 'react'
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {ButtonContainer} from './Button';

//1.15.00 de kaldım
export default class Navbar extends Component{

    render(){
        return (
           <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
               <Link to = '/'>
               <i class="fas fa-shopping-bag fa-2x" aria-hidden="true"></i></Link>
               <div>
                    <Link to = "/" className="nav-link">
                        <h1 style={{fontSize: 30, fontFamily: "Georgia, serif"}}>FlipKart-Grid</h1>
                    </Link>
               </div>
               <div className='ml-auto'>
               <Link to='/CartDetails'>
              
                  <ButtonContainer>
                    <span className="mr-2" style={{color: "white",fontFamily:"Georgia, serif",fontSize:18}}>
                    <i style={{marginRight: 10,fontSize: 20}} className="fas fa-cart-plus" />
                       My cart
                    </span>
                     
                   </ButtonContainer>

               </Link>
               <Link to='/UserProfile'>
                   <ButtonContainer>
                    <span className="mr-2" style={{color: "white",fontFamily: "Georgia, serif",fontSize:18}}>
                    <i style={{marginRight: 10,fontSize: 20}} className="fas fa-user" />
                       User Profile
                    </span>
                     
                   </ButtonContainer>

               </Link>
              
               <Link to='/AddProd'>
                   <ButtonContainer>
                    <span className="mr-2" style={{color: "white",fontFamily: "Georgia, serif",fontSize:18}}>
                    <i style={{marginRight: 10,fontSize: 20}} className="fas fa-user" />
                       Add Product
                    </span>
                     
                   </ButtonContainer>

               </Link>
              
               </div>

               

           </NavWrapper>
        )
    }
}
const NavWrapper = styled.nav`
background: var(--mainBlue);
.nav-link{
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
    
}
`;