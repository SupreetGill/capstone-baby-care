import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import place from '../../assets/images/cycle.png';
import './Login.scss';
import axios from 'axios';

class Login extends Component {

    state = {
  
        email : '',
        password : ''    
   }


handleSubmit = (e)=>{
    e.preventDefault();
    // console.log(this.state.email)
    const body = {
        email :this.state.email,
        password: this.state.password
    }


    axios.post('http://localhost:5000/users/login',body)
    .then(res=>{
        // console.log(res)
        // const jwt = 'Bearer '+res.data.jwtToken;
        const jwt = res.data.jwtToken;
        // console.log(jwt)
        sessionStorage.setItem('jwt',jwt);
    
    })
    .catch(err => {
        // console.log(err.response);
        // alert(err?.response?.data?.message);
        alert(err.response.data.message);
    })
}

   handleChange = (e)=>{
       e.preventDefault();                           
       this.setState({
           [e.target.name]:e.target.value
       })
   }

    render() {
        const { email, password} = this.state;
        return (
            <section className = 'info' >
            <div className = 'info__box-mobile'>
                <div className = 'info__start'>
                    <h1 className = 'info__heading' >Welcome </h1>
                    <p className = 'info__para' >let's get you started with care</p>
                </div>
                {/* 7 items in form */}
                <form  onSubmit = {this.handleSubmit}className = 'form' action="">
                    {/* <div className = 'form__div1  form__div' >
                        <label className = 'form__label' htmlFor="name">Full Name</label>
                        <input className = 'form__input' onChange = {this.handleChange} type="text" required placeholder = 'venus Angios' name = 'name' value = {name} id ='name' />
                    </div> */}
                    <div className = 'form__div2 form__div ' >
                        <label className = 'form__label' htmlFor="email">Email address </label>
                        <input className = 'form__input' onChange = {this.handleChange} type="email" required placeholder = 'venus@gmail.com' name = 'email' value = {email} id ='email' />
                    </div>
                    <div className = 'form__div3 form__div '>
                        <label className = 'form__label' htmlFor="password">Password</label>
                        <input className = 'form__input' onChange = {this.handleChange} type="password" placeholder='........' required name = 'password' value = {password} id = 'password' />  
                    </div>
                    {/* <div className = 'form__box4 form__div ' >
                        <img className = 'form__check' src="" alt=""/>
                        <p className = 'form__accept' >I accept Terms of Use and Privacy Policy</p>
                    </div> */}
                   <div className = 'form__box5 form__div ' >
                        <button className = 'form__btn' type = 'submit'>Login</button>
                    </div>
                    
                </form>
                <div className = 'common'>
                    <p className = 'common__para'> Don't have an account ?</p>
                    <Link className = 'common__link' exact to = '/create-acct'>Create Account</Link>
                </div>
            </div>
            {/* for desktop */}
            <div className ='info__box-desktop' >    
                   <img className = 'info__desktop-img' src={place} alt=""/>
                </div>


        </section>
        );
    }
}

export default Login;