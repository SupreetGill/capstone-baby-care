import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Profile extends Component {
    
    state = {
        isValid : false
    }
componentDidMount(){
    const jwt = sessionStorage.getItem('jwt');

    if(!jwt){
        console.log('not ',jwt);
        this.setState({
            isValid : this.state.isValid
        })
    } else {
        console.log('yes ',jwt);
        this.setState({
            isValid :!this.state.isValid
        })
        console.log(this.state);
    }
    // axios.post('https://localhost:5000/users/profile')
}

    render() {
        const { isValid } = this.state;
        if(isValid == false){
            return <Redirect to='/login' />;
        }

        return (
            <div>
                {/* we gotta check if session has token or not */}
                This is the profile page
                <button>logout</button>
            </div>
        );
    }
}

export default Profile;