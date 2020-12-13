import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import axios from "../../utils/axios";
import styles from "./Client.module.scss";

function AddNewClient() {

  const [form, setForm] = useState({})
  const [showAddNewClient, setShowAddNewClient] = useState(false);

  const history = useHistory()

  const AddNewClient = e => {
    e.preventDefault();
    axios.post('add/clients', form).then(res => {
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

  const handlerSetShowAddNewProduct = () => {
    setShowAddNewClient(!showAddNewClient)
  }

  return (
    !showAddNewClient ?
      (
        <button className={styles.newClient} onClick={handlerSetShowAddNewProduct}>Додати нового клієнта</button>
      ) :
      (
        <form className={styles.form} onSubmit={AddNewClient}>
          <button type="reset" onClick={handlerSetShowAddNewProduct}>Сховати</button>
          <label htmlFor="name">Назва</label>
          <input type="text" placeholder="Ім'я" id="name" value={form.name || ''}
                 onChange={setFormField} required/>
          <label htmlFor="lastName">Прізвище</label>
          <input type="text" id="lastName" placeholder="Прізвище" min="0" value={form.lastName || ''}
                 onChange={setFormField} required/>
          <button type="submit">Додати</button>
        </form>
      )
  );
}

export default AddNewClient;