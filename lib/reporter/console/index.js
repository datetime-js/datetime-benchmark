'use strict';

function Reporter () {}

/**
 * @private
 */
function formatValue (val) {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * @public
 */
function printCycle (event) {
  var suite = event.target;
  console.log(suite.name + ' × ' + formatValue(suite.hz.toFixed(0)) + ' ops/sec');
}

/**
 * @public
 */
function printResults (suite) {
  console.log('Fastest is ' + suite.filter('fastest').map('name'));
}

Reporter.prototype.printCycle = printCycle;
Reporter.prototype.printResults = printResults;

module.exports = Reporter;
