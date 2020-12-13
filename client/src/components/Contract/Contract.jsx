import React from "react";
import AllContract from "./AllContract";
import AddNewContract from "./AddNewContract";

const Contract = () => {
  return (
    <div>
      <h1>Контракти</h1>
      <AddNewContract/>
      <AllContract/>
    </div>
  )
}

export default Contract