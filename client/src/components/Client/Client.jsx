import React from 'react';
import AllClient from "./AllClient";
import AddNewClient from "./AddNewClient";

function Client() {

  return (
    <div>
      <h1>Клієнти</h1>
      <AddNewClient/>
      <AllClient/>
    </div>
  );
}

export default Client;