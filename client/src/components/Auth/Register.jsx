import React, {useState} from 'react';
import styles from './Index.module.scss';
import {NavLink, useHistory} from "react-router-dom";
import axios from "../../utils/axios";

const Register = () => {

    const [form, setForm] = useState({});

    const history = useHistory();

    const setFormField = e => {
        const target = e.target,
          key = target.id,
          value = target.value;
        setForm({
            ...form,
            [key]: value
        })
    }

    const Register = e => {
        e.preventDefault();
        axios.post('auth/signup', form).then(res => {
            history.go('/login')
        }).catch(e => {
            console.log(e)
        });
    }

    return (
        <div className={styles.displayCenter}>
            <div className={styles.reg}>
                <h1>Реєстрація</h1>
                <form className={styles.form} onSubmit={Register}>
                    <label>Введіть Ім'я</label>
                    <input type="text" id="name" value={form.name || ''} required onChange={setFormField}/>
                    <label>Введіть Прізвище</label>
                    <input type="text" id="lastName" value={form.lastName || ''} required onChange={setFormField}/>
                    <label>Введіть email</label>
                    <input type="email" id="email" value={form.email || ''} required onChange={setFormField}/>
                    <label>Введіть пароль</label>
                    <input type="password" id="password" value={form.password || ''} required onChange={setFormField}/>
                    <button type="submit">Зареєструватися</button>
                </form>
                <NavLink to="/login">Вхід</NavLink>
            </div>
        </div>
    );
};

export default Register;