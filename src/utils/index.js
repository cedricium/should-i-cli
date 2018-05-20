const axios = require('axios');

exports.api = async (fullQuestion) => {
  if (this.absolutelyNo(fullQuestion)) {
    return 'no'
  }
  const requestConfig = {
    headers: {'Content-Type': 'application/json'},
    baseURL: 'https://yesno.wtf/api/',
    method: 'get',
  };

  const results = await axios(requestConfig);
  return results.data;
};

exports.yesno = (fullQuestion) => {
  if (this.absolutelyNo(fullQuestion)) {
    return 'no'
  }
  return Math.floor(Math.random() * 2) === 0 ? 'yes' : 'no';
};

exports.absolutelyNo = (text) => {
  for (let i=0; i<this.forbiddenWords.length; i++) {
    if ( text.includes(this.forbiddenWords[i])) {
      return true;
    }
  }
  return false;
}

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

exports.forbiddenWords = [
  'kill myself',
  'commit suicide',
  'take my own life',
  'rob a'
];