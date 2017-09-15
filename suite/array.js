(function suiteArray () {
  'use strict';

  var suiteId = 'array';
  var suite = new Benchmark.Suite();

  /**
   * ------------------------------------------------------------------------------------------------
   * Suites
   * ------------------------------------------------------------------------------------------------
   */

  /**
   * MomentJS suite
   */
  function MomentSuite () {
    return moment([1996, 9, 5, 14, 0, 34, 543]);
  }

  /**
   * MomentJS Timezone suite
   */
  function MomentTimezoneSuite () {
    return moment.tz([1996, 9, 5, 14, 0, 34, 543], 'Europe/Moscow');
  }

  /**
   * DateTime2 suite
   */
  function DateTime2Suite () {
    return new DateTime([1996, 10, 5, 14, 0, 34, 543]);
  }

  suite
    .add('DateTime v2', DateTime2Suite)
    .add('MomentJS', MomentSuite)
    .add('MomentJS + Timezones', MomentTimezoneSuite);

  /**
   * ------------------------------------------------------------------------------------------------
   * Export
   * ------------------------------------------------------------------------------------------------
   */

  var suiteItem = {
    description: 'Create a new instance with an array',
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
