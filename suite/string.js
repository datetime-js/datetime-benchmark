(function suiteString () {
  'use strict';

  var suiteId = 'string';
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
    return new DateTime('1996-10-05T14:00:34');
  }

  /**
   * MomentJS suite
   */
  function MomentSuite () {
    return moment('1996-10-05T14:00:34');
  }

  /**
   * MomentJS Timezone suite
   */
  function MomentTimezoneSuite () {
    return moment.tz('1996-10-05T14:00:34', 'Europe/Moscow');
  }

  suite = suite
    .add('DateTime v2', DateTimeSuite)
    .add('MomentJS', MomentSuite)
    .add('MomentJS + Timezones', MomentTimezoneSuite);

  /**
   * ------------------------------------------------------------------------------------------------
   * Export
   * ------------------------------------------------------------------------------------------------
   */

  var suiteItem = {
    description: 'Create an instance with a string',
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
