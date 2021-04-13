import React, { Component } from 'react';
import {NavLink,Link,Redirect} from 'react-router-dom';
import hamburger from '../../assets/images/hamburger.svg';
import logo from '../../assets/images/logo.svg';
import './Header.scss';
import {Dropdown } from 'react-bootstrap';
import {withRouter} from 'react-router'
import axios from 'axios';



class Header extends Component {

   state = {
       isShown : false,
       isVerified:false,
       changeState: false,
       userName :'',
    
       
   }

   componentDidMount(){
        const header = {
            Authorization: sessionStorage.getItem('jwt')
        }

        axios.get('http://localhost:5000/users/userDetails', {headers: header})
        .then(res =>{
            this.setState({
                userName : res.data.data.full_name
            }) 
            const jwt = sessionStorage.getItem('jwt');
            if(jwt){
                this.props.handleLogin();
            }
        })
   }

   handleToggle=()=>{
       console.log("check hamburger menu icon")
       this.setState({
           isShown: !this.state.isShown
       })
   }

  disappearMenu=()=>{
      this.setState({
          isShown:false,
          isVerified: false
      })
  }



    
    logout=()=>{
        const header = {
            Authorization: sessionStorage.getItem('jwt')
        }
        axios.get(`http://localhost:5000/users/logout`, {headers: header})
            .then(res=>{
                sessionStorage.removeItem('jwt');   
                this.props.logOutUser()     
            })        
    }

    render() {
        const {userName} = this.state;
        if(this.props.loggedIn){
            
            return (
                <header className = ''>

                    <nav className= 'header'>
                        <Link  onClick = {this.disappearMenu}  className = 'header__logo' exact to = '/'><img  className = 'header__logo-img' src= {logo} alt="app logo"/></Link>
                        <div className = 'header__desktop header__dropdown'>
                            <NavLink className = 'header__books header__link' exact to = '/books'>Books</NavLink>
                            <NavLink className = 'header__recipes header__link' exact to = '/recipes'>Recipes</NavLink>
                            <NavLink onClick= {this.logout} className = 'header__login header__link' exact to = '/'>Logout</NavLink>
                                    <Dropdown >
                                        <Dropdown.Toggle className = 'header__dropdown-color' id="dropdown-basic" >
                                            {userName}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className= ''>
                                             <Dropdown.Item className = 'header__dropdown-item' href="/profile">Profile</Dropdown.Item>
                                             <Dropdown.Item className = 'header__dropdown-item' href="/dashboard">Dashboard</Dropdown.Item>
                                            <Dropdown.Item className = 'header__dropdown-item' href="#/action-2">Change Password</Dropdown.Item>
                                            
                                        
                                        </Dropdown.Menu>
                                    </Dropdown>
                        </div>
                        <div className = 'header__mobile'>
                            <div onClick = {this.handleToggle} className = 'header__mobile-ham-box'>
                                <img  className = 'header__mobile-ham' src={hamburger} alt="hamburger-pic"/>
                            </div>
                            <ul className = {this.state.isShown? 'header__mobile-ul' : 'header__mobile-ul--noshow' }>
                                <NavLink onClick = {this.handleToggle} className = 'header__mobile-li' exact to = '/books' ><li>Books</li></NavLink>
                                <NavLink onClick = {this.handleToggle} className = 'header__mobile-li' exact to = '/recipes'><li>Recipes</li></NavLink>
                                <NavLink onClick= {this.logout} className = 'header__login header__padding header__link' exact to = '/'><li>Logout</li></NavLink>
                                <NavLink className = 'header__login header__padding header__link' exact to = '/dashboard'><li>DashBoard</li></NavLink>
                                <NavLink className = 'header__login header__padding header__link' exact to = '/profile'><li>Change Password</li></NavLink>
                        
                                    
                            </ul>
                        </div>
                    </nav>
                </header>
            );
        } 
        else {
            return (
                <header className = ''>
                    <nav className= 'header'>
                    <Link  onClick = {this.disappearMenu}  className = 'header__logo' exact to = '/'><img  className = 'header__logo-img' src= {logo} alt="app logo"/></Link>
                    <div className = 'header__desktop'>
                        <NavLink className = 'header__books header__link' exact to = '/books'>Books</NavLink>
                        <NavLink className = 'header__recipes header__link' exact to = '/recipes'>Recipes</NavLink>
                        <NavLink className = 'header__login header__link' exact to = '/login'>Login</NavLink>
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
                            <NavLink onClick = {this.handleToggle} className = 'header__mobile-li' exact to = '/create-acct'><li>Create Account</li></NavLink>
                        </ul>
                    </div>
                    </nav>
                </header>
            );
        }
    }
}

export default Header;
