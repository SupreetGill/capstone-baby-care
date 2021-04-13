import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './BookDetails.scss';
import axios from 'axios';

class BookDetails extends Component {

     state = {
         bookDetails : null
     }

     componentDidMount(){
         const bookid = this.props.match.params.id;
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
        return (
        
            <section className = "detail">
                <div className = "detail__img-box">
                    <img className = "detail__img"src={bookDetails.image} alt=""/>
                </div>
                <div className = 'detail__box' >
                <p className = "detail__title" >{bookDetails.title}</p>
                <p className = "detail__auhtor" >{bookDetails.author}</p>  
                <p className = "detail__price" >{`${bookDetails.price}`}</p>
                <p className = "detail__hard" >Hardcover Ships Worldwide</p>
                <p className = "detail__about" >About the book</p>
                <p className = "detail__about-more" >{bookDetails.description}</p>
                <Link  className = 'detail__back' exact to = '/books'>Go Back</Link>
                <div className = "detail__link-box">
                <a className = "detail__link" target = '_blank' href= {bookDetails.buy_link}>Buy Now</a>
                </div>          
            </div>
            </section>
            
        );
    }
}

export default BookDetails;