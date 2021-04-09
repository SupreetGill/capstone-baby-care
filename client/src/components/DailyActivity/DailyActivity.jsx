import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Header from '../../components/Header/Header';
import day from '../../assets/images/day.jpeg';
import daily from '../../assets/images/daily.jpeg';
import finale from '../../assets/images/finale.jpeg';
import axios from 'axios';

class DailyActivity extends Component {

    state = {
        // name :'',
        feeds:'',
        diapers:'',
        wordsSpoken:'',
        tummyTime:'',
        date:'',
        baby_id: '',
        addDone: false
    }


 componentDidMount(){
   
    const jwt =  sessionStorage.getItem('jwt');
    if(jwt){
        this.props.handleLogin();
        
    }
    // set baby_id in state
    this.setState({
        baby_id: this.props.match.params.baby_id
    })
    console.log();

    
 }
  
  handleChange=(e)=>{
      e.preventDefault();
      this.setState({
          [e.target.name]:e.target.value
      })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
        feeds: this.state.feeds,
        diaper: this.state.diapers,
        tummy: this.state.tummyTime,
        words: this.state.wordsSpoken,
        createdat: this.state.date
    }

    const header = {
        Authorization: sessionStorage.getItem('jwt')
    }

    console.log(this.state.baby_id);

    axios.post(`http://localhost:5000/users/babyactivity/${this.state.baby_id}`, data, {headers: header})
    .then(res =>{

        this.setState({
            addDone : true
        }) 
    })
  }


    render() {
        if(this.state.addDone){
            return <Redirect to='/dashboard' />
        }
        if(!this.props.loggedIn){
            // return <Redirect to='/login' />
            return <p>loading activity</p>
        }
        const {name,feeds,diapers,wordsSpoken,tummyTime,date} = this.state;
        return (
             
              <section className = 'info' >
                <div className = 'info__box-mobile'>
                    <div className = 'info__start'>
                        <h1 className = 'info__heading' >Welcome </h1>
                        <p className = 'info__para info__yellow' >Record Daily Activities :) </p>
                    </div>
                
                    <form onSubmit= {this.handleSubmit} className = 'form' action="">
                    <div className = 'form__box3 form__div '>
                            <label className = 'form__label' htmlFor="date">Pick Date</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="date" placeholder='' required name = 'date' value = {date} id = 'date' />  
                        </div>
                        {/* <div className = 'form__box1  form__div' >
                            <label className = 'form__label' htmlFor="name">Full Name</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="text" required placeholder = '' name = 'name' value = {name} id ='name' />
                        </div> */}
                        <div className = 'form__box2 form__div ' >
                            <label className = 'form__label' htmlFor="feeds">Feeds given</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="text" required placeholder = '' name = 'feeds' value = {feeds} id ='feeds' />
                        </div>
                        <div className = 'form__box3 form__div '>
                            <label className = 'form__label' htmlFor="diapers">Diaper Changes in a day</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="text" placeholder='' required name = 'diapers' value = {diapers} id = 'diapers' />  
                        </div>
                        <div className = 'form__box3 form__div '>
                            <label className = 'form__label' htmlFor="tummyTime">Tummy time count</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="text" placeholder='' required name = 'tummyTime' value = {tummyTime} id = 'tummyTime' />  
                        </div>
                        <div className = 'form__box3 form__div '>
                            <label className = 'form__label' htmlFor="wordsSpoken">words Spoken</label>
                            <input className = 'form__input' onChange = {this.handleChange} type="text" placeholder='' required name = 'wordsSpoken' value = {wordsSpoken} id = 'wordsSpoken' />  
                        </div>
                       
                        <button  className  = 'form__baby-btn' type = 'submit'>Submit</button>  
                    </form>
                
                </div>
                {/* for desktop */}
                <div className ='info__box-desktop' >    
                <img className = 'info__desktop-img' src= {daily} alt=""/>
                </div>
        </section>
        
        );
    }
}

export default DailyActivity;