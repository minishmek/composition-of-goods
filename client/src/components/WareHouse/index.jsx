import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Header from "../Header/Header";
import Contract from "../Contract/Contract";
import Product from "../Product/Product";
import Client from "../Client/Client";
import TTN from "../TTN/TTN";

function Index() {
  return (
    <Router>
      <Header/>
      <Route path="/" exact>
        <h1>Курсова робота по бд</h1>
      </Route>
      <Route path="/contract" component={Contract}/>
      <Route path="/product" component={Product}/>
      <Route path="/client" component={Client}/>
      <Route path="/ttn" component={TTN}/>
    </Router>
  );
}

export default Index;