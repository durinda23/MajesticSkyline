import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import houseImage from '../img/main_buy_house.png'; // Импорт заглушки
import '../css/house_detail.css';
import line from '../img/line.svg';
import euro from '../img/euro_black.svg';

const HouseDetail = () => {
  const { id } = useParams(); // Получаем ID_house из URL
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await axios.get(`http://majesticapi/getHouses.php?houseId=${id}`);
        const houses = response.data;
        if (houses.length > 0) {
          setHouse(houses[0]); // Предполагаем, что вернется массив с одним домом
        } else {
          setHouse(null); // Если дом не найден
        }
      } catch (error) {
        console.error('Ошибка загрузки данных дома:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHouse();
  }, [id]);

  if (loading) {
    return <p className="house-detail__loading">Загрузка...</p>;
  }

  if (!house) {
    return <p className="house-detail__error">Дом не найден</p>;
  }

  return (
    <section className="house-detail">
      <div className="house-detail__top">
        <div className="house-detail__header">
          <h1 className="house-detail__title">{house.name || 'Без названия'}</h1>
          <p className="house-detail__price">
            <img className="house-detail__euro" src={euro} alt="Euro" />
            {house.price || 'N/A'}
          </p>
          <div className="house-detail__details">
            <div className="house-detail__detail-item house-detail__detail-item--top">
              <span className="house-detail__detail-value" id="house-detail__first-top">
                {house.area || 'N/A'}<a> м²</a>
              </span>
              <p className="house-detail__detail-label">Площадь</p>
            </div>
            <img className="house-detail__line" src={line} alt="Line" />
            <div className="house-detail__detail-item house-detail__detail-item--middle house-detail__detail-item--other">
              <span className="house-detail__detail-value">{house.bedrooms || 'N/A'}</span>
              <p className="house-detail__detail-label">Спальни</p>
            </div>
            <img className="house-detail__line" src={line} alt="Line" />
            <div className="house-detail__detail-item house-detail__detail-item--other">
              <span className="house-detail__detail-value">{house.bathrooms || 'N/A'}</span>
              <p className="house-detail__detail-label">Санузлов</p>
            </div>
          </div>
          <div className="house-detail__details">
            <div className="house-detail__detail-item house-detail__detail-item--top">
              <span className="house-detail__detail-value" id="house-detail__first-bottom">
                СВОЙ
              </span>
              <p className="house-detail__detail-label">частный пляж</p>
            </div>
            <img className="house-detail__line" src={line} alt="Line" />
            <div className="house-detail__detail-item house-detail__detail-item--other">
              <span className="house-detail__detail-value">1</span>
              <p className="house-detail__detail-label">Влад Куертов</p>
            </div>
          </div>
          <p className="house-detail__location">{house.location || 'Не указано'}</p>
        </div>
        <div className="house-detail__gallery">
          <img className="house-detail__gallery-image" src={house.photos || houseImage} alt={house.name || 'House'} />
        </div>
      </div>
      <div className="house-detail__features-section">
        <h2 className="house-detail__features-title">ОСОБЕННОСТИ:</h2>
        <ul className="house-detail__features-list">
          <li className="house-detail__feature-item">Индивидуальный виноградник</li>
          <li className="house-detail__feature-item">Винный подвал с подогревом</li>
          <li className="house-detail__feature-item">Вертикальный сад на фасаде</li>
        </ul>
      </div>
      <div className="house-detail__description-section">
        <h2 className="house-detail__description-title">КРАТКОЕ ОПИСАНИЕ:</h2>
        <p className="house-detail__description-text">
          {house.description || 'Описание отсутствует'}
        </p>
      </div>
    </section>
  );
};

export default HouseDetail;