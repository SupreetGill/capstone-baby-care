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


class App extends Component {
  render() {
    return (
      <div className = "App">
        <BrowserRouter>
          {/* <Header/> */}
          <Switch>
            <Route exact path = '/' render = {(props) => <Home {...props}/>}/>
            <Route exact path = '/login' render = {(props)=> <Login {...props} />} />
            <Route exact path = '/create-acct' render = {(props)=> <CreateAccount {...props} />} />
            <Route exact path = '/profile' render = {(props)=> <Profile {...props} />} />
            <Route exact path = '/books' render = {(props)=> <Books {...props} />} />
            <Route exact path = '/books/:id' render = {(props)=> < BookDetails {...props} />} />
            <Route exact path = '/recipes' render = {(props)=> <Recipes {...props} />} />
            <Route exact path = '/recipe/:id' render = {(props)=> <RecipeDetails {...props} />} />
            <Route exact path = '/dashboard' render = {(props)=> <Dashboard {...props} />} />
            <Route exact path = '/addchild' render = {(props)=> <AddForm{...props} />} />
            <Route exact path = '/EditChildDetails/:childid' render = {(props)=> <EditChildDetails{...props} />} />

           
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
