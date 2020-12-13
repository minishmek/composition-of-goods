import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import axios from "../../utils/axios";
import styles from "./Container.module.scss";

function AddNewContainer() {

  const [form, setForm] = useState({})
  const [showAddNewContainer, setShowAddNewContainer] = useState(false);

  const history = useHistory()

  const AddNewContainer = e => {
    e.preventDefault();
    axios.post('add/containers', form).then(res => {
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
    setShowAddNewContainer(!showAddNewContainer)
  }

  return (
    !showAddNewContainer ?
      (
        <button className={styles.newContainer} onClick={handlerSetShowAddNewProduct}>Додати нову тару</button>
      ) :
      (
        <form className={styles.form} onSubmit={AddNewContainer}>
          <button type="reset" onClick={handlerSetShowAddNewProduct}>Сховати</button>
          <label htmlFor="name">Назва</label>
          <input type="text" placeholder="Назва" id="name" value={form.name || ''}
                 onChange={setFormField} required/>
          <label htmlFor="lastName">Ціна</label>
          <input type="number" id="price" placeholder="Ціна" min="0" value={form.price || ''}
                 onChange={setFormField} required/>
          <button type="submit">Додати</button>
        </form>
      )
  );
}

export default AddNewContainer;