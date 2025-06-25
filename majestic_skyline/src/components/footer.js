import React from 'react';
import '../css/Footer.css'; // Подключаем CSS
import logo from '../img/logo.svg'; // Используем тот же логотип
import telegramIcon from '../img/telegram.svg'; // Иконка Telegram
import linkedinIcon from '../img/linkedin.svg'; // Иконка LinkedIn
import instagramIcon from '../img/instagram.svg'; // Иконка Instagram
import twitterIcon from '../img/twitter.svg'; // Иконка Twitter

const Footer = () => {
    return (
        <section className="footer">
            <div className="footer-marquee">
                <span>1 — Влад Куертов («Остальные просто подражатели»)</span>
            </div>
            <div className="footer-logos">
                <div className="footer-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="footer-social-icons">
                    <a href="mailto:example@email.com">
                        <img src={telegramIcon} className="footer-icon" />
                    </a>
                    <a href="https://linkedin.com">
                        <img src={linkedinIcon} className="footer-icon" />
                    </a>
                    <a href="https://instagram.com">
                        <img src={instagramIcon} className="footer-icon" />
                    </a>
                    <a href="https://twitter.com">
                        <img src={twitterIcon} className="footer-icon" />
                    </a>
                </div>
            </div>
            <div className="footer-copyright">
                © 2025 все права у Куертова - Наумова Софья
            </div>
        </section>
    );
};

export default Footer;