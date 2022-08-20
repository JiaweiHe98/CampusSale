import axios from 'axios';
import {url} from './url';

const getPosts = async (userId) => {
  try {
    const res = await axios.get(url + '/api/user/posts', {
      params: {userId},
    });

    return res.data
  } catch (e) {
    return []
  }
}

export default getPosts
