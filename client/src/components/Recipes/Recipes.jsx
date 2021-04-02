import React, { Component } from 'react';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
// import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import carrot from '../../assets/images/recipes/carrot.jpeg';
import broccoli from '../../assets/images/recipes/broccoli.jpeg'
import './Recipes.scss';

class Recipes extends Component {
    render() {
        return (
            <main className = 'recipes'>
                <nav className = 'recipes__nav'>
                    <ul className = 'recipes__nav-ul'>
                        <div className = 'recipes__li-div'>
                            <li className = 'recipes__li'>purees</li>
                        </div>    
                        <div className = 'recipes__li-div' >
                            <li className = 'recipes__li' >porridges</li>
                        </div>
                        <div className = 'recipes__li-div' >
                            <li className = 'recipes__li' >Finger Foods</li>
                        </div>
                        <div className = 'recipes__li-div' >
                            <li className = 'recipes__li' >Soups</li>
                        </div>
                        <div className = 'recipes__li-div' >
                            <li className = 'recipes__li'  >Solids</li>
                        </div>
                        <div className = 'recipes__li-div' >
                            <li className = 'recipes__li' >Rice</li>
                        </div>    
                    </ul>
                </nav>

                <section className = 'recipes__section'>
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
                    </div>
                    
                    

                   

                    

                </section>
            </main>
        );
    }
}

export default Recipes; 