import React, { Component } from 'react';
import carrot from '../../assets/images/recipes/carrot.jpeg';
import girl from '../../assets/images/girl.svg'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Header from '../Header/Header';
import axios from 'axios';
import './RecipeDetails.scss';


class RecipeDetails extends Component {


   state = {
       comment:'',
       singleRecipe: null,
       allComments:null,
       ingredents: null,
       instructions: null
   }

componentDidMount(){
    const selectedRecipe =this.props.match.params.id;
    console.log(selectedRecipe)
    axios.get(`http://localhost:5000/recipes/recipeDetails/${selectedRecipe}`)
    .then(res=>{
        const ing = Object.values(JSON.parse(res.data.data.ingredients)[0]);
        const ins = Object.values(JSON.parse(res.data.data.instructions)[0]);

        this.setState({
            singleRecipe:res.data.data,
            ingredents: ing,
            instructions: ins
        })

        // console.log(JSON.parse(res.data.data.ingredients)[0]);
        // console.log(this.state.ingredents);
        // console.log(this.state.instructions);
    })

    const header = {
        Authorization: sessionStorage.getItem('jwt')
    }

    axios.get(`http://localhost:5000/recipes/allcomment/${selectedRecipe}`, {headers: header})
    .then(res=>{
        console.log(res.data.data);

        this.setState({
            allComments: res.data.data
        })
    })

}


handleChange=(e)=>{
    e.preventDefault();
    this.setState({
        comment:e.target.value
    })
    
}

showComments = (e)=>{
  e.preventDefault();
    this.setState({
        allComments:!this.state.allComments
    })
}


//NOTE WE NEED TO NOTIFY USER TO LOGIN WITH EACH OF THE REQUEST BELOW..in ORDER TO ADD/DELETE OR LIKE

deleteComment= (id)=>{
  const  recipe_id = this.props.match.params.id;
//   e.preventDefault();
  const header = {
    Authorization: sessionStorage.getItem('jwt')
}
//need to user_id and comment id
// console.log(recipe_id)
// ??? where wud comment_id come from ???
axios.delete(`http://localhost:5000/recipes/deleteComment/${id}`,{headers: header})
.then(res=>{
    axios.get(`http://localhost:5000/recipes/allcomment/${recipe_id}`, {headers: header})
    .then(res=>{
        console.log(res.data.data);

        this.setState({
            allComments: res.data.data
        })
    })
    //we need to now make another axios request ..to get updated single Recipe with its
    //updated likesa and comments
})
}



//bug in add comment server side-> user is able to add more than one comment ...
addComment=(e)=>{
 const  recipe_id = this.props.match.params.id;
 const comment = this.state.comment;
 const commentBody = {
     comment : comment
 }
 const header = {
    Authorization: sessionStorage.getItem('jwt')
}
 e.preventDefault();
//need userid and comment id
console.log(recipe_id);
axios.post(`http://localhost:5000/recipes/addComment/${recipe_id}`,commentBody, {headers: header})
.then(res=>{
    console.log(res);
    this.setState({
        comment:''
    })
     //we need to now make another axios request ..to get updated single Recipe with its
    //updated likesa and comments
    axios.get(`http://localhost:5000/recipes/allcomment/${recipe_id}`, {headers: header})
    .then(res=>{
        // console.log(res.data.data);

        this.setState({
            allComments: res.data.data
        })
    })
})
}


//not working 
likesUpdate=()=>{
    // e.preventDefault();
    const header = {
        Authorization: sessionStorage.getItem('jwt')
    }
    const recipe_id = this.props.match.params.id;
    console.log(recipe_id)
    axios.post(`http://localhost:5000/recipes/like/${recipe_id}`, '', {headers: header})
        .then(res=>{
            console.log(res.data);
        })
}



    render() {
        const {singleRecipe, ingredents, instructions,allComments} = this.state;

        if (!singleRecipe || !instructions || !ingredents || !allComments){
            return <p>Loading ...</p>
        }
       
        return (<>
           <Header/>
            <section className = 'recipe'>
                <div className = 'recipe__img-box' >
                    <img className = 'recipe__img' src={singleRecipe.image} alt=""/>
                </div>
                <div className='recipe__basic-info' >  
                    <h1 className = 'recipe__title' >{singleRecipe.name}</h1>
                    <p className = 'recipe__about' >About the Recipe</p>
                    <p className = 'recipe__description' >{singleRecipe.description}</p>
                    <h2 className = 'recipe__how' >How to make {singleRecipe.name}</h2>
                   
                    {instructions.map(ins=>{
                        return <p className = 'recipe__instructions' >{ins}</p> 
                    })}
                    {/* for(let key in instructions){
                           
                    } */}
                    {/* <p className = 'recipe__instructions' >{singleRecipe.instructions}</p> */}

{/* adding here likes an comments structure */}

                        <div className = 'popularity__main-box'>
                            <div className = 'popularity__inner-box' >
                                {/* <div></div> */}
                                <FavoriteIcon onClick = {this.likesUpdate} className = 'popularity__icon' />
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

                        {allComments.map(c=>{
                            return  <div className = 'recipe__comments-conditional' >
                                        <img className = 'recipe__img-cnd' src={girl} alt=""/>
                                        <div className = 'recipe__comment-body-box' >
                                            <p className = 'recipe__name-person' >{c.full_name}</p>
                                            <p className = 'recipe__person-comment' >{c.comment}</p>
                                        </div>
                                        <button type ='submit' className = 'recipe__form-btn'>
                                            <DeleteIcon onClick = {()=>{this.deleteComment(c.id)}} className = 'recipe__form-btn--ui' />
                                         </button>
                                    </div>
                        })}
                       
                        {/* <div className = 'recipe__comments-conditional' >
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
                        </div> */}
                    </div> : ''
                    }   

                    <form className = 'recipe__comment-form' action="">
                        <img className = 'recipe__svg' src={girl} alt=""/>
                        <input className = 'recipe__form-input' onChange={this.handleChange} type="text" name = 'comment' value = {this.state.comment} placeholder='add a comment'/>
                        <div className = 'recipe__btn-div'>
                            <button type ='submit' className = 'recipe__form-btn'>
                                <DeleteIcon onClick = {this.deleteComment} className = 'recipe__form-btn--ui' />
                            </button>
                            <button type = 'submit'className = 'recipe__form-btn' >
                                <AddCircleIcon  onClick = {this.addComment} className = 'recipe__form-btn--ui' />
                            </button>   
                        </div>
                        
                    </form>
                      
                </div>
                <div className = 'recipe__ingredients-box' >
                    <h3 className = 'recipe__ingredients' >Ingredients</h3>
                    <ul className = 'recipes__ul' >
                        
                        {ingredents.map(ing=>{
                            return <li className = 'recipes__li' >{ing}</li>
                        })}
                        {/* <li className = 'recipes__li' >Ingredient two</li>
                        
                        <li className = 'recipes__li' >Ingredient four</li>
                        <li className = 'recipes__li' >Ingredient five</li> */}
                                    
                    </ul>
                </div>


            </section>
            </>
        );
    }
}

export default RecipeDetails;