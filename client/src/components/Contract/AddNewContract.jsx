import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import services from '../../services'
import axios from "../../utils/axios";
import styles from "./Contract.module.scss";

function AddNewContract() {

  const [form, setForm] = useState({})
  const [error, setError] = useState(null);
  const [showAddNewContract, setShowAddNewContract] = useState(false)
  const [buyer, setBuyer] = useState([])
  const [product, setProduct] = useState([])


  useEffect(() => {
    services.getAll('buyer', setBuyer, setError)
    services.getAll('product', setProduct, setError)
  }, [showAddNewContract])

  const history = useHistory()

  const AddNewContract = e => {
    e.preventDefault();

    axios.post('add/contract', form).then(res => {
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
          <label htmlFor="id_buyer">Клієнт</label>
          <select name="id_buyer" id="id_buyer" value={form.id_buyer || ''} onChange={setFormField} required>
            <option value="">Виберіть клієнта</option>
            {
              buyer.length ?
              buyer.map(b => {
                return (
                  <option key={b.id} value={b.id}>{b.name} {b.lastName}</option>
                )
              }) : ''
            }
          </select>
          <label htmlFor="cont_date">Дата складання договору</label>
          <input type="date" placeholder="Дата складання договору" id="cont_date" value={form.cont_date || ''}
                 onChange={setFormField} required/>
          <label htmlFor="product">Товар</label>
          <select name="product" id="product" value={form.product || ''} onChange={setFormField} required>
            <option value="">Виберіть продукт</option>
            {
              product.length ?
                product.map(p => {
                  return (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  )
                }) : ''
            }
          </select>
          <label htmlFor="count">Кількість</label>
          <input type="number" placeholder="Кількість" id="count" value={form.count || ''}
                 onChange={setFormField} required min='0'/>
          <button type="submit">Додати</button>
        </form>
      )
  );
}

export default AddNewContract;