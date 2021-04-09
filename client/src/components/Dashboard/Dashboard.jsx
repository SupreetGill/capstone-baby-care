import React, { Component } from 'react';
import hand from '../../assets/images/hand.svg';
import cutebaby from '../../assets/images/cutebaby.svg';
import tum from '../../assets/images/tum.svg';
import './Dashboard.scss';
import minus from '../../assets/images/minus.svg';
import plus from '../../assets/images/plus.svg';
import diapers from '../../assets/images/diaper.svg';
import feeds from '../../assets/images/feeds.svg';
import words from '../../assets/images/words.svg';
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {
    state = {
        userName :'',
        childArr : '',
        todayDate: null,
        childActivityArr : ''
    }


    componentDidMount(){
        let date = new Date();
        let formatedDate = date.toISOString().slice(0,10);
        this.setState({
            todayDate: formatedDate
        })

        const jwt =  sessionStorage.getItem('jwt');
        if(jwt){
            this.props.handleLogin();
            
        }

        //fetch user detail
        const header = {
            Authorization: sessionStorage.getItem('jwt')
        }

        axios.get('http://localhost:5000/users/userDetails', {headers: header})
        .then(res =>{
            // console.log(res.data.data.email);
            this.setState({
                userName : res.data.data.full_name
            }) 

            axios.get('http://localhost:5000/users/allchild', {headers: header})
            .then(res =>{
                // console.log(res.data.data);
                this.setState({
                    childArr : res.data.data
                }) 
            })   

            axios.get(`http://localhost:5000/users/babyactivitylist/${this.state.todayDate}`, {headers: header})
            .then(res =>{
                // console.log(res.data.data);
                this.setState({
                    childActivityArr : res.data.data
                }) 
            })   
            
        })
     
    }

    handleChange=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.name]:e.target.value
        })

    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const header = {
            Authorization: sessionStorage.getItem('jwt')
        }

        axios.get('http://localhost:5000/users/allchild', {headers: header})
            .then(res =>{
                // console.log(res.data.data);
                this.setState({
                    childArr : res.data.data
                }) 
            })   

        axios.get(`http://localhost:5000/users/babyactivitylist/${this.state.todayDate}`, {headers: header})
            .then(res =>{
                // console.log(res.data.data);
                this.setState({
                    childActivityArr : res.data.data
                }) 
            })   
    }


    render() {
        const { childArr , userName, todayDate, childActivityArr } = this.state;

        if(!this.props.loggedIn || !childArr || !childActivityArr || !todayDate){
            return <p>loading dashboard</p>
        }
        return (
    
           <main className = 'activity'>
                <div className = 'profile__intro-box' >
                    <img className = 'profile__hand-img' src={hand} alt=""/>
                    <h1 className = 'profile__top-name' >Hey {userName} !</h1>
                </div>
                <form  className = 'activity__form' onSubmit = {this.handleSubmit} >
                    <input className = 'activity__input' onChange={this.handleChange} type="date" name="todayDate" value= {todayDate}/>
                    <button className = 'activity__button' type = "submit" > Pick date </button>
                </form>

                {childArr.map((c,i)=> {

                    return <div className = 'single__kid single__kid--margin'>
                        <div className = 'kids__single-container' >
                                <div className = 'kids__inner' >
                                    <img className = 'kids__img' src={cutebaby} alt=""/>
                                    <p className = 'kid__name' >{c.baby_name}</p>
                                </div>
                                <div className = 'kids__inner-diff' >
                                    <p className = 'kids__feature'>Age</p>
                                    <p className = 'kids__feature-value' >{c.age}</p>
                                </div>
                                <div className = 'kids__inner-diff' >
                                    <p className = 'kids__feature' >Weight</p>
                                    <p className = 'kids__feature-value' >{c.weight}</p>
                                </div>
                                <div className = 'kids__inner-diff' >
                                    <p className = 'kids__feature'  >height</p>
                                    <p className = 'kids__feature-value' >{c.height}</p>
                                </div>
                                <div className = 'kids__inner-diff' >
                                    <p className = 'kids__feature'  >Gender</p>
                                    <p className = 'kids__feature-value' >{c.gender}</p>
                                </div>   
                                <Link className = 'kids__dash-link'  to ={`/dailyactivity/${c.baby_id}`} ><button className = 'kids__add-stuff'>Add Activities</button></Link> 
                        </div>

                        <div className ='activity__chart'>
                                <div className = 'activity__type'>
                                    <img className = 'activity__img' src={feeds} alt=""/>
                                    <p className = 'activity__title'>Feeds Count</p>
                                    <div className = 'acitvity__holder'>
                                        <div className = 'activity__counter-box'>
                                            <p className = 'activity__how-many' >{childActivityArr[i] ? childActivityArr[i].feeds : 0}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className = 'activity__type'>
                                    <img className = 'activity__img' src={diapers} alt=""/>
                                    <p className = 'activity__title'>Diapers</p>

                                    <div className = 'acitvity__holder'>
                                        <div className = 'activity__counter-box'>
                                            <p className = 'activity__how-many' >{childActivityArr[i] ? childActivityArr[i].diaper : 0}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className = 'activity__type'>
                                    <img className = 'activity__img' src={words} alt=""/>
                                    <p className = 'activity__title'>Words Spoken</p>
                                    <div className = 'activity__counter-box activity__counter-box--margin'>
                                        <p className = 'activity__how-many' >{childActivityArr[i] ? childActivityArr[i].words : 0}</p>
                                    </div>
                                </div>
                                <div className = 'activity__type'>
                                    <img className = 'activity__img' src={tum} alt=""/>
                                    <p className = 'activity__title'>Tummy Time</p>
                                    <div className = 'acitvity__holder'>
                                        <div className = 'activity__counter-box'>
                                            <p className = 'activity__how-many' >{childActivityArr[i] ? childActivityArr[i].tummy : 0}</p>
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>
                })}
                   
            </main>
            
        );
    }
}

export default Dashboard;