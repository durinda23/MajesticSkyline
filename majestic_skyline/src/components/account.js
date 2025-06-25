import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/account.css';
import accountImage from '../img/main_buy_house.png';

const Account = ({ userId, setAuthenticated, setUser }) => {
    const [userData, setUserData] = useState(null);
    const [review, setReview] = useState({ name: '', deal: 'куплено', content: '' });
    const [message, setMessage] = useState('');
    const [isBuyActive, setIsBuyActive] = useState(true);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (!userId) {
            console.error('userId is undefined');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://majesticapi/getUser.php?userId=${userId}`);
                console.log('User data received:', response.data);
                const fullUserData = response.data;
                setUserData(fullUserData);
                setUser(fullUserData); // Синхронизация с глобальным состоянием
            } catch (error) {
                console.error('Ошибка получения данных пользователя:', error);
                setUserData({ first_name: 'Гость', email: 'guest@majestic.com', ID_client: null, role: null });
                setUser(null);
                setAuthenticated(false); // Сброс авторизации при ошибке
            }
        };

        fetchUserData();
    }, [userId, setUser, setAuthenticated]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview((prev) => ({ ...prev, [name]: value }));
    };

    const handleBuyClick = () => {
        setIsBuyActive(true);
        setReview((prev) => ({ ...prev, deal: 'куплено' }));
    };

    const handleRentClick = () => {
        setIsBuyActive(false);
        setReview((prev) => ({ ...prev, deal: 'арендовано' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://majesticapi/addReview.php', { ...review, userId });
            setMessage(response.data.message);
            setShowPopup(true);
            setReview({ name: '', deal: 'куплено', content: '' });
            setIsBuyActive(true);
            setTimeout(() => setShowPopup(false), 5000);
        } catch (error) {
            setMessage('Ошибка при добавлении отзыва.');
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get('http://majesticapi/login.php?logout=true');
            setAuthenticated(false);
            setUser(null);
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
            window.location.href = '/';
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    if (!userData) {
        return <p>Загрузка данных...</p>;
    }

    return (
        <div className="account">
            <div className="account-top">
                <h1>Добрый день, {userData.first_name}</h1>
                <p className="account-top_email">{userData.email}</p>
                <button className="logout-btn" onClick={handleLogout}>
                    Выйти
                </button>
            </div>

            <p className="account-par">Хотите оставить отзыв?</p>

            <div className="review-form">
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            className="review-name"
                            placeholder="имя"
                            type="text"
                            name="name"
                            value={review.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <div className="call-buttons">
                        <button
                            type="button"
                            className={`call-button call-button-left ${isBuyActive ? 'active' : ''}`}
                            onClick={handleBuyClick}
                        >
                            КУПЛЕНО
                        </button>
                        <button
                            type="button"
                            className={`call-button call-button-right ${!isBuyActive ? 'active' : ''}`}
                            onClick={handleRentClick}
                        >
                            АРЕНДОВАНО
                        </button>
                    </div>

                    <label>
                        <textarea
                            className="review-area"
                            placeholder="Опишите ваш опыт работы с нами! Поделитесь с пользователями хорошими и плохими моментами..."
                            name="content"
                            value={review.content}
                            onChange={handleInputChange}
                            required
                        />
                    </label>

                    <button className="account-btn_submit" type="submit">
                        Отправить
                    </button>
                </form>

                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <p>Отзыв успешно отправлен!</p>
                        </div>
                    </div>
                )}

                <img className="account-form_image" src={accountImage} alt="house" />
            </div>
        </div>
    );
};

export default Account;