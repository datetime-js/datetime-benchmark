(function suiteStartWeek () {
  'use strict';

  var suiteId = 'start-week';
  var suite = new Benchmark.Suite();

  /**
   * ------------------------------------------------------------------------------------------------
   * Prepare
   * ------------------------------------------------------------------------------------------------
   */

  var datetimeInstance = new DateTime([1996, 10, 5, 14, 0, 34, 543]);
  var momentInstance = moment([1996, 9, 5, 14, 0, 34, 543]);
  var momentTzInstance = moment.tz([1996, 9, 5, 14, 0, 34, 543], 'Europe/Moscow');

  /**
   * ------------------------------------------------------------------------------------------------
   * Suites
   * ------------------------------------------------------------------------------------------------
   */

  /**
   * DateTime suite
   */
  function DateTimeSuite () {
    datetimeInstance.setStartOfWeek();
  }

  /**
   * MomentJS suite
   */
  function MomentSuite () {
    momentInstance.startOf('week');
  }

  /**
   * MomentJS Timezone suite
   */
  function MomentTimezoneSuite () {
    momentTzInstance.startOf('week');
  }

  suite
    .add('DateTime v2', DateTimeSuite)
    .add('MomentJS', MomentSuite)
    .add('MomentJS + Timezones', MomentTimezoneSuite);

  /**
   * ------------------------------------------------------------------------------------------------
   * Export
   * ------------------------------------------------------------------------------------------------
   */

  var suiteItem = {
    description: 'Set start of a week',
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
