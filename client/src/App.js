import React, { Component } from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Books from './components/Books/Books';
import Recipes from './components/Recipes/Recipes';
import Home from './components/Home/Home';
import './App.scss';
import CreateAccount from './components/CreateAccount/CreateAccount';
import BookDetails from './components/BookDetails/BookDetails';
import Profile from './components/Profile/Profile';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import Dashboard from './components/Dashboard/Dashboard';
import AddForm from './components/AddForm/AddForm';
import EditChildDetails from './components/EditChildDetails/EditChildDetails' ;
import DailyActivity from './components/DailyActivity/DailyActivity';
import Google from './components/Google/Google';


class App extends Component {

  state = {
    isLoggedIn :false
  }

  loginInUser=()=>{
    console.log('user shud be logged In')
    this.setState({
      isLoggedIn:true
    })
  }

logOutUser = ()=>{
  this.setState({
    isLoggedIn:false
  })
}


  render() {
    const {isLoggedIn} = this.state;
    return (
      <div className = "App">
        <BrowserRouter>
          <Header loggedIn = {isLoggedIn} handleLogin = {this.loginInUser} logOutUser = {this.logOutUser} />
          <Switch>
            <Route exact path = '/' render = {(props) => <Home loggedIn= {isLoggedIn} handleLogin = {this.loginInUser} {...props}/>}/>
            <Route exact path = '/login' render = {(props)=> <Login loggedIn= {isLoggedIn} handleLogin = {this.loginInUser} {...props} />} />
            <Route exact path = '/create-acct' render = {(props)=> <CreateAccount loggedIn = {isLoggedIn} handleLogin = {this.loginInUser} {...props} />} />
            <Route exact path = '/profile' render = {(props)=> <Profile loggedIn = {isLoggedIn} handleLogin = {this.loginInUser}{...props} />} />
            <Route exact path = '/books' render = {(props)=> <Books loggedIn = {isLoggedIn} handleLogin = {this.loginInUser} {...props} />} />
            <Route exact path = '/books/:id' render = {(props)=> < BookDetails loggedIn = {isLoggedIn} handleLogin = {this.loginInUser} {...props} />} />
            <Route exact path = '/recipes' render = {(props)=> <Recipes loggedIn = {isLoggedIn} handleLogin = {this.loginInUser} {...props} />} />
            <Route exact path = '/recipe/:id' render = {(props)=> <RecipeDetails loggedIn = {isLoggedIn} handleLogin = {this.loginInUser} {...props} />} />
            <Route exact path = '/dashboard' render = {(props)=> <Dashboard loggedIn = {isLoggedIn} handleLogin = {this.loginInUser}{...props} />} />
            <Route exact path = '/addchild' render = {(props)=> <AddForm{...props} loggedIn = {isLoggedIn} handleLogin = {this.loginInUser}/>} />
            <Route exact path = '/EditChildDetails/:childid' render = {(props)=> <EditChildDetails loggedIn = {isLoggedIn} handleLogin = {this.loginInUser} {...props} />} />
            <Route exact path = '/dailyactivity/:baby_id' render = {(props)=> <DailyActivity loggedIn = {isLoggedIn} handleLogin = {this.loginInUser} {...props} />} />    
            <Route exact path = '/googleauth/:token' render = {(props)=> <Google handleLogin = {this.loginInUser} {...props} />} />    
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
