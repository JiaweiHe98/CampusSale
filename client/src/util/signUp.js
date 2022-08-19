import axios from 'axios';
import { url } from './url';

const existsUsername = async (username) => {
  try {
    const res = await axios.get(url + '/api/signup/username', {
      params: { username },
    });
    return res.data.exists;
  } catch (e) {
    console.log(e);
    return true;
  }
};

const existsEmail = async (email) => {
  try {
    const res = await axios.get(url + '/api/signup/email', {
      params: { email },
    });
    return res.data.exists;
  } catch (e) {
    console.log(e);
    return true;
  }
};

const signUp = async (appUser) => {
  try {
    console.log(appUser);
    return await axios.post(url + '/api/signup', appUser, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.log(e.data);
    return null;
  }
};

export { existsUsername, existsEmail, signUp };
