import React, {useEffect, useState} from 'react';
import axios from "../../utils/axios";
import styles from "./Container.module.scss";
import services from '../../services'

function AllContainer() {

  const [containers, setContainers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    services.getAll('containers', setContainers, setError);
  }, [])

  const removeClient = (id) => {
    axios.delete(`remove/containers/${id}`,).then(res => {
      services.getAll('containers', setContainers, setError);
    }).catch(e => {
      console.log(setError(e.message))
    })
  }

  return !error ?
    (
      <div>
        <ul className={styles.head}>
          <li>Код</li>
          <li>Назва</li>
          <li>Ціна</li>
        </ul>
        <ul className={styles.containerList}>
          {
            containers.length ?
            containers.map(container => {
              return (<li key={container.id}>
                <span>{container.id}</span>
                <span>{container.name}</span>
                <span>{container.price}</span>
                <span className={styles.remove} onClick={e => removeClient(container.id)}>&times;</span>
              </li>)
            })
              : (<h1>Поки що немає тари</h1>)
          }
        </ul>
      </div>
    )
    :
    (
      <h1 className={styles.error}>{error}</h1>
    );
}

export default AllContainer;