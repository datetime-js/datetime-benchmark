'use strict';

var tzdata = require('./node_modules/datetime2-tzdata/tzdata/2017a/js/Europe/Moscow');
var JSJoda = require('js-joda').use(require('js-joda-timezone'));

// Benchmark
global.Benchmark = require('benchmark');

// DateTime v2
global.DateTime = require('datetime2');

// MomentJS
global.momentTz = require('moment-timezone');
global.moment = require('moment');

// js-joda
global.JSJoda = JSJoda;

DateTime.setTzdata(tzdata);
DateTime.setDefaultTimezone('Europe/Moscow');
