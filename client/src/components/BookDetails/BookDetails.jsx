import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import baby from '../../assets/images/baby_care.jpg';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './BookDetails.scss';

class BookDetails extends Component {

     state = {
         BookDetails : null
     }

     componentDidMount(){
         //const id = this.props.;
         console.log("PROSPO", this.props.match.params)
        // axios.get('http://localhost:5000/books/').then((data)=>{
        //     console.log("----", data); 
        // });
   }

 
  /*
    getSnapShotBeforeUpdate(){

    }
    componentDidUpdate(){

    }

    -----------

    constructor
    render
    componentDidUpdate
    getSnapShotBeforeUpdate
    componentDidUpdate
    componentDidUnmount
  */

    render() {
        return (
            <section className = "detail">
               
                    <div className = "details__img-box">
                        <img className = "detail__img"src={baby} alt=""/>
                    </div>
                    <div className = 'detail__box' >
                    <p className = "detail__title" >Baby Care</p>
                    <p className = "detail__auhtor" >By Sudhir singh</p>  
                    <p className = "detail__price" >$13.00</p>
                    <p className = "detail__hard" >Hardcover Ships Worldwide</p>
                    <p className = "detail__about" >About the book</p>
                    <p className = "detail__about-more" >Written by leading pediatric experts in a friendly, easy-to-understand style, Baby Care Basics offers a comprehensive guide to help parents make the right choices for that new baby.It covers all the essential topics from a baby's birth, first few days, growth, development, breast-and formula-feeding, introducing solid food, to sleeping through the night and much, much more.</p>
                    <Link  className = 'details__back' exact to = '/books'>Go Back</Link>
                    <div className = "detail__link-box">
                        <a className = "detail__link" target = '_blank' href="https://www.amazon.ca/Basics-Jeremy-Friedman-MB-ChB-FRCPC/dp/0778805190/ref=sr_1_3?dchild=1&keywords=Baby+Book+care&qid=1616639446&sr=8-3">Buy Now</a>
                    </div>          
                </div>
             

                {/* <div className = "details__desktop-only">
                   <p className = "details__desk-para">Explore Other Books</p>
                   <div className = "details__desk-explore">
                      
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
                </div> */}

            </section>
        );
    }
}

export default BookDetails;