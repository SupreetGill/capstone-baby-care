import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import hamburger from '../../assets/images/hamburger.svg';
import google from '../../assets/images/google.svg';
import place from '../../assets/images/cycle.png';
import './CreateAccount.scss';

class CreateAccount extends Component {

    state = {
         name : '',
         email : '',
         password : ''    
    }

    handleChange = (e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render() {
        const {name, email, password} = this.state;
        return (
            <section className = 'info' >
                <div className = 'info__box-mobile'>
                    <div className = 'info__start'>
                        <h1 className = 'info__heading' >Welcome </h1>
                        <p className = 'info__para' >let's get you started with care</p>
                    </div>
                    {/* 7 items in form */}
                    <form className = 'form' action="">
                        <div className = 'form__box1  form__div' >
                            <label className = 'form__label' htmlFor="name">Full Name</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="text" required placeholder = 'Venus Angios' name = 'name' value = {name} id ='name' />
                        </div>
                        <div className = 'form__box2 form__div ' >
                            <label className = 'form__label' htmlFor="email">Email address </label>
                            <input className = 'form__input' onChange = {this.handleChange} type="email" required placeholder = 'venus@gmail.com' name = 'email' value = {email} id ='email' />
                        </div>
                        <div className = 'form__box3 form__div '>
                            <label className = 'form__label' htmlFor="password">Password</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="password" placeholder='........' required name = 'password' value = {password} id = 'password' />  
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
                   <img className = 'info__desktop-img' src={place} alt=""/>
                </div>


            </section>
        );
    }
}

export default CreateAccount;