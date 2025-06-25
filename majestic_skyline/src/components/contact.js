import React from 'react';
import '../css/Contact.css'; // Подключаем CSS
import telegramIcon from '../img/telegram.svg'; // Иконка Telegram
import linkedinIcon from '../img/linkedin.svg'; // Иконка LinkedIn
import instagramIcon from '../img/instagram.svg'; // Иконка Instagram
import twitterIcon from '../img/twitter.svg'; // Иконка Twitter

const Contact = () => {
    return (
        <section className="contact">
            <div className="contact__container">
                <div className="contact__content">
                    <h2 className="contact__title">ХОТИТЕ СВОЙ ИДЕАЛЬНЫЙ ДОМ?<br /> <br />СВЯЖИТЕСЬ С НАМИ:</h2>
                    <div className="contact__info">
                        <p className="contact__info-item">
                            📍  Москва, ул. Тверская, 1 <br />
                            <br />
                            ✉️  elite@majesticskyline.com <br />
                            <br />
                            📞  +7 (XXX) XXX-XX-XX
                        </p>
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
                <div className="contact__map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4490.31714588896!2d37.60912337128653!3d55.75574752033507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5aa91b8145%3A0x7e7cddd0c984796c!2zNiwgMSwg0JzQvtGB0LrQstCwLCAxMjUwMDk!5e0!3m2!1sru!2sru!4v1749568331715!5m2!1sru!2sru"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default Contact;