import React, { Component } from 'react';
import {NavLink,Link} from 'react-router-dom';
import hamburger from '../../assets/images/hamburger.svg';
import logo from '../../assets/images/logo.svg';
import './Header.scss';

class Header extends Component {

   state = {
       isShown : false
   }

   handleToggle=()=>{
       console.log("check hamburger menu icon")
       this.setState({
           isShown: !this.state.isShown
       })
   }

  disappearMenu=()=>{
      this.setState({
          isShown:false
      })
  }


    render() {
        return (
            <header className = 'header'>
                <Link  onClick = {this.disappearMenu}  className = 'header__logo' exact to = '/'><img  className = 'header__logo-img' src= {logo} alt="app logo"/></Link>
                <div className = 'header__desktop'>
                    <NavLink className = 'header__books header__link' exact to = '/books'>Books</NavLink>
                    <NavLink className = 'header__recipes header__link' exact to = '/recipes'>Recipes</NavLink>
                    <NavLink className = 'header__login header__link'exact to = '/login'>Login</NavLink>
                    <NavLink className = 'header__create header__link' exact to = '/create-acct'> Create Account</NavLink>     
                </div>
                <div className = 'header__mobile'>
                    <div onClick = {this.handleToggle} className = 'header__mobile-ham-box'>
                        <img  className = 'header__mobile-ham' src={hamburger} alt="hamburger-pic"/>
                    </div>
                    <ul className = {this.state.isShown? 'header__mobile-ul' : 'header__mobile-ul--noshow' }>
                        <NavLink onClick = {this.handleToggle} className = 'header__mobile-li' exact to = '/books' ><li>Books</li></NavLink>
                        <NavLink onClick = {this.handleToggle} className = 'header__mobile-li' exact to = '/recipes'><li>Recipes</li></NavLink>
                        <NavLink onClick = {this.handleToggle} className = 'header__mobile-li' exact to = '/login'><li>Login</li></NavLink>
                        <NavLink onClick = {this.handleToggle} className = 'header__mobile-li'exact to = '/create-acct'><li>Create Account</li></NavLink>
                    </ul>
                </div>
            </header>
        );
    }
}

export default Header;