import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import baby from '../../assets/images/baby_care.jpg';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './BookDetails.scss';
import Header from '../Header/Header';
import axios from 'axios';

class BookDetails extends Component {

     state = {
         bookDetails : null
     }

     componentDidMount(){
         const bookid = this.props.match.params.id;
         console.log(bookid , 'from bookdetails page')
        //  ('/:id'
        axios.get(`http://localhost:5000/books/${bookid}`)
        .then((res)=>{
           console.log(res.data.data)
        this.setState({
            bookDetails : res.data.data
        })
        });
   }

 

    render() {
        const {bookDetails} = this.state;
        if(!bookDetails){
            return <p>Loading</p>
        }
        return (<>
            <Header/>
            <section className = "detail">
               
                    <div className = "details__img-box">
                        <img className = "detail__img"src={bookDetails.image} alt=""/>
                    </div>
                    <div className = 'detail__box' >
                    <p className = "detail__title" >{bookDetails.title}</p>
                    <p className = "detail__auhtor" >{bookDetails.author}</p>  
                    <p className = "detail__price" >{`$ ${bookDetails.price}`}</p>
                    <p className = "detail__hard" >Hardcover Ships Worldwide</p>
                    <p className = "detail__about" >About the book</p>
                    <p className = "detail__about-more" >{bookDetails.description}</p>
                    <Link  className = 'details__back' exact to = '/books'>Go Back</Link>
                    <div className = "detail__link-box">
                    <a className = "detail__link" target = '_blank' href= {bookDetails.buy_link}>Buy Now</a>
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
            </>
        );
    }
}

export default BookDetails;