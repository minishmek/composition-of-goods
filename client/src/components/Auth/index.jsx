import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

function Index() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register}/>
        <Route path="/" component={Login} exact/>
        <Redirect to="/"/>
      </Switch>
    </Router>
  );
}

export default Index;