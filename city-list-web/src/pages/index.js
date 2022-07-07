import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import InitialPage from "./InitialPage/InitialPage";

const Pages = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={InitialPage} />
      </Switch>
    </BrowserRouter>
  );
};
export default Pages;
