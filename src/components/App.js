import React from "react";
import MainPage from "./main/MainPage";
import KakuroMainPage from "./kakuro/KakuroMainPage";
import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      {/* <MainPage /> */}
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/kakuro" component={KakuroMainPage} />
      </Switch>
    </React.Fragment>
  );

  //return <CreatorPage />;
  // return (
  //   <div className="layout-grid">
  //     <div className="header"></div>
  //     <div className="nav">
  //       <Spider speed={0.8} />
  //     </div>

  //     <div className="content">
  //       <KakuroCreatorPage />
  //     </div>
  //     <div className="side-bar"></div>
  //     <div className="footer"></div>
  //   </div>
  // );
};

export default App;
