import React, { useEffect, useRef } from 'react';
import '../css/about.css';
import { Scene, Controller } from 'scrollmagic'; // Импортируем ScrollMagic
import personImage1 from '../img/about1.png';
import personImage2 from '../img/about2.png';
import personImage3 from '../img/about3.png';
import personImage4 from '../img/about4.png';
import personImage5 from '../img/about5.png';
import personImage6 from '../img/about6.png';

const About = () => {
  const sections = [
    {
      title: 'История компании Majestic SkyLine',
      subtitle: 'Рождение легенды',
      text: 'Владислав Полищук (известный миру как Влад Куертов), будучи вундеркиндом элитной недвижимости, основал компанию Majestic SkyLine в возрасте 3 лет.<br /><br />- Первый офис: детская песочница в Подмосковье.<br />- Первая сделка: обмен машинки на Hot Wheels на долю в коттеджном поселке (по словам Влада, «это был сложнейший переговорный процесс с соседом по песочнице»).<br />- Философия: «Если ты не можешь купить замок — создай компанию, которая их продает».',
      year: '2K 05',
      image: personImage1,
      imageSize: { width: '472rem', height: '570rem' },
    },
    {
      title: 'История компании Majestic SkyLine',
      subtitle: 'Путь на вершину',
      text: '- Тайно посещал закрытые показы элитных объектов под видом «сына миллиардера».<br />- Заключил первую настоящую сделку — продал квартиру в Москва-Сити, убедив клиента, что «вид на пробки — это новый фэншуй».',
      year: '2K 10',
      image: personImage2,
      imageSize: { width: '470rem', height: '528rem' },
    },
    {
      title: 'История компании Majestic SkyLine',
      subtitle: 'Ключевые достижения',
      text: 'Рекордная продажа пентхауса с золотым унитазом (клиент позже признался, что купил его «из-за харизмы агента»).',
      year: '2K 15',
      image: personImage3,
      imageSize: { width: '463rem', height: '520rem' },
    },
    {
      title: 'История компании Majestic SkyLine',
      subtitle: 'Ключевые достижения',
      text: 'Экспансия в Дубай. Влад лично проверял каждый бассейн на возможность стрима в категории Hot Pools.',
      year: '2K 17',
      image: personImage4,
      imageSize: { width: '484rem', height: '497rem' },
    },
    {
      title: 'История компании Majestic SkyLine',
      subtitle: 'Эра глобального доминирования',
      text: '- 2021: Запуск Crypto Realty — оплата биткоинами, но только если клиент согласен на NFT-портрет в подарок.<br /><br />- 2023: Продажа «невидимой виллы» в Швейцарии (объект есть, но его «может видеть только тот, кто действительно готов купить»).<br /><br />- 2024: Открытие офиса на Марсе (пока в метавселенной, но Влад уверен, что Илон Маск «просто еще не позвонил»).',
      year: '2K 20',
      image: personImage5,
      imageSize: { width: '466rem', height: '496rem' },
    },
    {
      title: 'наша миссия',
      subtitle: 'почему мы?',
      text: '«Делать невозможное — очевидным. А очевидное — эксклюзивным. Если вы можете себе это представить — мы уже продаем это. Если не можете — у нас есть Влад Куертов, который вам это объяснит».<br /><br />Конфиденциальность:<br />Ваши соседи никогда не узнают, что вы купили этот замок (если только не прочитают наш инстаграм).<br /><br />Креатив:<br />Мы найдем вам дом даже в Зазеркалье (доплата за портал в договоре).<br /><br />Влад Куертов:<br />Да, он реально существует. Нет, мы не даем его номер телефона.',
      year: '',
      image: personImage6,
      imageSize: { width: '434rem', height: '490rem' },
    },
  ];

  const timelineRef = useRef(null);

  useEffect(() => {
    const controller = new Controller(); // Инициализация контроллера

    // Привязываем каждую секцию к сцене ScrollMagic
    sections.forEach((section, index) => {
      new Scene({
        triggerElement: `#section-${index}`, // ID каждой секции
        triggerHook: 0.5, // Позиция триггера (середина экрана)
        duration: '100%', // Продолжительность эффекта
      })
        .setClassToggle(`#section-${index}`, 'active') // Добавляем класс active секции
        .on('enter', () => {
          if (timelineRef.current) {
            const yearItems = timelineRef.current.querySelectorAll('.year-item');
            yearItems.forEach(item => item.classList.remove('active'));
            if (section.year) {
              const activeYear = timelineRef.current.querySelector(`.year-item[data-year="${section.year}"]`);
              if (activeYear) activeYear.classList.add('active');
            }
          }
        })
        .addTo(controller); // Добавляем сцену в контроллер
    });

    // Очистка контроллера при размонтировании компонента
    return () => controller.destroy(true);
  }, [sections]);

  return (
    <section className="about">
      <div className="about__timeline-container">
        <div className="about__year-timeline" ref={timelineRef}>
          {sections.map((section, index) => (
            section.year && (
              <div
                key={index}
                className="year-item"
                data-year={section.year}
              >
                {section.year}
              </div>
            )
          ))}
        </div>
        <div className="about_container-line">
            
        </div>
        <div className="about__content-timeline">
          {sections.map((section, index) => (
            <div
              id={`section-${index}`}
              key={index}
              className="about__section"
            >
              <div className="about__content">
                <h2 className="about__title">{section.title}</h2>
                <h3 className="about__subtitle">{section.subtitle}</h3>
                <p className="about__text" dangerouslySetInnerHTML={{ __html: section.text }} />
                {/* Убираем year из контента, так как он теперь в левой колонке */}
              </div>
              <div className="about__image">
                <img src={section.image} alt={section.subtitle} style={section.imageSize} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;