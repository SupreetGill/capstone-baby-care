import React, { Component } from 'react';
import carrot from '../../assets/images/recipes/carrot.jpeg';
import girl from '../../assets/images/girl.svg'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios';
import './RecipeDetails.scss';

class RecipeDetails extends Component {


   state = {
       name:'',
       singleRecipe: null,
       allComments:false
   }

componentDidMount(){
    const selectedRecipe =this.props.match.params.id;
    console.log(selectedRecipe)
    axios.get(`http://localhost:5000/recipes/recipeDetails/${selectedRecipe}`)
    .then(res=>{
        // console.log(res.data.data)
        this.setState({
            singleRecipe:res.data.data
        })
    })
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
        const {singleRecipe} = this.state;
        if (!singleRecipe){
            return <p>Loading ...</p>
        }
        return (
            <section className = 'recipe'>
                <div className = 'recipe__img-box' >
                    <img className = 'recipe__img' src={singleRecipe.image} alt=""/>
                </div>
                <div className='recipe__basic-info' >  
                    <h1 className = 'recipe__title' >{singleRecipe.name}</h1>
                    <p className = 'recipe__about' >About the Recipe</p>
                    <p className = 'recipe__description' >{singleRecipe.description}</p>
                    <h2 className = 'recipe__how' >How to make {singleRecipe.name}</h2>
                    <p className = 'recipe__instructions' >{singleRecipe.instructions}
               </p>

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
                        {singleRecipe.ingredients.map(i=>{
                            return <li className = 'recipes__li' >{i}</li>
                        })}
                        
                        {/* <li className = 'recipes__li' >Ingredient two</li>
                        <li className = 'recipes__li' >Ingredient three</li>
                        <li className = 'recipes__li' >Ingredient four</li>
                        <li className = 'recipes__li' >Ingredient five</li> */}
                                    
                    </ul>
                </div>


            </section>
        );
    }
}

export default RecipeDetails;