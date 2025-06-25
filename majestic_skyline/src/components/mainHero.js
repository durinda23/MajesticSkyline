import React from 'react';
import '../css/main_hero.css';
import houseImage from '../img/main_hero_house.png';
import arrowIcon from '../img/account_arrow.svg';
import telegramIcon from '../img/telegram.svg'; // Иконка Telegram
import linkedinIcon from '../img/linkedin.svg'; // Иконка LinkedIn
import instagramIcon from '../img/instagram.svg'; // Иконка Instagram
import twitterIcon from '../img/twitter.svg'; // Иконка Twitter
import dollar from '../img/$.svg';
import line from '../img/line.svg';

const MainHero = ({ setActivePage, activePage }) => {
    const handleBuyNow = () => {
        setActivePage('buy'); // Устанавливаем активную страницу на 'buy'
    };

    const handleScrollToCallForm = () => {
        if (activePage === 'main') {
            const callForm = document.getElementById('call-form');
            if (callForm) {
                window.scrollTo({
                    top: callForm.offsetTop,
                    behavior: 'smooth'
                });
            } else {
                console.log('Элемент с id="call-form" не найден');
            }
        }
    };

    return (
        <section className="main-hero">
            <div className="content">
                <h1 className="hero-title">
                    <span>MAJESTIC SKYLINE – </span><br />
                    КЛЮЧ К МИРУ ЭКСКЛЮЗИВНОЙ НЕДВИЖИМОСТИ
                </h1>

                <div className="stats">
                    <div className="stat-item">
                        <span className="stat-number">20+</span>
                        <p>Опыта на рынке</p>
                    </div>
                    <img className='stat-line' src={line} alt='line' />
                    <div className="stat-item">
                        <span className="stat-number">1</span>
                        <p>Влад Куертов</p>
                    </div>
                    <img className='stat-line' src={line} alt='line' />
                    <div className="stat-item">
                        <span className="stat-number"><img src={dollar} alt='$' />2B+</span>
                        <p>Закрытых сделок</p>
                    </div>
                </div>
                <div className="bottom-content">
                    <div className="cta">
                        <p>Свяжись с нашими девочками - <br />они не обидят</p>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleScrollToCallForm(); }}>
                            <img className="cta-arrow" src={arrowIcon} alt="Arrow" />
                        </a>
                    </div>

                    <div className="cta-social">
                        <button className="buy-now" onClick={handleBuyNow}>купи - сейчас</button>
                        <div className="social-icons">
                            <a href="#"><img src={telegramIcon} alt="Telegram" /></a>
                            <a href="#"><img src={linkedinIcon} alt="LinkedIn" /></a>
                            <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
                            <a href="#"><img src={twitterIcon} alt="Twitter" /></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="house-image">
                <img src={houseImage} alt="House" />
            </div>
        </section>
    );
};

export default MainHero;