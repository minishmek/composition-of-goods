import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import services from '../../services'
import axios from "../../utils/axios";
import styles from "./TTN.module.scss";

function AddNewTTN() {

  const [form, setForm] = useState({})
  const [error, setError] = useState(null);
  const [showAddNewTTN, setShowAddNewTTN] = useState(false)
  const [contract, setContract] = useState([])


  useEffect(() => {
    services.getAll('contract', setContract, setError)
  }, [showAddNewTTN])

  const history = useHistory()

  const AddNewTTN = e => {
    e.preventDefault();

    axios.post('add/ttn', form).then(res => {
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

  const handlerSetShowAddNewTTN = () => {
    setShowAddNewTTN(!showAddNewTTN)
  }

  return (
    !showAddNewTTN ?
      (
        <button className={styles.newTTN} onClick={handlerSetShowAddNewTTN}>Створити накладну</button>
      ) :
      (
        <form className={styles.form} onSubmit={AddNewTTN}>
          <button type="reset" onClick={handlerSetShowAddNewTTN}>Сховати</button>
          <label htmlFor="contract">Контраст</label>
          <select name="contract" id="contract" value={form.contract || ''} onChange={setFormField} required>
            <option value="">Виберіть контракт</option>
            {
              contract.length ?
                contract.map(c => {
                return (
                  <option key={c.id} value={c.id}>{c.id}</option>
                )
              }) : ''
            }
          </select>
          <label htmlFor="count">Кількість</label>
          <input type="number" placeholder="Кількість" id="count" value={form.count || ''}
                 onChange={setFormField} required/>
          <label htmlFor="date">Дата складання договору</label>
          <input type="date" placeholder="Дата складання договору" id="date" value={form.date || ''}
                 onChange={setFormField} required/>
          <button type="submit">Додати</button>
        </form>
      )
  );
}

export default AddNewTTN;