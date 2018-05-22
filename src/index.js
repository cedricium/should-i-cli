/* eslint-disable require-jsdoc */

const ora = require('ora');
const internetAvailable = require('internet-available');

const {Command, flags} = require('@oclif/command');
const {api, yesno, noSayings, yesSayings} = require('../src/utils');

class ShouldICliCommand extends Command {
  async run() {
    const {flags} = this.parse(ShouldICliCommand);
    const {args} = this.parse(ShouldICliCommand);

    // QUESTION positional argument
    //  - if connected to internet, make a request against https://yesno.wtf/api
    //  - if no connection, make a request against local yes/no generator
    let question = args.question;
    let answer;

    question = (question.endsWith('?')) ? question : question.concat('?');
    const fullQuestion = `should you ${question} 🤔`;

    const spinner = ora(fullQuestion).start();

    try { // user is online, has internet connection
      await internetAvailable({
        timeout: 2000,
        retries: 3,
      });
      answer = (await api(fullQuestion)).answer;
    } catch (err) { // user is offline, does not have internet connection
      answer = (await yesno(fullQuestion));
    }

    if (answer === 'yes') {
      spinner.succeed(this.getRandomSaying(answer));
    } else {
      spinner.fail(this.getRandomSaying(answer));
    }
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
    name: 'question',                               // name of arg to show in help and reference with args[name]
    required: true,                                 // make the arg required with `required: true`
    description: 'the question you want answered',  // help description
  },
];

ShouldICliCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
};

module.exports = ShouldICliCommand;
