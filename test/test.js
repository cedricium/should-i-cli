const expect = require('chai').expect;

const {generateYesOrNo, getRandomSaying, yesSayings,
  noSayings} = require('../src/utils/index.js');
describe('Testing answers', () => {
  it('should return yes or no', () => {
    expect(generateYesOrNo('Should I study now?')).to.match(/(yes|no)/);
    expect(generateYesOrNo('Should I sleep early?')).to.match(/(yes|no)/);
    expect(generateYesOrNo('Should I test my code before production?'))
      .to.match(/(yes|no)/);
  });

  it('should derive answer from `yesSayings` list', () => {
    expect(yesSayings).to.include(getRandomSaying('yes'));
    expect(yesSayings).to.include(getRandomSaying('yes'));
    expect(yesSayings).to.include(getRandomSaying('yes'));
  });

  it('should derive answer from `noSayings` list', () => {
    expect(noSayings).to.include(getRandomSaying('no'));
    expect(noSayings).to.include(getRandomSaying('no'));
    expect(noSayings).to.include(getRandomSaying('no'));
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

  it('should return false for non-questions', () => {
    expect(isAQuestion('Should I study now')).to.be.false; // test missing ?
    expect(isAQuestion('423546423')).to.be.false; // test numbers
    expect(isAQuestion(';[]./<.;;#%#@$')).to.be.false; // testing symbols
  });
});
