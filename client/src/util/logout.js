import axios from "axios";
import {url} from "./url";

const logout = async () => {

  let token;

  try {
    token = localStorage.getItem('token');
    localStorage.setItem('token', null);

  } catch (e) {
    console.log("no token found")
  }

  try {
    token = localStorage.getItem('user').token;
    localStorage.setItem('user', null);
  } catch (e) {
    console.log("no token found in user")
  }

  try {
    await axios.get(url + '/api/user/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (e) {
    console.log("Logout request error")
  }
}

export default logout
