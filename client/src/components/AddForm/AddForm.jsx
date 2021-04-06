import axios from 'axios';
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom' ;
import Header from '../Header/Header';
import world from '../../assets/images/world.jpeg';
import './AddForm.scss';

class AddForm extends Component {
  state = {
      name :'',
      age:'',
      weight:'',
      height:'',
      gender:'',
        isChildAdded: false
  }

handleChange=(e)=>{
    e.preventDefault();
    this.setState({
        [e.target.name]:e.target.value
    })
}

handleSubmit=(e)=>{
    const {name, age, weight, height, gender} = this.state;
    e.preventDefault();
    const body = {
        babyName:name,
        age : age,
        weight:weight,
        height:height,
        gender:gender
    }
    const header = {
        Authorization: sessionStorage.getItem('jwt')
    }
    axios.post("http://localhost:5000/users/addchild",body,{headers: header})
    .then(res=>{
        // console.log(res.data)
        //check redirect here
        this.setState({
            isChildAdded: true
        })

    })
}

    render() {
        const {name, age, weight, height, gender, isChildAdded} = this.state;

        if(isChildAdded){
            return <Redirect to='/profile' />
        }

        return(<>
        <Header/>
        <section className = 'info' >
            <div className = 'info__box-mobile'>
                <div className = 'info__start'>
                    <h1 className = 'info__heading' >Welcome </h1>
                    <p className = 'info__para info__yellow' >Add Baby Details :) </p>
                </div>
                {/* 7 items in form */}
                <form onSubmit= {this.handleSubmit} className = 'form' action="">
                    <div className = 'form__box1  form__div' >
                        <label className = 'form__label' htmlFor="name">Full Name</label>
                        <input className = 'form__input' onChange = {this.handleChange} type="text" required placeholder = '' name = 'name' value = {name} id ='name' />
                    </div>
                    <div className = 'form__box2 form__div ' >
                        <label className = 'form__label' htmlFor="age">Age </label>
                        <input className = 'form__input' onChange = {this.handleChange} type="text" required placeholder = '' name = 'age' value = {age} id ='age' />
                    </div>
                    <div className = 'form__box3 form__div '>
                        <label className = 'form__label' htmlFor="weight">weight</label>
                        <input className = 'form__input' onChange = {this.handleChange} type="text" placeholder='' required name = 'weight' value = {weight} id = 'weight' />  
                    </div>
                    <div className = 'form__box3 form__div '>
                        <label className = 'form__label' htmlFor="height">Height</label>
                        <input className = 'form__input' onChange = {this.handleChange} type="text" placeholder='' required name = 'height' value = {height} id = 'height' />  
                    </div>
                    <div className = 'form__box3 form__div '>
                        <label className = 'form__label' htmlFor="gender">Gender</label>
                        <input className = 'form__input' onChange = {this.handleChange} type="text" placeholder='' required name = 'gender' value = {gender} id = 'gender' />  
                    </div>
                    <button  className  = 'form__baby-btn' type = 'submit'>Submit</button>  
                </form>
            
            </div>
            {/* for desktop */}
            <div className ='info__box-desktop' >    
            <img className = 'info__desktop-img' src= {world} alt=""/>
            </div>
    </section>
    </>
        )
    }
}

export default AddForm;