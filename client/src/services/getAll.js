import axios from "../utils/axios";

const getAll = (table, setData, setError) => {
  console.log(table)
  axios.get(`get-all/${table}`).then(res => {
    console.log(res)
    setData(res.data.reverse());
  }).catch(e => {
    setError(e.message || 'Сталася помилка спробуйте пізніше');
  });
}

export default getAll;