import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import img4 from '../../assets/images/img4.png';
import img1 from '../../assets/images/img1.png';
import img2 from '../../assets/images/img2.png';
import img3 from '../../assets/images/img3.png';
import Header from '../Header/Header';
import './Home.scss';

class Home extends Component {
    render() {
        return (
            <main className = "home">
                <section className = "home__section home__one" >
                    <div className = "home__image-box"> 
                        <img className = "home__image home__image-one" src= {img4} alt=""/>
                    </div>
                    <div className = "home__text-box home__text-box--one">
                        <h1 className = "home__heading" >Record daily activities as your baby grows</h1>
                        <p className = "home__para" >As a new mom, you have so much that you’re trying to remember – wouldn’t it be perfect if there was a baby tracker board? What if I told you there was? And that it was FREE and could be at your fingertips at all times!</p>
                        <Link className = "home__create" exact to = '/create-acct'>Create account</Link>
                        <div className = "home__existing" >
                            <p className = "home__existing-para" >Already have an account? </p>
                            <Link className = "home__existing-link" exact to = '/login'>Login here</Link>
                        </div>
                    </div>
                </section>

                <section className = "home__section home__two" >
                    <div className = "home__image-box"> 
                        <img className = "home__image home__image-two " src= {img1} alt=""/>
                    </div>
                    <div className = "home__text-box home__text-box--two ">
                        <h1 className = "home__heading" >Take the guess work out with these books </h1>
                        <p className = "home__para" >Find yourself among some of the best books on motherhood, happy parenting,baby development,nutrition and health .Knowledge is power when it comes to raising happy, healthy positive kids</p>
                        <Link className = "home__route-link" to = '/books'>view all books</Link>
                        
                    </div>
                </section>

                <section className = "home__section home__three" >
                    <div className = "home__image-box"> 
                        <img className = "home__image home__image-three " src= {img2} alt="home__image"/>
                    </div>
                    <div className = "home__text-box home__text-box--three ">
                        <h1 className = "home__heading" >Find out amazing recipes for your baby !!!</h1>
                        <p className = "home__para" >Nutrition during the first year of your baby's life is important for proper growth and development. Starting good eating habits at this early stage will help set healthy eating patterns for life. Feeding should be based on your infant's readiness, feeding skills and developmental age.</p>
                        <Link className = "home__route-link" to = '/recipes'>view all recipes</Link>
                        
                    </div>
                </section>

                <section className = "home__section home__four" >
                    <div className = "home__image-box"> 
                        <img className = "home__image home__image-four " src= {img3} alt="home__image"/>
                    </div>
                    <div className = "home__text-box home__text-box--four ">       
                        <p className = "home__para home__para-absolute" >Ten little fingers, ten perfect toes, fill our hearts with love that overflows.</p>  
                    </div>
                </section>        
            </main>
    
        );
    }
}

export default Home;