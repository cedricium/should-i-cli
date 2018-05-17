/* eslint-disable require-jsdoc */

const ora = require('ora');
const internetAvailable = require('internet-available');

const {Command, flags} = require('@oclif/command');
const {api, yesno} = require('../src/utils');

class ShouldICliCommand extends Command {
  async run() {
    const {flags} = this.parse(ShouldICliCommand);

    // if no flags, display should-i usage message
    if (Object.keys(flags).length === 0) {
      await ShouldICliCommand.run(['--help'], flags.help);
    }

    // -q | --question - return yes or no phrase
    //  - if connected to internet, make a request against https://yesno.wtf/api
    //  - if no connection, make a request against local yes/no generator
    let question = flags.question;
    let answer;

    question = (question.endsWith('?')) ? question : question.concat('?');
    const fullQuestion = `should you ${question} 🤔`;

    const spinner = ora(fullQuestion).start();

    try { // user is online, has internet connection
      await internetAvailable({
        timeout: 2000,
        retries: 3,
      });
      answer = (await api()).answer;
    } catch (err) { // user is offline, does not have internet connection
      answer = (await yesno());
    }

    if (answer === 'yes') {
      spinner.succeed(answer);
    } else {
      spinner.fail(answer);
    }
  };
};

ShouldICliCommand.description = `
Decision-making made easy. Ask a question to get back a yes or no answer.
`;

ShouldICliCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  question: flags.string({char: 'q', description: 'question to ask'}),
};

module.exports = ShouldICliCommand;
