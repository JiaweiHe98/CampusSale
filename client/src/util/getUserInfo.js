import axios from "axios";
import {url} from "./url";

const getUserInfoByUsername = async (username) => {
  try {
    const res = await axios.get(url + '/api/user/user', {
      // headers: {
      //   'Authorization': 'Bearer ' + token
      // },
      params: {username},
    })
    return res.data
  } catch (e) {
    return null
  }
}

const getUserInfoById = async (userId) => {
  try {
    const res = await axios.get(url + '/api/user/userid', {
      params: {userId},
    })
    return res.data
  } catch (e) {
    return null;
  }
}

export {getUserInfoByUsername, getUserInfoById};
