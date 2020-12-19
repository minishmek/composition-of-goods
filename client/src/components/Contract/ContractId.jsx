import React, {useEffect, useState, createRef} from "react";
import Moment from "moment";
import ReactToPdf from "react-to-pdf";
import {useHistory} from "react-router-dom"
import axios from "../../utils/axios";

const ref = createRef()

const Contract = ({match}) => {
    const [contract, setContract] = useState([]);
    const [ttn, setTtn] = useState([]);

    const history = useHistory();
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`get/contract/${match.params.id}`).then(res => {
            setContract(res.data[0] || []);
            if (!res.data) {
                history.push('/')
            }
        }).catch(e => {
            setError(e.message || 'Сталася помилка спробуйте пізніше');
        });
        axios.get(`get/ttn/${match.params.id}`).then(res => {
            console.log(res)
            setTtn(res.data || []);
        }).catch(e => {
            setError(e.message || 'Сталася помилка спробуйте пізніше');
        });
        console.log(ttn)
    }, [match.params.id])

    return (
        <React.Fragment>
            <div ref={ref} style={{maxWidth: 800, margin: "auto"}}>
                <h1>
                    Номер контракту: {contract.id}
                </h1>
                <div>
                    <p><span>Клієнт: </span>{contract.buyer} {contract.buyerLastName}</p>
                    <p><span>Дата заключення контракту: </span>{Moment(contract.cont_date).format('DD-MM-YYYY')}</p>
                    <p><span>Продукт: </span>{contract.product}</p>
                    <p><span>Кількість: </span>{contract.count}</p>
                </div>

                <h3>Товарні накладні</h3>

                <table style={{margin: '0 auto'}}>
                    <thead>
                    <tr>
                        <th style={{paddingBottom: 10}}>Кількість на відправлення</th>
                        <th>Дата відправлення</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        ttn.length && ttn.map(t => (
                            <tr key={t.id}>
                                <td style={{paddingBottom: 10}}>{t.count}</td>
                                <td style={{paddingBottom: 10}}>{Moment(t.date).format('DD-MM-YYYY')}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <ReactToPdf targetRef={ref} filename="contract.pdf">
                {({toPdf}) => (
                    <button
                        style={{margin: "auto", display: "block"}}
                        type={"link"}
                        onClick={toPdf}
                    >
                        Завантажити в pdf
                    </button>
                )}
            </ReactToPdf>
        </React.Fragment>
    )
}

export default Contract