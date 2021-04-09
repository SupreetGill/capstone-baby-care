import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';

class Google extends Component {

    state = {
        isAuthenticate : false
   }

    componentDidMount(){
        console.log(this.state.isAuthenticate);
        const jwt = this.props.match.params.token;
        sessionStorage.setItem('jwt',jwt);
        this.setState({
            isAuthenticate: true
        })
        console.log(jwt);
        console.log(this.state.isAuthenticate);
    }

    render() {
        const { isAuthenticate } = this.state;
        if(!isAuthenticate){
           return <Redirect to = '/profile' />
        }
        return (
            <></>
        );
    }
}

export default Google;