(function suiteStringFormat () {
  'use strict';

  var suiteId = 'parse-string-format';
  var suite = new Benchmark.Suite();

  /**
   * ------------------------------------------------------------------------------------------------
   * Suites
   * ------------------------------------------------------------------------------------------------
   */

  /**
   * DateTime suite
   */
  function DateTimeSuite () {
    return new DateTime('1996-10-05T14:00:34', 'YYYY-MM-DDTHH:mm:ss', 'Europe/Moscow');
  }

  /**
   * MomentJS suite
   */
  function MomentSuite () {
    return moment('1996-10-05T14:00:34', 'YYYY-MM-DDTHH:mm:ss');
  }

  /**
   * MomentJS Timezone suite
   */
  function MomentTimezoneSuite () {
    return moment.tz('1996-10-05T14:00:34', 'YYYY-MM-DDTHH:mm:ss', 'Europe/Moscow');
  }

  suite = suite
    .add('DateTime', DateTimeSuite)
    .add('MomentJS', MomentSuite)
    .add('MomentJS + Timezones', MomentTimezoneSuite);

  /**
   * ------------------------------------------------------------------------------------------------
   * Export
   * ------------------------------------------------------------------------------------------------
   */

  var suiteItem = {
    description: 'Create a new instance with a string and format',
    id: suiteId,
    suite: suite
  };

  // Browser
  if (typeof window === 'object') {
    window.suites = window.suites || {};
    window.suites[suiteId] = suiteItem;
  }

  // NodeJS
  if (typeof module === 'object') {
    module.exports = suiteItem;
  }
})();
