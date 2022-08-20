import axios from "axios";
import {url} from "./url";

const addACommentSection = async (userId, postId, comment, token) => {
  try {
    console.log(userId, postId, comment, token)
    const res = await axios.get(url + '/api/user/comment', {
      params: {userId, postId, comment},
      headers: {'Authorization': 'Bearer ' + token}
    });
    res.message = 'ok'
    return res
  } catch (e) {
    console.log("Cannot get post");
    console.log(e.message)
    return {message: e.response.status};
  }

}

export default addACommentSection;
