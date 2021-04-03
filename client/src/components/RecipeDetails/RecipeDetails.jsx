import React, { Component } from 'react';
import carrot from '../../assets/images/recipes/carrot.jpeg';
import girl from '../../assets/images/girl.svg'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './RecipeDetails.scss';

class RecipeDetails extends Component {


   state = {
       name:'',
       RecipeDetails: null,
       allComments:false
   }

handleChange=(e)=>{
e.preventDefault();
this.setState({
    name:e.target.value
})
}

showComments = (e)=>{
  e.preventDefault();
    this.setState({
        allComments:!this.state.allComments
    })
}

    render() {
        return (
            <section className = 'recipe'>
                <div className = 'recipe__img-box' >
                    <img className = 'recipe__img' src={carrot} alt=""/>
                </div>
                <div className='recipe__basic-info' >  
                    <h1 className = 'recipe__title' >Chocolate</h1>
                    <p className = 'recipe__about' >About the Recipe</p>
                    <p className = 'recipe__description' >Delicious cookies to relish in the festive season of Christmas. Bittersweet chocolate melted and mixed with ground almonds, eggs and sugar, baked to perfection! These cookies would be the perfect Christmas gift for you and your family.</p>
                    <h2 className = 'recipe__how' >How to make Chocolate cookies</h2>
                    <p className = 'recipe__instructions' >Refrigerate the dough for two hours.
                    Heat the oven to 325 degrees F.
                    Remove the dough from the refrigerator and take small pieces about the size of large olives and roll into a ball.
                    Roll each ball first into the granulated sugar, then into the powdered sugar and place on a parchment covered baking sheet.
                    Continue to use up all of the dough in the same manner.
                    Bake the cookies for about 15 minutes or until they expand and begin to crack.</p>

{/* adding here likes an comments structure */}

                        <div className = 'popularity__main-box'>
                            <div className = 'popularity__inner-box' >
                                <FavoriteIcon className = 'popularity__icon' />
                                <p className = 'popularity__total' >466 likes</p>
                            </div>
                            <div className = 'popularity__inner-box' >
                                <ModeCommentIcon className = 'popularity__icon' />
                                <p className = 'popularity__total' >22 comments</p>
                            </div>
                        </div>

{/* till here */}
                    <div className = 'recipe__comments-box' onClick = {this.showComments}>
                        <a className = 'recipe__comments-link' href="">View all Comments</a>
                    </div>

                    {this.state.allComments ?
                    <div className = 'recipe__comments-appear'>
                        <div className = 'recipe__comments-conditional' >
                            <img className = 'recipe__img-cnd' src={girl} alt=""/>
                            <div className = 'recipe__comment-body-box' >
                                <p className = 'recipe__name-person' >name of the person</p>
                                <p className = 'recipe__person-comment' >this was a perfect recipe for my little one</p>
                            </div>
                        </div>
                        <div className = 'recipe__comments-conditional' >
                            <img className = 'recipe__img-cnd' src={girl} alt=""/>
                            <div className = 'recipe__comment-body-box' >
                                <p className = 'recipe__name-person' >name of the person</p>
                                <p className = 'recipe__person-comment' >this was a perfect recipe for my little one</p>
                            </div>
                        </div>
                        <div className = 'recipe__comments-conditional' >
                            <img className = 'recipe__img-cnd' src={girl} alt=""/>
                            <div className = 'recipe__comment-body-box' >
                                <p className = 'recipe__name-person' >name of the person</p>
                                <p className = 'recipe__person-comment' >this was a perfect recipe for my little one</p>
                            </div>
                        </div>
                        <div className = 'recipe__comments-conditional' >
                            <img className = 'recipe__img-cnd' src={girl} alt=""/>
                            <div className = 'recipe__comment-body-box' >
                                <p className = 'recipe__name-person' >name of the person</p>
                                <p className = 'recipe__person-comment' >this was a perfect recipe for my little one</p>
                            </div>
                        </div>
                    </div> : ''
                    }   

                    <form className = 'recipe__comment-form' action="">
                        <img className = 'recipe__svg' src={girl} alt=""/>
                        <input className = 'recipe__form-input' onChange={this.handleChange} type="text" name = 'comment' value = {this.state.comment} placeholder='add a comment'/>
                        <div className = 'recipe__btn-div'>
                            <button type ='submit' className = 'recipe__form-btn'>
                                <DeleteIcon className = 'recipe__form-btn--ui' />
                            </button>
                            <button type = 'submit'className = 'recipe__form-btn' >
                                <AddCircleIcon className = 'recipe__form-btn--ui' />
                            </button>   
                        </div>
                        
                    </form>
                      
                </div>
                <div className = 'recipe__ingredients-box' >
                    <h3 className = 'recipe__ingredients' >Ingredients</h3>
                    <ul className = 'recipes__ul' >
                        <li className = 'recipes__li' >Ingredient one</li>
                        <li className = 'recipes__li' >Ingredient two</li>
                        <li className = 'recipes__li' >Ingredient three</li>
                        <li className = 'recipes__li' >Ingredient four</li>
                        <li className = 'recipes__li' >Ingredient five</li>
                                    
                    </ul>
                </div>


            </section>
        );
    }
}

export default RecipeDetails;