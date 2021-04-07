import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../Header/Header';
import world from '../../assets/images/world.jpeg';
import axios from 'axios';



class EditChildDetails extends Component {
     
    state = {
        name :'',
        age:'',
        weight:'',
        height:'',
        gender:'',
        selectedChild:'',
        isEdited: false
    }

    componentDidMount(){

        const babyid = this.props.match.params.childid;
        const header = {
            Authorization: sessionStorage.getItem('jwt')
        }
        axios.get(`http://localhost:5000/users/singlechild/${babyid}`,{headers: header})
      .then(res=>{
          console.log(res.data.data);
          this.setState({
          selectedChild : res.data.data
          })
      
      });
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
  
      const babyid = this.props.match.params.childid;
      axios.post(`http://localhost:5000/users/editchild/${babyid}`,body,{headers: header})
      .then(res=>{
          console.log(res.data);
          this.setState({
              isEdited: true
          })
      });
     
  }
  


    render() {
        const {name, age, weight, height, gender,selectedChild, isEdited} = this.state;

        if(isEdited){
            return <Redirect to='/profile' />
        }

        return(
            <section className = 'info' >
                <div className = 'info__box-mobile'>
                    <div className = 'info__start'>
                        <h1 className = 'info__heading' >Welcome </h1>
                        <p className = 'info__para info__yellow' >Update details here :) </p>
                    </div>
                
                    <form onSubmit= {this.handleSubmit} className = 'form' action="">
                        <div className = 'form__box1  form__div' >
                            <label className = 'form__label' htmlFor="name">Full Name</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="text" required placeholder = '' name = 'name' defaultValue = {selectedChild.baby_name} id ='name' />
                        </div>
                        <div className = 'form__box2 form__div ' >
                            <label className = 'form__label' htmlFor="age">Age </label>
                            <input className = 'form__input' onChange = {this.handleChange} type="text" required placeholder = '' name = 'age' defaultValue = {selectedChild.age} id ='age' />
                        </div>
                        <div className = 'form__box3 form__div '>
                            <label className = 'form__label' htmlFor="weight">weight</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="text" placeholder='' required name = 'weight' defaultValue = {selectedChild.weight} id = 'weight' />  
                        </div>
                        <div className = 'form__box3 form__div '>
                            <label className = 'form__label' htmlFor="height">Height</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="text" placeholder='' required name = 'height' defaultValue = {selectedChild.height} id = 'height' />  
                        </div>
                        <div className = 'form__box3 form__div '>
                            <label className = 'form__label' htmlFor="gender">Gender</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="text" placeholder='' required name = 'gender' defaultValue = {selectedChild.gender} id = 'gender' />  
                        </div>
                        <button  className  = 'form__baby-btn' type = 'submit'>Submit</button>   
                    </form>
                
                </div>
                {/* for desktop */}
                <div className ='info__box-desktop' >    
                <img className = 'info__desktop-img' src={world} alt=""/>
                </div>


            </section>
                )
    }
}

export default EditChildDetails;