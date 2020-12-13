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
          <li>Код</li>
          <li>Клієнт</li>
          <li>Дата заключення договору</li>
          <li>Продукт</li>
          <li>Кількість</li>
        </ul>
        <ul className={styles.contractList}>
          {
            contracts.length ?
            contracts.map(contract => {
              return (<li key={contract.id}>
                <span>{contract.id}</span>
                <span>{contract.buyer} {contract.buyerLastName}</span>
                <span>{Moment(contract.cont_date).format('DD-MM-YYYY')}</span>
                <span>{contract.product}</span>
                <span>{contract.count}</span>
              </li>)
            })
              :
              <h1>Поки що немає контрактів</h1>
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