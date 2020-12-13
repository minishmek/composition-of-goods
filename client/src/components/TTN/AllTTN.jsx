import React, {useEffect, useState} from 'react';
import Moment from 'moment'
import styles from "./TTN.module.scss";
import services from '../../services'

function AllTTN() {

  const [ttn, setTtn] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    services.getAll('ttn', setTtn, setError);
  }, [])

  return !error ?
    (
      <div>
        <ul className={styles.head}>
          <li>Контракт</li>
          <li>Кількість</li>
          <li>Дата заключення накладної</li>
        </ul>
        <ul className={styles.ttnList}>
          {
            ttn.length ?
            ttn.map(t => {
              return (<li key={t.id}>
                <span>{t.contract}</span>
                <span>{t.count}</span>
                <span>{Moment(t.date).format('DD-MM-YYYY')}</span>
              </li>)
            })
              :
              <h1>Поки що немає товарних накладних</h1>
          }
        </ul>
      </div>
    )
    :
    (
      <h1 className={styles.error}>{error}</h1>
    );
}

export default AllTTN;