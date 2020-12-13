import React from "react";
import {useHistory} from 'react-router-dom';
import {NavLink} from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {

    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('login');
        history.go('/')
    }

    return (
        <header>
            <nav className='container'>
                <ul className={styles.ul}>
                    <li><NavLink to="/">Домашня сторінка</NavLink></li>
                    <li><NavLink to="/client">Клієнти</NavLink></li>
                    <li><NavLink to="/contract">Контракти</NavLink></li>
                    <li><NavLink to="/ttn">Товарні накладні</NavLink></li>
                    <li><NavLink to="/product">Товари</NavLink></li>
                    <li><NavLink to="/container">Тара</NavLink></li>
                    <li><a onClick={logout}>Вийти</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;