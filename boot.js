'use strict';

var tzdata = require('./node_modules/datetime2-tzdata/tzdata/2017a/js/Europe/Moscow');

// Benchmark
global.Benchmark = require('benchmark');

// DateTime v2
global.DateTime = require('datetime2');

// MomentJS
global.momentTz = require('moment-timezone');
global.moment = require('moment');

DateTime.setTzdata(tzdata);
DateTime.setDefaultTimezone('Europe/Moscow');
