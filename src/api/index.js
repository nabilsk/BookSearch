import api from './config';

export const bookList = async () => {
  let response = await api.get('/search.json?author=tolkien');
  return response;
};
