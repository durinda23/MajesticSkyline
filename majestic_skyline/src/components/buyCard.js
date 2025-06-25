import React from 'react';
import '../css/buy_card.css';
import line from '../img/line.svg';
import euro from '../img/euro.svg';

const BuyCard = ({ house }) => {
  const handleCallClick = () => {
    window.location.href = `tel:${house.phone || '+79001234567'}`;
  };

  const handleDetailsClick = () => {
    window.location.href = `/house/${house.ID_house}`;
  };

  const imageSrc = house.photos || '../img/main_buy_house.png'; // Используем путь из БД или заглушку

  return (
    <section className="buy-card">
      <div className="buy-card__container">
        <div className="buy-card__container-top">
          <div className="buy-card__info">
            <h3>{house.name || 'Без названия'}</h3>
            <p className="buy-card__price">
              <img className="buy-card__euro" src={euro} alt="Euro" />
              {house.price || 'N/A'}
            </p>
            <div className="buy-card__details">
              <div className="buy-card__detail-item buy-card__detail-item--top">
                <span id="buy-card__first-top">
                  {house.area || 'N/A'}<a> м²</a>
                </span>
                <p>Площадь</p>
              </div>
              <img className="buy-card__line" src={line} alt="Line" />
              <div className="buy-card__detail-item buy-card__detail-item--middle buy-card__detail-item--other">
                <span>{house.bedrooms || 'N/A'}</span>
                <p>Спальни</p>
              </div>
              <img className="buy-card__line" src={line} alt="Line" />
              <div className="buy-card__detail-item buy-card__detail-item--other">
                <span>{house.bathrooms || 'N/A'}</span>
                <p>Санузлов</p>
              </div>
            </div>
            <div className="buy-card__details">
              <div className="buy-card__detail-item">
                <span id="buy-card__first-bottom">СВОЙ</span>
                <p>частный пляж</p>
              </div>
              <img className="buy-card__line" src={line} alt="Line" />
              <div className="buy-card__detail-item buy-card__detail-item--other">
                <span>1</span>
                <p>Влад Куертов</p>
              </div>
            </div>
            <p className="buy-card__location">{house.location || 'Не указано'}</p>
          </div>
          <div className="buy-card__image">
            <img src={imageSrc} alt={house.name || 'House'} />
          </div>
        </div>
        <div className="buy-card__container-bottom">
          <div className="buy-card__top">
            <button className="buy-card__call-now" onClick={handleCallClick}>
              позвонить сейчас
            </button>
          </div>
          <div className="buy-card__top">
            <button className="buy-card__view-more" onClick={handleDetailsClick}>
              смотреть подробнее
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyCard;