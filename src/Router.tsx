import { BrowserRouter, Route, Switch } from "react-router-dom";

import Main from "./routes/Main";
import Navigation from "./Navigation";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Mypage from "./routes/Mypage";
import MyOrder from "./routes/MyOrder";

function Router() {
  return (
    <BrowserRouter>
      <Navigation />
      {/** 순서 중요 */}
      <Switch>
        <Route path="/mypage/order/:itemId">
          <MyOrder />
        </Route>
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
