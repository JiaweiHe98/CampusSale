import axios from "axios";
import {url} from "./url";

const getPostById = async (postId) => {
  try {
    const res = await axios.get(url + '/api/post/post', {
      params: { postId },
    });
    return res.data
  } catch (e) {
    console.log("Cannot get post");
    return null;
  }
}

export default getPostById;
