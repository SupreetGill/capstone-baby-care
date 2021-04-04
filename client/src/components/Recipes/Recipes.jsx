import React, { Component } from 'react';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
// import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import carrot from '../../assets/images/recipes/carrot.jpeg';
import broccoli from '../../assets/images/recipes/broccoli.jpeg'
import './Recipes.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Form } from "react-bootstrap";
class Recipes extends Component {

   state = {
       recipesArr : null,
       recipeCategoriesArr :null,
       selectedCategoryRecipes :null
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
        //    console.log(res.data.data);
           this.setState({
               recipeCategoriesArr:res.data.data
           })
           })
        });
   }

   componentDidUpdate (){

   }

fetchId=(e)=>{
    e.preventDefault();
    
//   console.log(e.target.id)
const selectedCat = e.target.id;
//   console.log(e)
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
                                                    {/* <li onClick = {this.fetchId} id = {category.id} className = 'recipes__li'>{category.name}</li> */}
                                                {/* </div>     */}
                                    
                                })}
                            {/* <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option> */}
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
                                 <p className = 'recipes__likes' >466 likes</p>
                             </div>
                             <div className = 'recipes__comment-box' >
                                 <ModeCommentIcon className = 'recipes__comment-icon' />
                                 <p className = 'recipes__comments' >22 comments</p>
                             </div>
                         </div>
                         <Link className = 'recipes__link' to = {`/recipe/${recipe.recipe_id}`} >Recipe details</Link> 
                     </div>
 
                    })}
                    {/* <div className = 'recipes__single-box' >
                        <img className = 'recipes__img' src= {carrot} alt=""/>
                        <p className = 'recipes__title' >Chocolate Chip cookies</p>

                        <div className = 'recipes__popularity-box'>
                            <div className = 'recipes__likes-box' >
                                <FavoriteIcon className = 'recipes__likes-icon' />
                                <p className = 'recipes__likes' >466 likes</p>
                            </div>
                            <div className = 'recipes__comment-box' >
                                <ModeCommentIcon className = 'recipes__comment-icon' />
                                <p className = 'recipes__comments' >22 comments</p>
                            </div>
                        </div>
                        <Link className = 'recipes__link' to = '/recipe:id' >Recipe details</Link> 
                    </div>

                    <div className = 'recipes__single-box' >
                        <img className = 'recipes__img' src= {broccoli} alt=""/>
                        <p className = 'recipes__title' >Chocolate Chip cookies</p>

                        <div className = 'recipes__popularity-box'>
                            <div className = 'recipes__likes-box' >
                                <FavoriteIcon className = 'recipes__likes-icon' />
                                <p className = 'recipes__likes' >466 likes</p>
                            </div>
                            <div className = 'recipes__comment-box' >
                                <ModeCommentIcon className = 'recipes__comment-icon' />
                                <p className = 'recipes__comments' >22 comments</p>
                            </div>
                        </div>
                        <Link className = 'recipes__link' to = '/recipe:id' >Recipe details</Link> 
                    </div>

                    <div className = 'recipes__single-box' >
                        <img className = 'recipes__img' src= {carrot} alt=""/>
                        <p className = 'recipes__title' >Chocolate Chip cookies</p>

                        <div className = 'recipes__popularity-box'>
                            <div className = 'recipes__likes-box' >
                                <FavoriteIcon className = 'recipes__likes-icon' />
                                <p className = 'recipes__likes' >466 likes</p>
                            </div>
                            <div className = 'recipes__comment-box' >
                                <ModeCommentIcon className = 'recipes__comment-icon' />
                                <p className = 'recipes__comments' >22 comments</p>
                            </div>
                        </div>
                        <Link className = 'recipes__link' to = '/recipe:id' >Recipe details</Link> 
                    </div>

                    <div className = 'recipes__single-box' >
                        <img className = 'recipes__img' src= {broccoli} alt=""/>
                        <p className = 'recipes__title' >Chocolate Chip cookies</p>

                        <div className = 'recipes__popularity-box'>
                            <div className = 'recipes__likes-box' >
                                <FavoriteIcon className = 'recipes__likes-icon' />
                                <p className = 'recipes__likes' >466 likes</p>
                            </div>
                            <div className = 'recipes__comment-box' >
                                <ModeCommentIcon className = 'recipes__comment-icon' />
                                <p className = 'recipes__comments' >22 comments</p>
                            </div>
                        </div>
                        <Link className = 'recipes__link' to = '/recipe:id' >Recipe details</Link> 
                    </div>

                    <div className = 'recipes__single-box' >
                        <img className = 'recipes__img' src= {carrot} alt=""/>
                        <p className = 'recipes__title' >Chocolate Chip cookies</p>

                        <div className = 'recipes__popularity-box'>
                            <div className = 'recipes__likes-box' >
                                <FavoriteIcon className = 'recipes__likes-icon' />
                                <p className = 'recipes__likes' >466 likes</p>
                            </div>
                            <div className = 'recipes__comment-box' >
                                <ModeCommentIcon className = 'recipes__comment-icon' />
                                <p className = 'recipes__comments' >22 comments</p>
                            </div>
                        </div>
                        <Link className = 'recipes__link' to = '/recipe:id' >Recipe details</Link> 
                    </div>

                    <div className = 'recipes__single-box' >
                        <img className = 'recipes__img' src= {broccoli} alt=""/>
                        <p className = 'recipes__title' >Chocolate Chip cookies</p>

                        <div className = 'recipes__popularity-box'>
                            <div className = 'recipes__likes-box' >
                                <FavoriteIcon className = 'recipes__likes-icon' />
                                <p className = 'recipes__likes' >466 likes</p>
                            </div>
                            <div className = 'recipes__comment-box' >
                                <ModeCommentIcon className = 'recipes__comment-icon' />
                                <p className = 'recipes__comments' >22 comments</p>
                            </div>
                        </div>
                        <Link className = 'recipes__link' to = '/recipe:id' >Recipe details</Link> 
                    </div>

                    <div className = 'recipes__single-box' >
                        <img className = 'recipes__img' src= {carrot} alt=""/>
                        <p className = 'recipes__title' >Chocolate Chip cookies</p>

                        <div className = 'recipes__popularity-box'>
                            <div className = 'recipes__likes-box' >
                                <FavoriteIcon className = 'recipes__likes-icon' />
                                <p className = 'recipes__likes' >466 likes</p>
                            </div>
                            <div className = 'recipes__comment-box' >
                                <ModeCommentIcon className = 'recipes__comment-icon' />
                                <p className = 'recipes__comments' >22 comments</p>
                            </div>
                        </div>
                        <Link className = 'recipes__link' to = '/recipe:id' >Recipe details</Link> 
                    </div>

                    <div className = 'recipes__single-box' >
                        <img className = 'recipes__img' src= {broccoli} alt=""/>
                        <p className = 'recipes__title' >Chocolate Chip cookies</p>

                        <div className = 'recipes__popularity-box'>
                            <div className = 'recipes__likes-box' >
                                <FavoriteIcon className = 'recipes__likes-icon' />
                                <p className = 'recipes__likes' >466 likes</p>
                            </div>
                            <div className = 'recipes__comment-box' >
                                <ModeCommentIcon className = 'recipes__comment-icon' />
                                <p className = 'recipes__comments' >22 comments</p>
                            </div>
                        </div>
                        <Link className = 'recipes__link' to = '/recipe:id' >Recipe details</Link> 
                    </div>
                     */}
                    
                </section>
            </main>
        );
    }
}

export default Recipes; 