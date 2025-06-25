import React, { useState } from 'react';
import axios from 'axios';
import '../css/call_form.css';
import leonardoImage from '../img/leonardo.png';
import arrowButton from '../img/account_arrow.svg';

const MainCall = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        deal: 'купить',
        telegram: '',
    });
    const [isBuyActive, setIsBuyActive] = useState(true);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBuyClick = () => {
        setIsBuyActive(true);
        setFormData((prev) => ({ ...prev, deal: 'купить' }));
    };

    const handleRentClick = () => {
        setIsBuyActive(false);
        setFormData((prev) => ({ ...prev, deal: 'арендовать' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://majesticapi/send_feedback.php', formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.data.status === 'ok') {
                setMessage('Сообщение успешно отправлено!');
            } else {
                setMessage(response.data.message || 'Неизвестная ошибка.');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Ошибка при отправке. Попробуйте еще раз.');
            console.error('Error:', error.response?.data || error.message);
        }
    };

    return (
        <section className="main-call" id="call-form">
            <h2 className="form-title">Влад Куертов ждет вашего запроса!</h2>
            <div className="call-content">
                <div className="call-image">
                    <img src={leonardoImage} alt="Leonardo DiCaprio" />
                </div>
                <div className="call-form">
                    <form onSubmit={handleSubmit}>
                        <div className="call-form-top">
                            <input
                                type="text"
                                name="name"
                                placeholder="имя"
                                className="form-input"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="email@kuku.com"
                                className="form-input"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="call-from-bottom">
                            <div className="call-from-bottom-areas">
                                <div className="call-buttons">
                                    <button
                                        type="button"
                                        className={`call-button call-button-left ${isBuyActive ? 'active' : ''}`}
                                        onClick={handleBuyClick}
                                    >
                                        КУПИТЬ
                                    </button>
                                    <button
                                        type="button"
                                        className={`call-button call-button-right ${!isBuyActive ? 'active' : ''}`}
                                        onClick={handleRentClick}
                                    >
                                        АРЕНДОВАТЬ
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    name="telegram"
                                    placeholder="@telegram"
                                    className="form-input"
                                    value={formData.telegram}
                                    onChange={handleInputChange}
                                />
                                <button type="submit" className="submit-button">
                                    отправить
                                </button>
                            </div>
                            <div className="call-self-contact">
                                <p>Связаться самостоятельно</p>
                                <div className="form-button-arrow">
                                    <img src={arrowButton} alt="Arrow" />
                                </div>
                            </div>
                        </div>
                    </form>
                    {message && <p className={`form-message ${message.includes('Ошибка') ? 'error' : ''}`}>{message}</p>}
                </div>
            </div>
        </section>
    );
};

export default MainCall;