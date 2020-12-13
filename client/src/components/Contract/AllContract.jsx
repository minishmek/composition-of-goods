import React, {useEffect, useState} from 'react';
import Moment from 'moment'
import styles from "./Contract.module.scss";
import services from '../../services'

function AllContract() {

  const [contracts, setContracts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    services.getAll('contract', setContracts, setError);
  }, [])

  return !error ?
    (
      <div>
        <ul className={styles.head}>
          <li>Клієнт</li>
          <li>Дата заключення договору</li>
          <li>Тип продукту</li>
          <li>Кількість продуктів</li>
          <li>Тара</li>
        </ul>
        <ul className={styles.contractList}>
          {
            contracts.map(contract => {
              return (<li key={contract.id}>
                <span>{contract.user}</span>
                <span>{Moment(contract.dataOfAssebly).format('DD-MM-YYYY')}</span>
                <span>{contract.product}</span>
                <span>{contract.countOfProduct}</span>
                <span>{contract.container}</span>
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

export default AllContract;