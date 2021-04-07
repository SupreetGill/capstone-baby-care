import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import hamburger from '../../assets/images/hamburger.svg';
import google from '../../assets/images/google.svg';
import baba from '../../assets/images/baba.jpeg'
import bottle from '../../assets/images/bottle.jpeg'
// import dolphin from '../../assets/images/dolphins.jpeg';
import './CreateAccount.scss';
import axios from 'axios';
import Header from '../Header/Header';

class CreateAccount extends Component {

    state = {
         name : '',
         email : '',
         password : ''   ,
         isRegistered : false 
    }

    handleChange = (e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
    const body = {
        fullName :this.state.name,
        email: this.state.email,
        password:this.state.password
    }
    axios.post('http://localhost:5000/users/create',body)
    .then(res=>{
       alert('Registered Successfully!!')
       this.setState({
           isRegistered : true
       })
      
    })
    }

    render() {
        const {name, email, password, isRegistered} = this.state;
        if(isRegistered){
            return <Redirect to = '/login' />
        }
        return (
             
            <section className = 'info' >
                <div className = 'info__box-mobile'>
                    <div className = 'info__start'>
                        <h1 className = 'info__heading' >Welcome </h1>
                        <p className = 'info__para' >let's get you started with care</p>
                    </div>
            
                    <form onSubmit= {this.handleSubmit} className = 'form' action="">
                        <div className = 'form__box1  form__div' >
                            <label className = 'form__label' htmlFor="name">Full Name</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="text" required placeholder = '' name = 'name' value = {name} id ='name' />
                        </div>
                        <div className = 'form__box2 form__div ' >
                            <label className = 'form__label' htmlFor="email">Email address </label>
                            <input className = 'form__input' onChange = {this.handleChange} type="email" required placeholder = '' name = 'email' value = {email} id ='email' />
                        </div>
                        <div className = 'form__box3 form__div '>
                            <label className = 'form__label' htmlFor="password">Password</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="password" placeholder='' required name = 'password' value = {password} id = 'password' />  
                        </div>
                        <div className = 'form__box4 form__div ' >
                            <img className = 'form__check' src= {hamburger} alt=""/>
                            <p className = 'form__terms' >I accept Terms of Use and Privacy Policy</p>
                        </div>
                       <div className = 'form__box5 form__div ' >
                            <button className = 'form__btn' type = 'submit'>Create an Account</button>
                        </div>
                        <p className = 'form__or' >OR</p>
                        <div className = 'google__box' >
                            <Link className = 'google__link' to = '/'>
                                <img className = 'google__img' src={google} alt=""/>
                                <p className = 'google__para' >Continue with Google</p>
                            </Link>
                        </div>
                        
                    </form>
                    <div className = 'common'>
                        <p className = 'common__para' >Already have an account ?</p>
                        <Link className = 'common__link' exact to = '/login'>Login</Link>
                    </div>
                </div>
                {/* for desktop */}
                <div className ='info__box-desktop' >    
                   <img className = 'info__desktop-img' src={bottle} alt=""/>
                </div>


            </section>
            
        );
    }
}

export default CreateAccount;