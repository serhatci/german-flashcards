import React from "react";
import { SettingsProvider } from "./contexts/SettingsContext";
import { Switch, Route } from "react-router-dom";
import "./app.css";

import Header from "./components/header-footer/Header.jsx";
import Footer from "./components/header-footer/Footer.jsx";
import Settings from "./components/settings/Settings.jsx";
import HomePage from "./components/home-page/HomePage.jsx";
import FlashCards from "./components/flashcards-page/FlashCards.jsx";
// Authentication imports
import Signup from "./components/authentication-pages/Signup";
import Dashboard from "./components/authentication-pages/Dashboard";
import Login from "./components/authentication-pages/Login";
import PrivateRoute from "./components/authentication-pages/PrivateRoute";
import ForgotPassword from "./components/authentication-pages/ForgotPassword";
import UpdateProfile from "./components/authentication-pages/UpdateProfile";

const App = () => {
  return (
    <div className="app-container" id="app-container">
      <header className="header">
        <Header />
      </header>
      <main className="main-page">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/flashcards" component={FlashCards} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </main>
      <SettingsProvider>
        <footer className="footer">
          <Footer />
        </footer>
        <Settings />
      </SettingsProvider>
    </div>
  );
};

export default App;
