import React, { Component } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import bowl from '../../assets/images/bowl.svg';
import jars from '../../assets/images/jars.svg';
import om from '../../assets/images/om.svg';
import spoons from '../../assets/images/spoons.svg';
import apple from '../../assets/images/apple.svg';
import rice from '../../assets/images/rice.svg';
import './Recipes.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Form } from "react-bootstrap";
import Header from '../Header/Header';



class Recipes extends Component {

   state = {
       recipesArr : null,
       recipeCategoriesArr :null,

   }


   componentDidMount(){
        axios.get('http://localhost:5000/recipes')
        .then((res)=>{
           const recipesArr = res.data.data;
           console.log(recipesArr)

           this.setState({
               recipesArr: res.data.data
           }) 
           axios.get('http://localhost:5000/recipes/recipe_category')
           .then(res=>{
           this.setState({
               recipeCategoriesArr:res.data.data
           })
           })
        });
   }

 

fetchId=(e)=>{
    e.preventDefault();
    const selectedCat = e.target.id;
    axios.get(`http://localhost:5000/recipes/recipeByCategory/${selectedCat}`)
    .then(res=>{
        console.log(res.data.data)
        this.setState({
            recipesArr: res.data.data
        })
    })
    }
   

    render() {
        const {recipeCategoriesArr,recipesArr} = this.state;
        if(!recipeCategoriesArr || !recipesArr) {
            return <p>Loading</p>
        }
        return (

            <main className = 'recipes'>
                <nav className = 'recipes__nav'>
                    <ul className = 'recipes__nav-ul'>

                {recipeCategoriesArr.map(category=>{
                  return  <div className = 'recipes__li-div'>
                            <li onClick = {this.fetchId} id = {category.id} className = 'recipes__li'>{category.name}</li>
                        </div>             
                })}               
                    </ul>
                    <Form className= "recipes__mobile-select">
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Control as="select" custom>
                            {recipeCategoriesArr.map(category=>{
                                return  <option  onClick = {this.fetchId} id = {category.id} className = 'recipes__li'>{category.name}</option>
                            })}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </nav>

                <section className = 'recipes__section'>
                    {recipesArr.map(recipe=>{
                     return    <div className = 'recipes__single-box' >
                         <img className = 'recipes__img' src= {recipe.image} alt=""/>
                         <p className = 'recipes__title' >{recipe.name}</p>
 
                         <div className = 'recipes__popularity-box'>
                             <div className = 'recipes__likes-box' >
                                 <FavoriteIcon className = 'recipes__likes-icon' />
                                 <p className = 'recipes__likes' >{recipe.like_count} likes</p>
                             </div>
                             <div className = 'recipes__comment-box' >
                                 <ModeCommentIcon className = 'recipes__comment-icon' />
                                 <p className = 'recipes__comments' >{recipe.comment_count} comments</p>
                             </div>
                         </div>
                         <Link className = 'recipes__link' to = {`/recipe/${recipe.recipe_id}`} >Recipe details</Link> 
                     </div>
 
                    })}           
                    
                </section>
            </main>
        );
    }
}

export default Recipes; 