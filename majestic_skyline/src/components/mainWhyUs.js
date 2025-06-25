import React from 'react';
import '../css/main_why_us.css'; // Подключаем стили
import confidentialityIcon from '../img/confidentiality_icon.svg'; // Иконка конфиденциальности
import networkIcon from '../img/network_icon.svg'; // Иконка сети партнеров
import supportIcon from '../img/support_icon.svg'; // Иконка поддержки

const WhyUs = () => {
  return (
    <section className="why-us">
      <div className="why-us-content">
        <div className="why-us-header">
          <h2>Почему мы?</h2>
          <p>
            Majestic SkyLine — это не просто сделки, это эксклюзивные решения для тех, кто привык к большему. Влад Куертов и команда находят то, о чем вы даже не успели подумать.
          </p>
        </div>
        <div className="why-us-cards">
          <div className="card conf-card">
            <img src={confidentialityIcon} alt="Confidentiality" className="card-icon" />
            <a>Конфиденциальность</a>
            <p>Ваши тайны останутся между нами и золотым унитазом</p>
          </div>
          <div className="card network-card">
            <img src={networkIcon} alt="Network" className="card-icon" />
            <a>Глобальная сеть партнеров</a>
            <p>От Москвы до Марса (ну почти)</p>
          </div>
          <div className="card support-card">
            <img src={supportIcon} alt="Support" className="card-icon" />
            <a>Персональный подбор объекта</a>
            <p>Не просто дом — ваше отражение в зеркале лифта</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;