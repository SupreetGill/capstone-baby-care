import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import love from '../../assets/images/love.jpeg';
import './Login.scss';
import axios from 'axios';
import Header from '../Header/Header';
import GoogleLogin from 'react-google-login';

class Login extends Component {

    state = {
  
        email : '',
        password : '' 

   }


handleSubmit = (e)=>{
    e.preventDefault();
    const body = {
        email :this.state.email,
        password: this.state.password
    }


    axios.post('http://localhost:5000/users/login',body)
    .then(res=>{
        const jwt = res.data.jwtToken;
        sessionStorage.setItem('jwt',jwt);
        this.props.handleLogin();    
    })
    .catch(err => {
    
        alert(err.response.data.message);
    })
}

   handleChange = (e)=>{
       e.preventDefault();                           
       this.setState({
           [e.target.name]:e.target.value
       })
   }

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
    }

    render() {
        const { email, password} = this.state;
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
                    <form  onSubmit = {this.handleSubmit}className = 'form' action="">
                        <div className = 'form__div2 form__div ' >
                            <label className = 'form__label' htmlFor="email">Email address </label>
                            <input className = 'form__input' onChange = {this.handleChange} type="email" required placeholder = '' name = 'email' value = {email} id ='email' />
                        </div>
                        <div className = 'form__div3 form__div '>
                            <label className = 'form__label' htmlFor="password">Password</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="password" placeholder='' required name = 'password' value = {password} id = 'password' />  
                        </div>
                        <div className = 'form__box5 form__div ' >
                            <button className = 'form__btn' type = 'submit'>Login</button>
                        </div>
                       <div className = 'Google-sign'>
                       <GoogleLogin 
                            clientId= "880320092469-k96sia3b1j3rm1156lo7cq3oams18u1s.apps.googleusercontent.com"
                            buttonText= "Login with Google"
                            onSuccess= {this.responseGoogle}
                            onFailure= {this.responseGoogle}
                        />
                       </div>       
                    </form>
                    <div className = 'common'>
                        <p className = 'common__para'> Don't have an account ?</p>
                        <Link className = 'common__link' exact to = '/create-acct'>Create Account</Link>
                    </div>
                </div>
                {/* for desktop */}
                <div className ='info__box-desktop' >    
                    <img className = 'info__desktop-img' src={love} alt=""/>
                </div>
        </section>
    
        );
    }
}

export default Login;