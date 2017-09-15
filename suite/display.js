(function suiteDisplay () {
  'use strict';

  var suiteId = 'display';
  var suite = new Benchmark.Suite();

  var datetimeInstance = new DateTime([1996, 10, 5, 14, 0, 34, 543]);

  var momentInstance = moment([1996, 9, 5, 14, 0, 34, 543]);
  var momentTimezoneInstance = moment.tz([1996, 9, 5, 14, 0, 34, 543], 'Europe/Moscow');

  /**
   * ------------------------------------------------------------------------------------------------
   * Suites
   * ------------------------------------------------------------------------------------------------
   */

  /**
   * DateTime v2 suite
   */
  function DateTimeSuite () {
    return datetimeInstance.format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
  }

  /**
   * MomentJS suite
   */
  function MomentSuite () {
    return momentInstance.format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
  }

  /**
   * MomentJS Timezone suite
   */
  function MomentTimezoneSuite () {
    return momentTimezoneInstance.format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
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
    description: 'Display a date in a given format',
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
