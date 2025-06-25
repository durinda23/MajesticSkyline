import React, { useEffect, useRef } from 'react';
import '../css/case.css';
import MiddleHouse from '../img/case_middle.png';
import BottomFamily from '../img/case_bottom.png';

const Case = () => {
  return (
    <section className="case">
      <h3 className="case__title">Кейс: Как мы нашли дом мечты за 3 дня для семьи Ивановых</h3>
      <div className="case__top">
        <div className="case__top-left">
          <h4 className="case__top-left__heading">ИВАНОВЫ <br />3 ДНЯ <br />10КК</h4>
        </div>
        <p className="case__top-description">
          <span className="case__top-description__highlight">Задача</span> <br /> <br />
          В мае 2025 года семья Ивановых, состоящая из четырех человек, обратилась в агентство Majestic SkyLine с срочным запросом. Им нужен был элитный дом с видом на море, просторной террасой, минимум 4 спальнями и бюджетом до 10 млн. Переезд планировался к началу июня, что оставляло всего неделю на поиск и оформление. Клиенты особо подчеркивали важность тишины, уединения и быстрого решения.
        </p>
      </div>
      <div className="case__middle">
        <div className="case__middle-left">
          <p className="case__middle-left__text">
            <span className="case__middle-left__highlight">Решение</span> <br /> <br />
            Наша команда немедленно приступила к работе:<br />
            - Провели анализ базы недвижимости и отобрали 3 подходящих объекта в элитных районах побережья.<br />
            - Основной кандидат — роскошный дом в 150 км от города, с 5 спальнями, просторной террасой, бассейном и панорамным видом на море. Стоимость — 9,8 млн.<br />
            - Организовали просмотр в тот же день, 26 мая 2025 года, в 17:00, согласовав время с хозяевами.<br />
            - После одобрения семьи Ивановых, наши юристы взяли на себя оформление документов: проверили правовую чистоту, подготовили договор и зарегистрировали сделку. Процесс занял ровно 3 дня благодаря слаженной работе команды.<br /> <br /><br />
          </p>
          <p className="case__middle-left__text">
            <span className="case__middle-left__highlight">Результат</span> <br /> <br />
            К 29 мая 2025 года, всего через 3 дня после обращения, семья Ивановых получила ключи от нового дома. Теперь они наслаждаются утренним кофе на террасе с видом на море, а дети играют в безопасном саду. Клиенты высоко оценили нашу оперативность и профессионализм, оставив благодарственный отзыв: "Majestic SkyLine — настоящие волшебники недвижимости!"
          </p>
        </div>
        <img className="case__middle-image" src={MiddleHouse} alt="case house" />
      </div>
      <div className="case__bottom">
        <img className="case__bottom-image" src={BottomFamily} alt="фото с семьей" />
      </div>
    </section>
  );
};

export default Case;