import React from 'react';
import '../css/main_buy.css'; // Подключаем стили
import houseImage from '../img/main_buy_house.png'; // Изображение дома
import line from '../img/line.svg';
import euro from '../img/euro.svg';

const MainBuy = ({ setActivePage }) => {
    const handleViewMoreClick = () => {
        setActivePage('buy'); // Переключаем на страницу покупки
    };

    return (
        <section className="main-buy">
            <div className="buy-top">
                <h2>Купи сейчас</h2>
                <button className="view-more" onClick={handleViewMoreClick}>
                    смотреть подробнее
                </button>
            </div>
            <div className="buy-container">
                <div className="buy-info">
                    <h3>ДОМ КУЕРТОВА</h3>
                    <p className="price">
                        <img className="buy-info-euro" src={euro} alt="Euro" />8,900,000
                    </p>
                    <div className="details">
                        <div className="detail-item detail-item-top">
                            <span id="first-top">300<a> м²</a></span>
                            <p>Площадь</p>
                        </div>
                        <img className="detail-line" src={line} alt="line" />
                        <div className="detail-item detail-item-middle detail-item-other">
                            <span>4</span>
                            <p>Спальни</p>
                        </div>
                        <img className="detail-line" src={line} alt="line" />
                        <div className="detail-item detail-item-other">
                            <span>5</span>
                            <p>Санузлов</p>
                        </div>
                    </div>
                    <div className="details">
                        <div className="detail-item">
                            <span id="first-bottom">СВОЙ</span>
                            <p>частный пляж</p>
                        </div>
                        <img className="detail-line" src={line} alt="line" />
                        <div className="detail-item detail-item-other">
                            <span>1</span>
                            <p>Влад Куертов</p>
                        </div>
                    </div>
                    <p className="location">Белый Раст, Россия</p>
                </div>
                <div className="buy-image">
                    <img src={houseImage} alt="House" />
                </div>
            </div>
        </section>
    );
};

export default MainBuy;