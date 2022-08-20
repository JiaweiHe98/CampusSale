import axios from "axios";
import {url} from "./url";

const getUserSavedPost = async (user) => {
  try {
    const res = await axios.get(url + '/api/user/saved', {
      params: {userId: user.id},
    })

    return res.data;
  } catch (e) {
    console.log('load saved fail', e)
    return null;
  }
}

export default getUserSavedPost;
