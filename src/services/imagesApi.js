import axios from 'axios'
const BASE_URL = 'https://pixabay.com/api/'

const KEY = '23995871-fe98d17cce7b68bafdd00c7d5'

const fetchApi = (searchedText, page) => {
  return axios
    .get(
      `${BASE_URL}?q=${searchedText}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then((res) => res.data)
}

export default fetchApi
