(function suiteStartDay () {
  'use strict';

  var suiteId = 'start-day';
  var suite = new Benchmark.Suite();

  /**
   * ------------------------------------------------------------------------------------------------
   * Prepare
   * ------------------------------------------------------------------------------------------------
   */

  var datetimeInstance = new DateTime([1996, 10, 5, 14, 0, 34, 543]);
  var momentInstance = moment([1996, 9, 5, 14, 0, 34, 543]);
  var momentTimezoneInstance = moment.tz([1996, 9, 5, 14, 0, 34, 543], 'Europe/Moscow');

  /**
   * ------------------------------------------------------------------------------------------------
   * Suites
   * ------------------------------------------------------------------------------------------------
   */

  /**
   * DateTime suite
   */
  function DateTimeSuite () {
    datetimeInstance.setStartOfDay();
  }

  /**
   * MomentJS suite
   */
  function MomentSuite () {
    momentInstance.startOf('day');
  }

  /**
   * MomentJS Timezone suite
   */
  function MomentTimezoneSuite () {
    momentTimezoneInstance.startOf('day');
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
    description: 'Set start of a day',
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
