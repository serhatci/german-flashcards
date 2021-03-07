import { Switch, Route } from "react-router-dom";

import HomePage from "../home-page/HomePage.jsx";
import FlashCards from "../flashcards-page/FlashCards.jsx";
// Authentication pages imports
import Signup from "../authentication-pages/Signup";
import Login from "../authentication-pages/Login";
import UserPage from "../authentication-pages/UserPage";
import ForgotPassword from "../authentication-pages/ForgotPassword";
import UpdatePassword from "../authentication-pages/UpdatePassword";
import PrivateRoute from "../authentication-pages/PrivateRoute";
import EditHomePage from "../edit-pages/EditHomePage";
import EditFlashcards from "../edit-pages/EditFlashcards";

const Main = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/flashcards/:title" component={FlashCards} />
      <Route path="/auth/update-password" component={UpdatePassword} />
      <Route path="/auth/signup" component={Signup} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/user-page" component={UserPage} />
      <Route path="/auth/forgot-password" component={ForgotPassword} />
      <PrivateRoute path="/edit-homepage" component={EditHomePage} />
      <PrivateRoute
        path="/edit-flashcards/:title"
        component={EditFlashcards}
      />
    </Switch>
  );
};

export default Main;
