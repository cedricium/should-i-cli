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

exports.noSayings = [
  'go fish',
  'nah',
  'nay',
  'negative',
  'no',
  'no way, Jose',
  'nope',
  'not in a million years',
  'out of the question',
  'thumbs down 👎',
  'under no circumstances',
];

exports.yesSayings = [
  '10-4',
  'affirmative',
  'aye',
  'by all means',
  'fo’ shizzle',
  'go for it',
  'sure',
  'surely',
  'totally',
  'yeah',
  'yes',
];
