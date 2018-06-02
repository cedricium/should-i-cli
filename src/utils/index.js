// List of words / phrases that should be given "no" answers every time.
// Implemented by @alqahtani, pull request #2
const absolutelyNo = (text) => {
  for (let i = 0; i < forbiddenWords.length; i++) {
    if ( text.includes(forbiddenWords[i])) {
      return true;
    }
  }
  return false;
};

const forbiddenWords = [
  'kill myself',
  'commit suicide',
  'take my own life',
  'rob a',
];
// End of forbidden words feature

const generateYesOrNo = (fullQuestion) => {
  if (absolutelyNo(fullQuestion)) {
    return 'no';
  }
  return Math.floor(Math.random() * 2) === 0 ? 'yes' : 'no';
};

const noSayings = [
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

const yesSayings = [
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

// check if the input contain letters and ends with '?'
const isAQuestion = (input) => {
  return RegExp(/[A-z]/g).test(input) && input.endsWith('?');
};

const getRandomSaying = (answer) => {
  if (answer === 'yes') {
    return yesSayings[Math.floor(Math.random() * yesSayings.length)];
  } else {
    return noSayings[Math.floor(Math.random() * noSayings.length)];
  }
};

module.exports = {
  generateYesOrNo,
  getRandomSaying,
  isAQuestion,
  yesSayings,
  noSayings,
};
