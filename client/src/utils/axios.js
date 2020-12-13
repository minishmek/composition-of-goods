import axios from "axios";

export default axios.create({
  // on production without baseURL
  // baseURL: 'http://127.0.0.1:8889',
  responseType: "json"
});