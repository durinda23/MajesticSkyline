import React from 'react';
import '../css/main_feedback.css';
import feedbackhouse1 from '../img/feedback_house1.png';
import feedbackhouse2 from '../img/feedback_house2.png';
import feedbackhouse3 from '../img/feedback_house3.png';


const MainFeedback = () => {
    return (
        <section className="main-feedback">
            <div className="feedback-content">
                <div className="feedback-top">
                    <div className="feedback-top-left">
                        <div className="feedback-top-left-top">
                            <h1>Отзывы любимок</h1>
                            <div className="top-feedback">
                                <h3>Ксения Собчак</h3>
                                <p>Продали мне пентхаус без скандала. Разочарована</p>
                            </div>
                            <div className="bottom-feedback">
                                <h3>Павел Дуров</h3>
                                <p>Попросил их вернуть стену. Отказали в связи с<br />законом бумеранга</p>
                            </div>
                        </div>
                        <div className="feedback-top-left-bottom">
                            <div className="feedback-top-left-bottom-left">
                                <img src={feedbackhouse1} alt='house1' />
                            </div>
                            <div className="feedback-top-left-bottom-right">
                                <h3>Бритни Спирс</h3>
                                <p>Купила особняк в 2007-м. До сих пор не помню, где у меня кухня, но все равно рекомендую!</p>
                            </div>
                        </div>

                    </div>
                    <div className="feedback-top-right">
                        <img src={feedbackhouse2} alt='house2' />
                    </div>

                </div>
                <div className="feedback-bottom">
                    <div className="feedback-bottom-left">
                        <img src={feedbackhouse3} alt='house3' />
                    </div>
                    <div className="feedback-bottom-right">
                        <h3>Алла Пугачева</h3>
                        <p>Дачу в Жуковке продали за 5 минут. Теперь Максик  обижается, что его не спросили</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainFeedback;