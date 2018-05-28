/* eslint-disable require-jsdoc */

const ora = require('ora');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

const {Command, flags} = require('@oclif/command');
const {generateYesOrNo, noSayings, yesSayings,
      isAQuestion} = require('../src/utils');

class ShouldICliCommand extends Command {
  async run() {
    const {args} = this.parse(ShouldICliCommand);
    const ANSWER_DELAY = 1000;
    // QUESTION positional argument
    let question = args.question;
    let answer;

    if (!isAQuestion(question)) {
        return ora().warn('Well, that is not a question.');
    }

    const fullQuestion = `should you ${question} 🤔`;

    const spinner = ora(fullQuestion).start();

    answer = generateYesOrNo(fullQuestion);
    setTimeout(() => {
      if (answer === 'yes') {
        spinner.succeed(this.getRandomSaying(answer));
      } else {
        spinner.fail(this.getRandomSaying(answer));
      }
    }, ANSWER_DELAY);

    // Check for `should-i-cli` update every 3 days
    updateNotifier({
      pkg: pkg,
      updateCheckInterval: 1000 * 60 * 60 * 24 * 3,
    }).notify();
  };

  getRandomSaying(answer) {
    if (answer === 'yes') {
      return yesSayings[Math.floor(Math.random() * yesSayings.length)];
    } else {
      return noSayings[Math.floor(Math.random() * noSayings.length)];
    }
  };
};

ShouldICliCommand.description = `
Decision-making made easy. Ask a question to get back a yes or no answer.
`;

ShouldICliCommand.args = [
  {
    name: 'question',
    required: true,
    description: 'the question you want answered',
  },
];

ShouldICliCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
};

module.exports = ShouldICliCommand;
