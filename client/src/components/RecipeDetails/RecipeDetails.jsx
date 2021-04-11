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
       instructions: null,
       showComments:false,
       isLoggedIn :false
       
   }

componentDidMount(){
    if(sessionStorage.getItem('jwt')){
        this.setState({
            isLoggedIn: true
        })
    } else {
        this.setState({
            isLoggedIn: false
        })
    }

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

    })

    axios.get(`http://localhost:5000/recipes/allcomment/${selectedRecipe}`)
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

//adding a new piece of state---to handle toggle
showComments = (e)=>{
  e.preventDefault();
    this.setState({
        showComments:!this.state.showComments
    })
}


//NOTE WE NEED TO NOTIFY USER TO LOGIN WITH EACH OF THE REQUEST BELOW..in ORDER TO ADD/DELETE OR LIKE

deleteComment= (id)=>{
  const  recipe_id = this.props.match.params.id;
//   e.preventDefault();
  const header = {
    Authorization: sessionStorage.getItem('jwt')
}

axios.delete(`http://localhost:5000/recipes/deleteComment/${id}`,{headers: header})
.then(res=>{
    axios.get(`http://localhost:5000/recipes/allcomment/${recipe_id}`, {headers: header})
    .then(res=>{
        console.log(res.data.data);
        this.setState({
            allComments: res.data.data
        })

        const selectedRecipe =this.props.match.params.id;
        axios.get(`http://localhost:5000/recipes/recipeDetails/${selectedRecipe}`)
        .then(res=>{
            this.setState({
                singleRecipe:res.data.data,
            })
        })
    })
  
})
}


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
console.log(recipe_id);
axios.post(`http://localhost:5000/recipes/addComment/${recipe_id}`,commentBody, {headers: header})
.then(res=>{
    console.log(res);
    this.setState({
        comment:''
    })
    const selectedRecipe =this.props.match.params.id;
    axios.get(`http://localhost:5000/recipes/recipeDetails/${selectedRecipe}`)
    .then(res=>{
        this.setState({
            singleRecipe:res.data.data,
        })
    })
    axios.get(`http://localhost:5000/recipes/allcomment/${recipe_id}`, {headers: header})
    .then(res=>{
        this.setState({
            allComments: res.data.data
        })
    })
})
}



likesUpdate=()=>{
    const header = {
        Authorization: sessionStorage.getItem('jwt')
    }
    const recipe_id = this.props.match.params.id;
    console.log(recipe_id)
    axios.post(`http://localhost:5000/recipes/like/${recipe_id}`, '', {headers: header})
        .then(res=>{
            const selectedRecipe =this.props.match.params.id;
            axios.get(`http://localhost:5000/recipes/recipeDetails/${selectedRecipe}`)
            .then(res=>{

                this.setState({
                    singleRecipe:res.data.data,
                })

            })
        })
}



    render() {
        const {singleRecipe, ingredents, instructions,allComments,isLoggedIn} = this.state;

        if (!singleRecipe || !instructions || !ingredents || !allComments){
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
                   
                    {instructions.map(ins=>{
                        return <p className = 'recipe__instructions' >{ins}</p> 
                    })}
                        <div className = 'popularity__main-box'>
                            <div className = 'popularity__inner-box' >
                                <FavoriteIcon onClick = {this.likesUpdate} className = 'popularity__icon' />
                                <p className = 'popularity__total' >{ singleRecipe.like_count } likes</p>
                            </div>
                            <div className = 'popularity__inner-box' >
                                <ModeCommentIcon className = 'popularity__icon' />
                                <p className = 'popularity__total' >{singleRecipe.comment_count} comments</p>
                            </div>
                        </div>


                    <div className = 'recipe__comments-box' onClick = {this.showComments}>
                        <a className = 'recipe__comments-link' href="">View all Comments</a>
                    </div>

                    {this.state.showComments ?
                    <div className = 'recipe__comments-appear'>

                        {allComments.map(c=>{
                            return  <div className = 'recipe__comments-conditional' >
                                        <img className = 'recipe__img-cnd' src={girl} alt=""/>
                                        <div className = 'recipe__comment-body-box' >
                                            <p className = 'recipe__name-person' >{c.full_name}</p>
                                            <p className = 'recipe__person-comment' >{c.comment}</p>
                                        </div>
                                        <button type ='submit' className = {isLoggedIn ? 'recipe__form-btn' : 'display-none' }>
                                            <DeleteIcon onClick = {()=>{this.deleteComment(c.id)}} className = 'recipe__form-btn--ui' />
                                         </button>
                                    </div>
                        })}
                    </div> : ''
                    }   

                    <form className = 'recipe__comment-form' action="">
                        <img className = 'recipe__svg' src={girl} alt=""/>
                        <input className = 'recipe__form-input' onChange={this.handleChange} type="text" name = 'comment' value = {this.state.comment} placeholder='add a comment'/>
                        <div className = 'recipe__btn-div'>
                            {/* <button type ='submit' className = {isLoggedIn ? 'recipe__form-btn' : 'display-none' }>
                                <DeleteIcon onClick = {this.deleteComment} className = 'recipe__form-btn--ui' />
                            </button> */}
                            <button type = 'submit' className = {isLoggedIn ? 'recipe__form-btn' : 'display-none' }>
                                <AddCircleIcon  onClick = {this.addComment} className = 'recipe__form-btn--ui display-none' />
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
                                  
                    </ul>
                </div>
            </section>
        );
    }
}

export default RecipeDetails;