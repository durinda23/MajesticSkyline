import React from 'react';
import '../css/main_advantages.css'; // Подключаем стили

const MainAdvantages = () => {
    return (
        <section className="main-advantages">
            <div className="main-advantages-content">
                <div className="advantage-item" id="top">
                    <h2>20 ЛЕТ</h2>
                    <p>
                        на рынке элитной недвижимости. Более 500 довольных клиентов. Индивидуальный подход к каждому                </p>
                </div>
                <div className="advantage-item" id="bottom">
                    <h2>1 КУЕРТОВ</h2>
                    <p>
                        на рынке элитной недвижимости. Более 500 довольных клиентов. Индивидуальный подход к каждому                </p>
                </div>
            </div>
        </section>
    );
};

export default MainAdvantages;