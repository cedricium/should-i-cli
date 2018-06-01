
const expect = require('chai').expect;

// testing utils
const {generateYesOrNo} = require('../src/utils/index.js');
describe('Testing answers', () => {
  it('should return yes or no', () => {
    expect(generateYesOrNo('Should I study now?')).to.match(/(yes|no)/);
    expect(generateYesOrNo('Should I sleep early?')).to.match(/(yes|no)/);
    expect(generateYesOrNo('Should I test my code before production?'))
          .to.match(/(yes|no)/);
  });
});

describe('Testing forbidden questions', () => {
  it('should return no', () => {
    expect(generateYesOrNo('Should I kill myself?')).to.equal('no');
    expect(generateYesOrNo('Should I rob a car?')).to.equal('no');
    expect(generateYesOrNo('Should I take my own life?')).to.equal('no');
  });
});

const {isAQuestion} = require('../src/utils/index.js');
describe('Testing if arg is a question', () => {
  it('should return true for questions', () => {
    expect(isAQuestion('Should I study now?')).to.be.true;
    expect(isAQuestion('Should I sleep early?')).to.be.true;
    expect(isAQuestion('Should I test my code before production?')).to.be.true;
  });

  it('should return false for no-questions', () => {
    expect(isAQuestion('Should I study now')).to.be.false;
    expect(isAQuestion('hello boys')).to.be.false;
    expect(isAQuestion('32254-0\';./.;')).to.be.false;
  //                  ^^^^^^^^^^^^ number and symbols should also be classified
  //                               as not a question
  });
});
