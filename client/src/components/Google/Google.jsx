import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';

class Google extends Component {

    state = {
        isAuth : false
   }

    componentDidMount(){
        // console.log(this.state.isAuth);
        const jwt = this.props.match.params.token;
        sessionStorage.setItem('jwt',jwt);
        this.setState({
            isAuth: true
        })
        // console.log(sessionStorage.getItem('jwt'));
        this.props.handleLogin();
        // console.log(this.state.isAuth);
    }

    render() {
        const { isAuth } = this.state;
        if(!isAuth){
            return <Redirect to = '/login' />
        }  else {
            return <Redirect to = '/profile' />
        }
    }
}

export default Google;