import React from 'react';
import '../css/main_rent.css'; // Обновленный путь к стилям
import houseImage from '../img/main_rent_house.png'; // Изображение дома
import line from '../img/line.svg';
import euro from '../img/euro.svg';

const MainRent = ({ setActivePage }) => {
const handleRentNow = () => {
        setActivePage('rent');
    };

    return (
        <section className="main-rent">
            <div className="rent-top">
                <h2>Арендуй сейчас</h2>
                <button className="view-more-rent" onClick={handleRentNow}>смотреть подробнее</button>
            </div>
            <div className="rent-container">
                <div className="rent-info">
                    <h3>La Dolce Vita</h3>
                    <p className="price-rent"><img className='rent-info-euro' src={euro} alt="Euro" />10,100,999</p>
                    <div className="details-rent">
                        <div className="detail-item-rent detail-item-top-rent">
                            <span id='first-top-rent'>320<a> м²</a></span>
                            <p>Площадь</p>
                        </div>
                        <img className='detail-line-rent' src={line} alt='Line' />
                        <div className="detail-item-rent detail-item-middle-rent detail-item-other-rent">
                            <span>10</span>
                            <p>Спален</p>
                        </div>
                        <img className='detail-line-rent' src={line} alt='Line' />
                        <div className="detail-item-rent detail-item-other-rent">
                            <span>6</span>
                            <p>Санузлов</p>
                        </div>
                    </div>
                    <div className="details-rent">
                        <div className="detail-item-rent">
                            <span id='first-bottom-rent'>СВОЙ</span>
                            <p>пенисный корт</p>
                        </div>
                        <img className='detail-line-rent' src={line} alt='Line' />
                        <div className="detail-item-rent detail-item-other-rent">
                            <span>1</span>
                            <p>Кокошка по вызову</p>
                        </div>
                    </div>
                    <p className="location-rent">Пальма-де-Майорка, Испания</p>
                </div>
                <div className="rent-image">
                    <img src={houseImage} alt="House" />
                </div>
            </div>
        </section>
    );
};

export default MainRent;