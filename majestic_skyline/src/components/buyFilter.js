import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BuyCard from './buyCard';
import '../css/buy_filter.css';
import russiaFilter from '../img/russia_filter.png';
import spainFilter from '../img/spain_filter.png';
import otherFilter from '../img/other_filter.png';

const BuyFilter = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [houses, setHouses] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(`http://majesticapi/getHouses.php?country=${selectedCountry}&category=buy`)
        .then((response) => {
          setHouses(response.data);
          setShowFilters(false);
        })
        .catch((error) => {
          console.error('Ошибка загрузки домов:', error);
          setShowFilters(false);
        });
    }
  }, [selectedCountry]);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleBackToFilters = () => {
    setSelectedCountry(null);
    setHouses([]);
    setShowFilters(true);
  };

  return (
    <section className="buy-filter">
      {showFilters ? (
        <>
          <h3 className="filter-title">купи - порадуй дядю куертова</h3>
          <div className="buy-filter-content">
            <img
              className="russia-filter"
              src={russiaFilter}
              alt="Russia"
              onClick={() => handleCountryClick('Россия')}
            />
            <div className="buy-filter-content-right">
              <img
                src={spainFilter}
                alt="Spain"
                onClick={() => handleCountryClick('Испания')}
              />
              <img
                src={otherFilter}
                alt="Other"
                onClick={() => handleCountryClick('Другое')}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="houses-list">
            {houses.length > 0 ? (
              houses.map((house) => <BuyCard key={house.ID_house} house={house} />)
            ) : (
              <p>Нет доступных домов для {selectedCountry}</p>
            )}
          </div>
          {/* <button className="back-to-filters" onClick={handleBackToFilters}>
            Назад к фильтрам
          </button> */}
        </>
      )}
    </section>
  );
};

export default BuyFilter;