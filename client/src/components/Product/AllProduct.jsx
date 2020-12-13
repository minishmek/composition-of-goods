import React, {useEffect, useState} from 'react';
import styles from "./Product.module.scss";
import axios from "../../utils/axios";
import services from '../../services';

function AllProduct() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const databaseName = 'product'

  useEffect(() => {
    services.getAll(databaseName, setProducts, setError);
  }, [])

  const removeProduct = (id) => {
    axios.delete(`remove/product/${id}`,).then(res => {
      services.getAll(databaseName, setProducts, setError);
    }).catch(e => {
      console.log(setError(e.message))
    })
  }

  return !error ?
    (
      <div>
        <ul className={styles.head}>
          <li>Назва</li>
          <li>Ціна</li>
        </ul>
        <ul className={styles.productList}>
          {
            products.map(product => {
              return (<li key={product.id}>
                <span>{product.name}</span>
                <span>
                  {product.price}
                  <a className={styles.removeProduct} onClick={e => removeProduct(product.id)}>&times;</a>
                </span>
              </li>)
            })
          }
        </ul>
      </div>
    )
    :
    (
      <h1 className={styles.error}>{error}</h1>
    );
}

export default AllProduct;