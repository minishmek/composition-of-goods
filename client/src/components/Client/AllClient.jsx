import React, {useEffect, useState} from 'react';
import axios from "../../utils/axios";
import styles from "./Client.module.scss";
import service from '../../services';

function AllClient() {

  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    service.getAll('buyer', setClients, setError);
  }, [])

  const removeClient = (id) => {
    axios.delete(`remove/buyer/${id}`,).then(res => {
      service.getAll('buyer', setClients, setError);
    }).catch(e => {
      setError(e.message)
    })
  }

  return !error ?
    (
      <div>
        <ul className={styles.head}>
          <li>Ім'я</li>
          <li>Прізвище</li>
        </ul>
        <ul className={styles.clientList}>
          {
            clients.length ?
            clients.map(client => {
              return (<li key={client.id}>
                <span>{client.name}</span>
                <span>{client.lastName}</span>
                <span className={styles.remove} onClick={e => removeClient(client.id)}>&times;</span>
              </li>)
            })
              : (<h1>Поки що немає клієнтів</h1>)
          }
        </ul>
      </div>
    )
    :
    (
      <h1 className={styles.error}>{error}</h1>
    );
}

export default AllClient;