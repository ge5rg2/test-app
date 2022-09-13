import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./routes/Main";
import Navigation from "./Navigation";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Mypage from "./routes/Mypage";

function Router() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/mypage/order">
          <Mypage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/sign-up">
          <Signup />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
