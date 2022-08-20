import axios from "axios";
import {url} from "./url";

const getMarketPosts = async () => {
  try {
    const res = await axios.get(url + '/api/post/recent')
    return res.data;
  } catch (e) {
    return null;
  }
}


export default getMarketPosts;
