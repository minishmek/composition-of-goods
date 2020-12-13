import axios from "../utils/axios";

const getAll = (table, setData, setError) => {
  axios.get(`get-all/${table}`).then(res => {
    setData(res.data || []);
  }).catch(e => {
    setError(e.message || 'Сталася помилка спробуйте пізніше');
  });
}

export default getAll;