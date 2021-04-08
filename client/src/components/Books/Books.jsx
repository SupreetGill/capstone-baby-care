import React, { Component } from 'react';
import baby from '../../assets/images/baby_care.jpg';
import momImg from '../../assets/images/new.jpeg';
import {Link,Route} from 'react-router-dom';
import happy from '../../assets/images/happy.png';
import './Books.scss';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';
import Header from '../Header/Header';
import { v4 as uuidv4 } from 'uuid';

class Books extends Component {

    state =  {
        booksArr:null
    }

   componentDidMount(){
        axios.get('http://localhost:5000/books')
        .then((res)=>{
           const books = res.data.data;
           this.setState({
               booksArr:books
           }) 
        });
   }



    render() {
      const {booksArr} = this.state;
      if(!booksArr){
          return <p>Loading</p>
      }
        return (
        <section className = "book">
            <div className = "book__main-top">
                <img className = "book__main-img" src= {happy} alt=""/>
            </div>  
            <div className = "book__section">   
         
            {booksArr.map(book=>{
            return  <div key = {uuidv4()} className = "book__box">
                        <div className = "book__img-box">
                            <img className="book__img" src={book.image} alt=""/>
                        </div>
                        <div className="book__details-box" >
                            <p className = "book__title" >{book.title}</p>
                            <p className = "book__author" >{book.author}</p>
                            <p className = "book__hard" >Hardcover Shipped Worldwide</p>
                            <Link className = "book__buy"  exact to = '/'>Buy here</Link>
                            <Link className = "book__complete" exact to = {`/books/${book.book_id}`}>More Details</Link>
                            <div className = "book__fav-box">
                                <FavoriteBorderIcon className= "book__heart" />
                                <p className = "book__fav" >Add to favourites</p>
                            </div>
                        </div>
                    </div>                       
            })}
            </div>
        </section>
           
        );    
    }
}

export default Books;


                   