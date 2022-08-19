import axios from "axios";
import {url} from './url'

const login = async (username, password) => {
  try {
    console.log(username, password)
    const res = await axios.post(url + '/api/login', {
      params: {username: username, password: password},
    })

    const token = res;
    // localStorage.setItem('token', token);
    console.log(res)
  } catch (e) {
    console.log('login fail', e)
    return e;
  }
}

export default login
