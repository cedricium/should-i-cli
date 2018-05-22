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

exports.generateYesOrNo = (fullQuestion) => {
  if (absolutelyNo(fullQuestion)) {
    return 'no';
  }
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
