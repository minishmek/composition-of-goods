import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import styles from './Product.module.scss'
import axios from "../../utils/axios";

function AddNewProduct() {

  const [form, setForm] = useState({})
  const [showAddNewProduct, setShowAddNewProduct] = useState(false);

  const history = useHistory()

  const AddNewProduct = e => {
    e.preventDefault();
    axios.post('add/product', form).then(res => {
      history.go(0)
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
    setShowAddNewProduct(!showAddNewProduct)
  }

  return (
    !showAddNewProduct ?
      (
        <button className={styles.newProduct} onClick={handlerSetShowAddNewProduct}>Додати новий
          продукт</button>
      ) :
      (
        <form className={styles.form} onSubmit={AddNewProduct}>
          <button type="reset" onClick={handlerSetShowAddNewProduct}>Сховати</button>
          <label htmlFor="name">Назва</label>
          <input type="text" placeholder="Назва" id="name" value={form.name || ''}
                 onChange={setFormField} required/>
          <label htmlFor="price">Ціна</label>
          <input type="number" id="price" placeholder="Ціна" min="0" value={form.price || ''}
                 onChange={setFormField} required/>
          <button type="submit">Додати</button>
        </form>
      )
  );
}

export default AddNewProduct;