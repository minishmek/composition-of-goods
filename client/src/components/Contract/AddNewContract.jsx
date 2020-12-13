import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import services from '../../services'
import axios from "../../utils/axios";
import styles from "./Contract.module.scss";

function AddNewContract() {

  const [form, setForm] = useState({})
  const [error, setError] = useState(null);
  const [showAddNewContract, setShowAddNewContract] = useState(false)
  const [clients, setClients] = useState([])
  const [products, setProducts] = useState([])
  const [containers, setContainers] = useState([])


  useEffect(() => {
    services.getAll('clients', setClients, setError)
    services.getAll('product', setProducts, setError)
    services.getAll('containers', setContainers, setError)
  }, [showAddNewContract])

  const history = useHistory()

  const AddNewContract = e => {
    e.preventDefault();

    console.log(form)
    axios.post('add/contract', form).then(res => {
      console.log(res);
      history.go(0);
    }).catch(e => {
      console.log(e.request)
    })
  }

  const setFormField = e => {
    const target = e.target,
      key = target.id,
      value = target.value;
    setForm({
      ...form,
      [key]: value
    })
  }

  const handlerSetShowAddNewContract = () => {
    setShowAddNewContract(!showAddNewContract)
  }

  return (
    !showAddNewContract ?
      (
        <button className={styles.newContract} onClick={handlerSetShowAddNewContract}>Додати новий контракт</button>
      ) :
      (
        <form className={styles.form} onSubmit={AddNewContract}>
          <button type="reset" onClick={handlerSetShowAddNewContract}>Сховати</button>
          <label htmlFor="user">Клієнт</label>
          <select name="user" id="user" value={form.user || ''} onChange={setFormField} required>
            <option value="">Виберіть клієнта</option>
            {
              clients.map(client => {
                return (
                  <option key={client.id} value={client.id}>{client.name} {client.lastName}</option>
                )
              })
            }
          </select>
          <label htmlFor="dataOfAssebly">Дата складання договору</label>
          <input type="date" placeholder="Дата складання договору" id="dataOfAssebly" value={form.dataOfAssebly || ''}
                 onChange={setFormField} required/>
          <label htmlFor="user">Тип продукту</label>
          <select name="typeOfProduct" id="typeOfProduct" value={form.typeOfProduct || ''} onChange={setFormField} required>
            <option value="">Виберіть продукт</option>
            {
              products.map(product => {
                return (
                  <option key={product.id} value={product.id}>{product.name}</option>
                )
              })
            }
          </select>
          <label htmlFor="countOfProduct">Кількість продуктів</label>
          <input type="number" placeholder="Кількість продуктів" id="countOfProduct" value={form.countOfProduct || ''}
                 onChange={setFormField} required/>
          <label htmlFor="container">Тара</label>
          <select name="container" id="container" value={form.container || ''} onChange={setFormField} required>
            <option value="">Виберіть тару</option>
            {
              containers.map(container => {
                return (
                  <option key={container.id} value={container.id}>{container.name}</option>
                )
              })
            }
          </select>
          <button type="submit">Додати</button>
        </form>
      )
  );
}

export default AddNewContract;