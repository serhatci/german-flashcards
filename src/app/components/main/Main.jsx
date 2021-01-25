import { Switch, Route } from "react-router-dom";

import HomePage from "../home-page/HomePage.jsx";
import FlashCards from "../flashcards-page/FlashCards.jsx";
// Authentication pages imports
import Signup from "../authentication-pages/Signup";
import Dashboard from "../authentication-pages/Dashboard";
import Login from "../authentication-pages/Login";
import PrivateRoute from "../authentication-pages/PrivateRoute";
import ForgotPassword from "../authentication-pages/ForgotPassword";
import UpdateProfile from "../authentication-pages/UpdateProfile";

const Main = (props) => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => <HomePage buttons={props.buttons} />}
      />
      <Route path="/flashcards" component={FlashCards} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/update-profile" component={UpdateProfile} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />
    </Switch>
  );
};

export default Main;
