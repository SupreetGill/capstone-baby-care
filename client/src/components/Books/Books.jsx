import React, { Component } from 'react';
import baby from '../../assets/images/baby_care.jpg';
import momImg from '../../assets/images/new.jpeg';
import {Link,Route} from 'react-router-dom';
import happy from '../../assets/images/happy.png';
import './Books.scss';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class Books extends Component {
    render() {
        return (
            <>
            <section className = "book">
                <div className = "book__main-top">
                    <img className = "book__main-img" src= {happy} alt=""/>
                </div>
                
                <div className = "book__section">  
                
                    <div className = "book__box">
                        <div className = "book__img-box">
                            <img className="book__img" src={baby} alt=""/>
                        </div>
                        <div className="book__details-box" >
                            <p className = "book__title" >Baby Care Basics</p>
                            <p className = "book__author" >by Drs. Jeremy Friedman</p>
                            <p className = "book__hard" >Hardcover <img src="" alt=""/> Shipped Worldwide</p>
                            <Link className = "book__buy"  path to = '/'>Buy here</Link>
                            <Link className = "book__complete" exact to = '/books/id'>More Details</Link>
                            <div className = "book__fav-box">
                                <FavoriteBorderIcon className= "book__heart" />
                                <p classname = "book__fav" >Add to favourites</p>
                            </div>
                            
                        </div>
                    </div>
                    {/*  */}
                    <div className = "book__box">
                        <div className = "book__img-box">
                            <img className="book__img" src={baby} alt=""/>
                        </div>
                        <div className="book__details-box" >
                            <p className = "book__title" >Baby Care Basics</p>
                            <p className = "book__author" >by Drs. Jeremy Friedman</p>
                            {/* <p className = "book__price" >$15.35</p> */}
                            <p className = "book__hard" >Hardcover <img src="" alt=""/> Shipped Worldwide</p>
                            <Link className = "book__buy"  path to = '/'>Buy here</Link>
                            <Link className = "book__complete" exact to = '/books/id'>More Details</Link>
                            <div className = "book__fav-box" >
                                <FavoriteBorderIcon className= "book__heart" />
                                <p classname = "book__fav" >Add to favourites</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className = "book__box">
                        <div className = "book__img-box">
                            <img className="book__img" src={baby} alt=""/>
                        </div>
                        <div className="book__details-box" >
                            <p className = "book__title" >Baby Care Basics</p>
                            <p className = "book__author" >by Drs. Jeremy Friedman</p>
                            {/* <p className = "book__price" >$15.35</p> */}
                            <p className = "book__hard" >Hardcover <img src="" alt=""/> Shipped Worldwide</p>
                            <Link className = "book__buy"  path to = '/'>Buy here</Link>
                            <Link className = "book__complete" exact to = '/books/id'>More Details</Link>
                            <div className = "book__fav-box" >
                                <FavoriteBorderIcon className= "book__heart" />
                                <p classname = "book__fav" >Add to favourites</p>
                            </div>
                        </div>
                    </div>
                    <div className = "book__box">
                        <div className = "book__img-box">
                            <img className="book__img" src={baby} alt=""/>
                        </div>
                        <div className="book__details-box" >
                            <p className = "book__title" >Baby Care Basics</p>
                            <p className = "book__author" >by Drs. Jeremy Friedman</p>
                            {/* <p className = "book__price" >$15.35</p> */}
                            <p className = "book__hard" >Hardcover <img src="" alt=""/> Shipped Worldwide</p>
                            <Link className = "book__buy"  path to = '/'>Buy here</Link>
                            <Link className = "book__complete" exact to = '/books/id'>More Details</Link>
                            <div className = "book__fav-box" >
                                <FavoriteBorderIcon className= "book__heart" />
                                <p classname = "book__fav" >Add to favourites</p>
                            </div>
                        </div>
                    </div>        
                </div>
           </section>
           </>
        );    
    }
}

export default Books;