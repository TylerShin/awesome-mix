import * as React from "react";
import { Route, Switch } from "react-router-dom";
import SignUp from "./components/signUp";

// TODO: Make NotFound component and extract it
const NotFound = () => {
  return (
    <div style={{ marginTop: 75 }}>
      <h1>404, PAGE NOT FOUND</h1>
    </div>
  );
};

const routesMap = (
  <div>
    <Switch>
      <Route exact path="/" component={SignUp} />
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);

export default routesMap;
