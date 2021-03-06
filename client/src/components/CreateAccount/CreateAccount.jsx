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
import GoogleLogin from 'react-google-login';

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
            .catch(err => {
                // console.log(err.response);
                alert(err.response.data.message);
            })
    }

    // googleCreate = (e) => {
    //     e.preventDefault();
    //     axios.get('http://localhost:5000/auth/google');
    // }

    responseGoogle = (res) => {
        
        // console.log(res.profileObj);
        const body = {
            userEmail: res.profileObj.email,
            fullName: res.profileObj.name
        }
        axios.post('http://localhost:5000/auth/google/success', body)
            .then(res=>{
                const jwt = res.data.jwtToken;
                sessionStorage.setItem('jwt',jwt);
                this.props.handleLogin();
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    }
    failGoogle = (res)=>{
        alert("Goodle authentication failed")
    }

    render() {
        const {name, email, password, isRegistered} = this.state;
        if(isRegistered){
            return <Redirect to = '/login' />
        }
        if(this.props.loggedIn){
            return <Redirect to = '/profile' />
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
                        {/* <div className = 'google__box' >
                            <div className = 'google__link' onClick={this.googleCreate}>
                                <img className = 'google__img' src={google} alt=""/>
                                <p  className = 'google__para' >Continue with Google</p>
                            </div>
                        </div> */}
                        <div className = 'Google-sign' >
                        <GoogleLogin className = 'google-sign__btn'
                            clientId= "880320092469-k96sia3b1j3rm1156lo7cq3oams18u1s.apps.googleusercontent.com"
                            buttonText= "Login with Google"
                            onSuccess= {this.responseGoogle}
                            onFailure= {this.failGoogle}
                        />
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