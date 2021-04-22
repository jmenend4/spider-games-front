import React from "react";
import MainPage from "./main/MainPage";
import KakuroMainPage from "./kakuro/KakuroMainPage";
import { Switch, Route } from "react-router-dom";
import SpiderToasts from "./common/spider-toast/SpiderToasts";

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/kakuro" component={KakuroMainPage} />
      </Switch>
      <SpiderToasts />
    </React.Fragment>
  );
};

export default App;
