import React from 'react';
import '../css/main_case.css';
import arrowCase from '../img/main_arrow.svg';
import dollar from '../img/$-white.svg';

const MainCase = ({ setActivePage }) => {
  const handleCaseClick = () => {
    if (setActivePage) {
      setActivePage('case'); // Переключаем на страницу кейса
    }
  };

  return (
    <section className="main-case">
      <div className="main-case-left">
        <h1>
          <img src={dollar} className="case-dollar" alt="$" />
          12,5<span className="span-middle">кк - </span>
          3 <span className="span-day">дня</span>
        </h1>
        <img src={arrowCase} alt="arrow" className="case-arrow" />
      </div>
      <div className="main-case-right">
        <p className="main-case-text">
          Да это проще, чем выбрать фильм на вечер! Наши клиенты уже хвастаются видами из окон нового особняка, а мы сэкономили им кучу времени и нервов.
        </p>
        <button className="main-case-btn" onClick={handleCaseClick}>
          НЕ веришь? Переходи к нашему лучшему кейсу!
        </button>
      </div>
    </section>
  );
};

export default MainCase;