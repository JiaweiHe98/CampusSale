import axios from "axios";
import {url} from './url'

const addAPost = async (userId, category, title, description, price, images, token) => {

  try {
    // console.log(token)
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append('files', images[i])
    }

    const fetchUrl = url + '/api/user/post?' + new URLSearchParams({
      userId,
      category,
      title,
      description,
      price,
    });

    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + token,
        // 'Content-Type': 'multipart/form-data'
      },
      body: formData,
    }

    const res = await fetch(fetchUrl, request)

    // console.log(res)

    // console.log(json)
    // const res = await axios.post(url + '/api/user/post', formData, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   params: {userId, category, title, description, price, images: null},
    // })
    res.messge = 'ok';
    return res;
  } catch (e) {
    // console.log(e)
    const res = {}
    res.message = e.response.status
    return res
  }
}

export default addAPost;
