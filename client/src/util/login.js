import axios from "axios";
import {url} from './url'
import {getUserInfoByUsername} from "./getUserInfo";

const login = async (username, password, setUser, setSeeingUserId) => {
  try {
    const res = await axios.post(url + '/api/login', null, {
      params: {username: username, password: password},
    })

    const token = res.data.access_token;
    localStorage.setItem('token', token);
    // console.log(res.data.access_token)

    // const resUser = await axios.get(url + '/api/user/user', {
    //   headers: {
    //     'Authorization': 'Bearer ' + token
    //   },
    //   params: {username: username },
    // })
    //
    // const appUser = resUser.data

    // console.log(res2.data)
    const user = await getUserInfoByUsername(username);
    localStorage.setItem('user', JSON.stringify(user));
    user.token = token
    setUser(user);
    setSeeingUserId(user.id)
    return user
  } catch (e) {
    console.log('login fail', e)
    return null;
  }
}

export default login
