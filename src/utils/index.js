const axios = require('axios');

exports.api = async () => {
  const requestConfig = {
    headers: {'Content-Type': 'application/json'},
    baseURL: 'https://yesno.wtf/api/',
    method: 'get',
  };

  const results = await axios(requestConfig);
  return results.data;
};

exports.yesno = () => {
  return Math.floor(Math.random() * 2) === 0 ? 'yes' : 'no';
};
