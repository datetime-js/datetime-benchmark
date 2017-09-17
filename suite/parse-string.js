(function suiteString () {
  'use strict';

  var suiteId = 'parse-string';
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

  /**
   * JSJoda suite
   */
  function JSJodaSuite () {
    return JSJoda.ZonedDateTime.parse('1996-10-05T14:00:34+03:00[Europe/Moscow]');
  }

  suite = suite
    .add('DateTime', DateTimeSuite)
    .add('MomentJS', MomentSuite)
    .add('MomentJS with timezones', MomentTimezoneSuite)
    .add('js-joda with timezones', JSJodaSuite);

  /**
   * ------------------------------------------------------------------------------------------------
   * Export
   * ------------------------------------------------------------------------------------------------
   */

  var suiteItem = {
    description: 'Create a new instance with a string',
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
