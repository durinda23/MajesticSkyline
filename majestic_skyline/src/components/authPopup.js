import React, { useState } from 'react';
import axios from 'axios';
import '../css/auth_popup.css';

const AuthPopup = ({ visible, onClose, onAuthenticate }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
    });
    const [error, setError] = useState('');

    if (!visible) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const response = await axios.post(
                    'http://majesticapi/login.php',
                    {
                        email: formData.email,
                        password: formData.password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                console.log(response.data);
                onAuthenticate(response.data.user);
                onClose();
            } else {
                const registrationData = {
                    email: formData.email,
                    password: formData.password,
                    first_name: formData.first_name,
                };

                const response = await axios.post('http://majesticapi/register.php', registrationData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Произошла ошибка.');
        }
    };

    return (
        <div className="auth-popup-overlay" onClick={handleOverlayClick}>
            <div className="auth-popup-content">
                <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="first_name"
                            placeholder="имя"
                            onChange={handleInputChange}
                            required
                            value={formData.first_name}
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="почта"
                        onChange={handleInputChange}
                        required
                        value={formData.email}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="пароль"
                        onChange={handleInputChange}
                        required
                        value={formData.password}
                    />
                    <button type="submit">{isLogin ? 'войти' : 'зарегистрироваться'}</button>
                    {error && <p className="auth-error">{error}</p>}
                </form>
                <p
                    className="auth-toggle-text"
                    onClick={() => {
                        setError('');
                        setIsLogin(!isLogin);
                    }}
                >
                    {isLogin ? 'еще нет аккаунта? Регистрация' : 'уже есть аккаунт? Войти'}
                </p>
            </div>
        </div>
    );
};

export default AuthPopup;
