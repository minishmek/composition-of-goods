import React from "react";

import AllProduct from "./AllProduct";
import AddNewProduct from "./AddNewProduct";

const Product = () => {

  return (
    <div>
      <h1>Продукти на складі</h1>
      <AddNewProduct/>
      <AllProduct/>
    </div>
  );
}

export default Product