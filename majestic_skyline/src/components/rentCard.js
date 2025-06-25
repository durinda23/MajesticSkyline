import React from 'react';
import '../css/rent_card.css';
import line from '../img/line.svg';
import euro from '../img/euro.svg';

const RentCard = ({ house }) => {
  const handleCallClick = () => {
    window.location.href = `tel:${house.phone || '+79001234567'}`;
  };

  const handleDetailsClick = () => {
    window.location.href = `/house/${house.ID_house}`;
  };

  const imageSrc = house.photos || '../img/main_buy_house.png';

  return (
    <section className="rent-card">
      <div className="rent-card__container">
        <div className="rent-card__container-top">
          <div className="rent-card__info">
            <h3>{house.name || 'Без названия'}</h3>
            <p className="rent-card__price">
              <img className="rent-card__euro" src={euro} alt="Euro" />
              {house.price || 'N/A'}
            </p>
            <div className="rent-card__details">
              <div className="rent-card__detail-item rent-card__detail-item--top">
                <span id="rent-card__first-top">
                  {house.area || 'N/A'}<a> м²</a>
                </span>
                <p>Площадь</p>
              </div>
              <img className="rent-card__line" src={line} alt="Line" />
              <div className="rent-card__detail-item rent-card__detail-item--middle rent-card__detail-item--other">
                <span>{house.bedrooms || 'N/A'}</span>
                <p>Спален</p>
              </div>
              <img className="rent-card__line" src={line} alt="Line" />
              <div className="rent-card__detail-item rent-card__detail-item--other">
                <span>{house.bathrooms || 'N/A'}</span>
                <p>Санузлов</p>
              </div>
            </div>
            <div className="rent-card__details">
              <div className="rent-card__detail-item">
                <span id="rent-card__first-bottom">СВОЙ</span>
                <p>пенисный корт</p>
              </div>
              <img className="rent-card__line" src={line} alt="Line" />
              <div className="rent-card__detail-item rent-card__detail-item--other">
                <span>1</span>
                <p>Кокошка по вызову</p>
              </div>
            </div>
            <p className="rent-card__location">{house.location || 'Не указано'}</p>
          </div>
          <div className="rent-card__image">
            <img src={imageSrc} alt={house.name || 'House'} />
          </div>
        </div>
        <div className="rent-card__container-bottom">
          <div className="rent-card__top">
            <button className="rent-card__call-now" onClick={handleCallClick}>
              позвонить сейчас
            </button>
          </div>
          <div className="rent-card__top">
            <button className="rent-card__view-more" onClick={handleDetailsClick}>
              смотреть подробнее
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentCard;