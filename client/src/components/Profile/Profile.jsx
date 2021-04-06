import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ChildCareIcon from '@material-ui/icons/ChildCare';
// import babes from '../../assets/images/babes.svg';
import cutebaby from '../../assets/images/cutebaby.svg';
import edit from '../../assets/images/edit.svg';
import dustbin from '../../assets/images/dustbin.svg';
import hand from '../../assets/images/hand.svg';
import './Profile.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';

class Profile extends Component {
    state = {
        userName :'',
        userEmail : '',
        childArr : ''
    }

    
    componentDidMount(){
        const header = {
            Authorization: sessionStorage.getItem('jwt')
        }

        axios.get('http://localhost:5000/users/userDetails', {headers: header})
        .then(res =>{
            // console.log(res.data.data.email);
            this.setState({
                userName : res.data.data.full_name,
                userEmail : res.data.data.email
            }) 
        })

        // fetch all child list
        axios.get('http://localhost:5000/users/allchild', {headers: header})
        .then(res =>{
            // console.log(res.data.data);
            this.setState({
                childArr : res.data.data
            }) 
        })        

        

    }

    deleteChild=(id)=>{
        const header = {
            Authorization: sessionStorage.getItem('jwt')
        }
        //need child id *********
        //send axios request to delete
        //set state ...so that child Arr is updated
        axios.delete(`http://localhost:5000/users/deletechild/${id}`, {headers: header})
        .then(res=>{
            // fetch all child list
            axios.get('http://localhost:5000/users/allchild', {headers: header})
            .then(res =>{
                // console.log(res.data.data);
                this.setState({
                    childArr : res.data.data
                }) 
            })       
        })
    }


    loginCheck() {
        const jwt = sessionStorage.getItem('jwt');
        if(!jwt) {
            return false;
        } else {

            return true;
        }
    }

    render() {
        const { childArr } = this.state;
        if(!this.loginCheck()){
            return <Redirect to='/login' />
        }

        if(!childArr){
            return <p>Laoding...</p>
        }
        return (
            <>
            <Header/>
            <main className = 'profile'>

               
                <div className = 'profile__intro-box' >
                    <img className = 'profile__hand-img' src={hand} alt=""/>
                    <h1 className = 'profile__top-name' >Hey Anddy !</h1>
                </div>
                <div className = 'profile__user-details' >
                    <div className = 'profile__attributes-box  profile__attributes-box--margin' >
                        <p className = 'profile__name-title' >Name</p>
                        <p className = 'profile__name' >Andyy Samuel</p>
                    </div>
                    <div className = 'profile__attributes-box' >
                        <p className = 'profile__name-title' >Email</p>
                        <p className = 'profile__name' >anddy@sam.com</p>
                    </div>
                    {/* <div>
                        <p>Password</p>
                        <p>Change Password</p>
                    </div> */}
                </div>
                <section className = 'kids' >
                    <div className = 'kids__add-box' >
                        <p className = 'kids__num' >Children <span>({childArr.length})</span></p>
                        <div className = 'kids__add-btn-box' >
                             {/* need to make it dynamic */}
                          <Link exact  to = '/addchild' className = 'kids__dd-btn' > + Add New Child </Link> 
                            
                        </div>
                    </div>

               <div className = 'kids__container'>

                    {childArr.map(child => {
                        return <div className = 'kids__single-container' >
                                    <div className = 'kids__inner' >
                                        <img className = 'kids__img' src={cutebaby} alt=""/>
                                        <p className = 'kid__name' >{child.baby_name}</p>
                                    </div>
                                    <div className = 'kids__inner-diff' >
                                        <p className = 'kids__feature'>Age</p>
                                        <p className = 'kids__feature-value' >{child.age}</p>
                                    </div>
                                    <div className = 'kids__inner-diff' >
                                        <p className = 'kids__feature' >Weight</p>
                                        <p className = 'kids__feature-value' >{child.weight}</p>
                                    </div>
                                    <div className = 'kids__inner-diff' >
                                        <p className = 'kids__feature'  >height</p>
                                        <p className = 'kids__feature-value' >{child.height}</p>
                                    </div>
                                    <div className = 'kids__inner-diff' >
                                        <p className = 'kids__feature'  >Gender</p>
                                        <p className = 'kids__feature-value' >{child.gender}</p>
                                    </div> 
                                {/* need to make it dynamic */}
                                
                                    <div className = 'kids__inner' >
                                        <p className = 'kids__edit' >Edit</p>
                                        <Link to = {`/EditChildDetails/${child.baby_id}`} ><img className = 'kids__edit-icon' src={edit} alt=""/></Link> 
                                        <img onClick = {()=>{this.deleteChild(child.baby_id)}} className = 'kids__delet-icon' src={dustbin} alt=""/>
                                    </div>
                                </div>
                    })}
                    

                    {/* <div className = 'kids__single-container' >
                        <div className = 'kids__inner' >
                            <img className = 'kids__img' src={babes} alt=""/>
                            <p className = 'kid__name' >Nisha</p>
                        </div>
                        <div className = 'kids__inner-diff' >
                            <p className = 'kids__feature'>Age</p>
                            <p className = 'kids__feature-value' >6 months</p>
                        </div>
                        <div className = 'kids__inner-diff' >
                            <p className = 'kids__feature' >Weight</p>
                            <p className = 'kids__feature-value' >3.1lbs</p>
                        </div>
                        <div className = 'kids__inner-diff' >
                            <p className = 'kids__feature'  >height</p>
                            <p className = 'kids__feature-value' >4 feet 5 inches</p>
                        </div>
                        <div className = 'kids__inner-diff' >
                            <p className = 'kids__feature'  >Gender</p>
                            <p className = 'kids__feature-value' >male</p>
                        </div>
                        <Link to = '/EditChildDetails/childid' >
                            <div className = 'kids__inner' >
                                <p className = 'kids__edit' >Edit</p>
                                <img className = 'kids__edit-icon' src={edit} alt=""/>
                                <img className = 'kids__delet-icon' src={dustbin} alt=""/>
                            </div>
                       </Link> 
                    </div> */}
                </div>      

                </section>
               
            </main>
            </>
        );
    }
}

export default Profile;