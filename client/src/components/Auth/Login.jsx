import React, {useState} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import styles from './Index.module.scss';
import axios from "../../utils/axios";

const Login = () => {

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

    const Login = e => {
        e.preventDefault();
        axios.post('auth/signin', form).then(res => {
            localStorage.setItem('login', JSON.stringify(res.data));
            history.go('/')
        }).catch(e => {
            console.log(e)
        });
    }
    return (
        <div className={styles.displayCenter}>
            <div className={styles.reg}>
                <h1>Вхід</h1>
                <form className={styles.form} onSubmit={Login}>
                    <label>Введіть email</label>
                    <input type="email" id="email" value={form.email || ''} required onChange={setFormField}/>
                    <label>Введіть пароль</label>
                    <input type="password" id="password" value={form.password || ''} required onChange={setFormField}/>
                    <button>Вхід</button>
                </form>
                <NavLink to="/register">Зареєструватися</NavLink>
            </div>
        </div>
    );
};

export default Login