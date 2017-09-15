'use strict';

var chalk = require('chalk');
var shell = require('shelljs');

var args = Array.prototype.slice.call(process.argv, 2);
var suiteId = args[0];

function runSuites (suitesToRun) {
  console.log('Run all suites');

  function runNextSuite () {
    var nextSuite = suitesToRun.shift();
    if (nextSuite) {
      var cmd = 'node ./index.js ' + nextSuite;

      shell.exec(cmd, {}, function execCallback (code, output) {
        if (code !== 0) {
          process.stdout.write(chalk.red(output));
          process.exit(2);
        }
        runNextSuite();
      });
    }
  }

  runNextSuite();
}

// No suite specified, run all
if (!suiteId) {
  runSuites([
    'array',
    'string',
    'string-format',
    'start-day',
    'start-week',
    'display'
  ]);
} else {
  require('./boot');

  var Reporter = require('./lib/reporter/console');

  var reporter = new Reporter();
  var suitePath = './suite/' + suiteId;
  var suite = require(suitePath);

  if (!suite) {
    console.log('ERROR: Suite "' + suitePath + '" not found');
    process.exit(1);
  }

  console.log('\n' + suite.description);
  console.log('==================================================================');

  suite.suite
    .on('cycle', function onCycle (event) {
      reporter.printCycle(event);
    })
    .on('complete', function onComplete () {
      reporter.printResults(this);
    })
    .run({ async: false });
}
