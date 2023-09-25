
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://reqres.in/api',
    headers: {
      'Accept': '*',
      'Content-Type': 'application/json'
    },
    timeout: 30000,
  });

  export default instance;