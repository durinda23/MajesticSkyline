import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Добавляем axios для запросов
import Header from './components/header';
import MainHero from './components/mainHero';
import MainAdvantages from './components/mainAdvantages';
import WhyUs from './components/mainWhyUs';
import MainBuy from './components/mainBuy';
import MainRent from './components/mainRent';
import MainCase from './components/mainCase';
import MainFeedback from './components/mainFeedback';
import CallForm from './components/callForm';
import Footer from './components/footer';
import RentCard from './components/rentCard';
import Contact from './components/contact';
import BuyFilter from './components/buyFilter';
import AuthPopup from './components/authPopup';
import About from './components/about';
import Account from './components/account';
import HouseDetail from './components/houseDetail';
import Case from './components/case';
import Rent from './components/Rent';
import AdminPanel from './components/AdminPanel';

const isAdmin = (isAuthenticated, user) => {
  return isAuthenticated && user?.role === 'Админ';
};

const AppContent = () => {
  const [activePage, setActivePage] = useState('main');
  const [isAuthPopupVisible, setAuthPopupVisible] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Проверка сессии при загрузке
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://majesticapi/login.php');
        if (response.data.user) {
          setAuthenticated(true);
          setUser(response.data.user);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(response.data.user));
          const path = location.pathname;
          if (path === '/admin' && isAdmin(true, response.data.user)) {
            setActivePage('admin');
          } else if (path === '/account') {
            setActivePage('account');
          }
        } else {
          const savedAuth = localStorage.getItem('isAuthenticated');
          const savedUser = localStorage.getItem('user');
          if (savedAuth === 'true' && savedUser) {
            setAuthenticated(true);
            setUser(JSON.parse(savedUser));
            if (location.pathname === '/account') {
              setActivePage('account');
            }
          } else {
            setAuthenticated(false);
            setUser(null);
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Ошибка проверки сессии:', error);
        const savedAuth = localStorage.getItem('isAuthenticated');
        const savedUser = localStorage.getItem('user');
        if (savedAuth === 'true' && savedUser) {
          setAuthenticated(true);
          setUser(JSON.parse(savedUser));
        } else {
          setAuthenticated(false);
          setUser(null);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('user');
        }
      }
    };
    checkSession();
  }, [location]);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActivePage('main');
    else if (path === '/buy') setActivePage('buy');
    else if (path === '/rent') setActivePage('rent');
    else if (path === '/about') setActivePage('about');
    else if (path === '/contact') setActivePage('contact');
    else if (path === '/account') setActivePage('account');
    else if (path === '/case') setActivePage('case');
    else if (path === '/admin' && !isAdmin(isAuthenticated, user)) {
      setActivePage('main'); // Перенаправляем, если нет прав
    } else if (path === '/admin' && isAdmin(isAuthenticated, user)) {
      setActivePage('admin');
    }
  }, [location, isAuthenticated, user]);

  useEffect(() => {
    console.log('Current Page:', activePage);
    console.log('Authenticated:', isAuthenticated);
    console.log('User:', user);
  }, [activePage, isAuthenticated, user]); 

  const handleAuthenticate = (userData) => {
    setAuthenticated(true);
    setUser(userData);
    if (userData.role === 'Админ') {
      setActivePage('admin');
      navigate('/admin');
    } else {
      setActivePage('account');
      navigate('/account');
    }
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleAccountClick = () => {
    if (isAuthenticated) {
      setActivePage(user.role === 'Админ' ? 'admin' : 'account');
      navigate(user.role === 'Админ' ? '/admin' : '/account');
    } else {
      setAuthPopupVisible(true);
    }
  };

  const setPage = (page) => {
    setActivePage(page);
    navigate(page === 'main' ? '/' : `/${page}`);
  };

  return (
    <div>
      <Header
        activePage={activePage}
        setActivePage={setPage}
        onAccountClick={handleAccountClick}
      />
      <Routes>
        <Route
          path="/"
          element={
            activePage === 'main' ? (
              <>
                <MainHero setActivePage={setPage} activePage={activePage} />
                <MainAdvantages />
                <WhyUs />
                <MainBuy setActivePage={setPage} />
                <MainRent setActivePage={setPage} />
                <MainCase setActivePage={setPage} />
                <MainFeedback />
                <CallForm />
              </>
            ) : null
          }
        />
        <Route
          path="/buy"
          element={activePage === 'buy' ? <BuyFilter /> : null}
        />
        <Route
          path="/rent"
          element={activePage === 'rent' ? <Rent /> : null}
        />
        <Route
          path="/about"
          element={activePage === 'about' ? <About /> : null}
        />
        <Route
          path="/contact"
          element={activePage === 'contact' ? <Contact /> : null}
        />
        <Route
          path="/account"
          element={
            activePage === 'account' && isAuthenticated && user ? (
              <Account userId={user?.ID_client} setAuthenticated={setAuthenticated} setUser={setUser} />
            ) : null
          }
        />
        <Route
          path="/house/:id"
          element={
            <>
              <HouseDetail />
              <CallForm />
            </>
          }
        />
        <Route
          path="/case"
          element={activePage === 'case' ? <Case /> : null}
        />
        <Route
          path="/admin"
          element={
            activePage === 'admin' && isAdmin(isAuthenticated, user) ? (
              <AdminPanel isAuthenticated={isAuthenticated} user={user} setAuthenticated={setAuthenticated} setUser={setUser} />
            ) : (
              <p className="error-message">Доступ запрещён. Только для админов!</p>
            )
          }
        />
      </Routes>
      <Footer />
      {isAuthPopupVisible && (
        <AuthPopup
          visible={isAuthPopupVisible}
          onClose={() => setAuthPopupVisible(false)}
          onAuthenticate={handleAuthenticate}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;