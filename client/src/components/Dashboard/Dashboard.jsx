import React, { Component } from 'react';
import hand from '../../assets/images/hand.svg';
import cutebaby from '../../assets/images/cutebaby.svg';
import tum from '../../assets/images/tum.svg';
import './Dashboard.scss';
import minus from '../../assets/images/minus.svg';
import plus from '../../assets/images/plus.svg';
import diapers from '../../assets/images/diaper.svg';
import feeds from '../../assets/images/feeds.svg';
import words from '../../assets/images/words.svg';
import Header from '../Header/Header';

class Dashboard extends Component {
    render() {
        return (<>
           <Header/>
           <main className = 'activities'>
                <div className = 'profile__intro-box' >
                    <img className = 'profile__hand-img' src={hand} alt=""/>
                    <h1 className = 'profile__top-name' >Hey Anddy !</h1>
                </div>

                <div className = 'single__kid single__kid--margin'>
                    <div className = 'kids__single-container' >
                            <div className = 'kids__inner' >
                                <img className = 'kids__img' src={cutebaby} alt=""/>
                                <p className = 'kid__name' >Noel</p>
                            </div>
                            <div className = 'kids__inner-diff' >
                                <p className = 'kids__feature'>Age</p>
                                <p className = 'kids__feature-value' >6 months</p>
                            </div>
                            <div className = 'kids__inner-diff' >
                                <p className = 'kids__feature' >Weight</p>
                                <p className = 'kids__feature-value' >3.1lbs</p>
                            </div>
                            <div className = 'kids__inner-diff' >
                                <p className = 'kids__feature'  >height</p>
                                <p className = 'kids__feature-value' >4 feet 5 inches</p>
                            </div>
                            <div className = 'kids__inner-diff' >
                                <p className = 'kids__feature'  >Gender</p>
                                <p className = 'kids__feature-value' >male</p>
                            </div>      
                    </div>

                    <div className ='activity__chart'>
                            <div className = 'activity__type'>
                                <img className = 'activity__img' src={feeds} alt=""/>
                                <p className = 'activity__title'>Feeds Count</p>

                                <div className = 'acitvity__holder'>
                                    <div className = 'activity__count-box'>
                                        <img className = 'activity__minus' src={minus} alt=""/>
                                        <p className = 'activity__number'>1</p>
                                        <img className = 'activity__plus' src= {plus} alt=""/>
                                    </div>
                                    <div className = 'activity__counter-box'>
                                        <p className = 'activity__how-many' >1</p>
                                    </div>
                                </div>
                            </div>
                            <div className = 'activity__type'>
                                <img className = 'activity__img' src={diapers} alt=""/>
                                <p className = 'activity__title'>Diapers</p>

                                <div className = 'acitvity__holder'>
                                    <div className = 'activity__count-box'>
                                        <img className = 'activity__minus' src={minus} alt=""/>
                                        <p className = 'activity__number'>3</p>
                                        <img className = 'activity__plus' src= {plus} alt=""/>
                                    </div>
                                    <div className = 'activity__counter-box'>
                                        <p className = 'activity__how-many' >3</p>
                                    </div>
                                </div>

                            </div>
                            <div className = 'activity__type'>
                                <img className = 'activity__img' src={words} alt=""/>
                                <p className = 'activity__title'>Words Spoken</p>
                                <div className = 'activity__counter-box activity__counter-box--margin'>
                                    <p className = 'activity__how-many' >1</p>
                                </div>
                            </div>
                            <div className = 'activity__type'>
                                <img className = 'activity__img' src={tum} alt=""/>
                                <p className = 'activity__title'>Tummy Time</p>

                                 <div className = 'acitvity__holder'>
                                    <div className = 'activity__count-box'>
                                        <img className = 'activity__minus' src={minus} alt=""/>
                                        <p className = 'activity__number'>1</p>
                                        <img className = 'activity__plus' src= {plus} alt=""/>
                                    </div>
                                    <div className = 'activity__counter-box'>
                                        <p className = 'activity__how-many' >1</p>
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>
               
                <div className = 'single__kid single__kid--margin'>
                    <div className = 'kids__single-container' >
                            <div className = 'kids__inner' >
                                <img className = 'kids__img' src={cutebaby} alt=""/>
                                <p className = 'kid__name' >Noel</p>
                            </div>
                            <div className = 'kids__inner-diff' >
                                <p className = 'kids__feature'>Age</p>
                                <p className = 'kids__feature-value' >6 months</p>
                            </div>
                            <div className = 'kids__inner-diff' >
                                <p className = 'kids__feature' >Weight</p>
                                <p className = 'kids__feature-value' >3.1lbs</p>
                            </div>
                            <div className = 'kids__inner-diff' >
                                <p className = 'kids__feature'  >height</p>
                                <p className = 'kids__feature-value' >4 feet 5 inches</p>
                            </div>
                            <div className = 'kids__inner-diff' >
                                <p className = 'kids__feature'  >Gender</p>
                                <p className = 'kids__feature-value' >male</p>
                            </div>      
                    </div>

                    <div className ='activity__chart'>
                            <div className = 'activity__type'>
                                <img className = 'activity__img' src={feeds} alt=""/>
                                <p className = 'activity__title'>Feeds Count</p>

                                <div className = 'acitvity__holder'>
                                    <div className = 'activity__count-box'>
                                        <img className = 'activity__minus' src={minus} alt=""/>
                                        <p className = 'activity__number'>1</p>
                                        <img className = 'activity__plus' src= {plus} alt=""/>
                                    </div>
                                    <div className = 'activity__counter-box'>
                                        <p className = 'activity__how-many' >1</p>
                                    </div>
                                </div>
                            </div>
                            <div className = 'activity__type'>
                                <img className = 'activity__img' src={diapers} alt=""/>
                                <p className = 'activity__title'>Diapers</p>

                                <div className = 'acitvity__holder'>
                                    <div className = 'activity__count-box'>
                                        <img className = 'activity__minus' src={minus} alt=""/>
                                        <p className = 'activity__number'>3</p>
                                        <img className = 'activity__plus' src= {plus} alt=""/>
                                    </div>
                                    <div className = 'activity__counter-box'>
                                        <p className = 'activity__how-many' >3</p>
                                    </div>
                                </div>

                            </div>
                            <div className = 'activity__type'>
                                <img className = 'activity__img' src={words} alt=""/>
                                <p className = 'activity__title'>Words Spoken</p>
                                <div className = 'activity__counter-box activity__counter-box--margin '>
                                    <p className = 'activity__how-many' >1</p>
                                </div>
                            </div>
                            <div className = 'activity__type'>
                                <img className = 'activity__img' src={tum} alt=""/>
                                <p className = 'activity__title'>Tummy Time</p>

                                 <div className = 'acitvity__holder'>
                                    <div className = 'activity__count-box'>
                                        <img className = 'activity__minus' src={minus} alt=""/>
                                        <p className = 'activity__number'>1</p>
                                        <img className = 'activity__plus' src= {plus} alt=""/>
                                    </div>
                                    <div className = 'activity__counter-box'>
                                        <p className = 'activity__how-many' >1</p>
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>
               

              
            </main>
            </>
        );
    }
}

export default Dashboard;