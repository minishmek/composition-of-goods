const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const {mysqlConfig, secretKey} = require('./config');
const jwt = require('jsonwebtoken');
const path = require('path');


const app = express();
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

const PORT = process.env.PORT || 8889;

function start() {
    const conn = mysql.createConnection(mysqlConfig)

    conn.connect(err => {
        if (err) {
            console.log(err.code)
        } else {
            console.log('DataBase OK!')
            app.listen(PORT, () => {
                console.log('connect')
            });
        }

    });

    const addPost = (req, res) => {
        const params = req.body
        const {nameTable} = req.params
        conn.query(`INSERT INTO ${nameTable} SET ?`, params, (err, rows) => {
            if (err) {
                res.send(err.message);
            } else {
                res.send(rows);
            }
        })
    }

    app.post('/add/:nameTable', addPost);

    const remove = (req, res) => {
        const {nameTable, id} = req.params
        conn.query(`DELETE FROM ${nameTable} WHERE id = ${id}`, (err, rows) => {
            if (err) {
                res.send(err.message);
            } else {
                res.send(rows);
            }
        })
    }

    app.delete('/remove/:nameTable/:id', remove);

    const getAll = (req, res) => {
        const {nameTable} = req.params;

        let query = `SELECT * FROM ${nameTable}`;

        if (nameTable === 'contract') {
            query = 'select contract.id as id, buyer.name as buyer, buyer.lastName as buyerLastName, cont_date, product.name as product, count from contract inner join buyer inner join product on contract.id_buyer = buyer.id and product.id = contract.product;'
        }

        conn.query(query, (err, rows) => {
            if (err) {

                res.send(err);
            } else {
                res.send(rows);
            }
        });
    }

    app.get('/get-all/:nameTable', getAll);

    const getId = (req, res) => {
        const {nameTable, id} = req.params;

        let query = `SELECT * FROM ${nameTable} WHERE id = ${id}`;

        if (nameTable === 'contract') {
            query = `select contract.id as id, buyer.name as buyer, buyer.lastName as buyerLastName, cont_date, product.name as product, count from contract inner join buyer inner join product on contract.id_buyer = buyer.id and product.id = contract.product where contract.id = ${id};`
        }
        else if (nameTable === 'ttn') {
            query = `SELECT * FROM ${nameTable} WHERE contract = ${id}`;
        }
        conn.query(query, (err, rows) => {
            if (err) {
                res.send(err);
            } else {
                res.send(rows);
            }
        });
    }

    app.get('/get/:nameTable/:id', getId);

    const getAllUsers = (req, res) => {
        conn.query('select id, name, lastName, email from users;', (err, rows) => {
            if (err) {
                res.status(400).json(err.message);
            } else {
                res.status(200).json(rows);
            }
        })
    }

    app.get('/getAllUsers', getAllUsers);

    const signup = (req, res) => {
        conn.query(`select id, name, lastName, email from users where email = '${req.body.email}';`, (err, rows) => {
            if (err) {
                res.status(400).json({message: err.message});
            } else if (typeof rows !== 'undefined' && rows.length > 0) {
                res.status(400).json({message: `Користувач з таким емейлом вже існує`});
            } else {
                const {email, password, lastName, name} = req.body;
                conn.query(`insert into users(name, lastName, email, password) values('${name}', '${lastName}', '${email}', '${password}');`, (err, rows) => {
                    if (err) {
                        res.status(400).json({message: err.message});
                    } else {
                        const token = jwt.sign({
                            email: req.body.email
                        }, secretKey, {expiresIn: 3600});

                        return res.status(200).json({message: 'Ok', token: `Bearer ${token}`});
                    }
                });
            }
        });
    }

    app.post('/auth/signup', signup);

    const signin = (req, res) => {
        conn.query(`select id, email, password, isChief from users where email = '${req.body.email}';`, (err, rows) => {
            if (err) {
                res.status(400).json({message: err.message});
            } else if (rows.length <= 0) {
                res.status(400).json({message: `Користувач з таким емейлом не існує`});
            } else {
                const {password} = req.body;
                rows.map(row => {
                    if (password === row.password) {
                        const token = jwt.sign({
                            id: row.id,
                            email: row.email,
                            isChief: row.isChief
                        }, secretKey, {expiresIn: 3600});

                        return res.status(200).json({message: 'Ok', token: `Bearer ${token}`});
                    }

                    return res.status(400).json({message: 'Невірний пароль'});
                })
            }
        });
    }

    app.post('/auth/signin', signin);
}

start();

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"))
    })
}
