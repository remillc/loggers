'use strict';

const config = {
	strategy: process.stdin.isTTY
		? 'colorConsole'
		: 'console',
	settings = {
		dateformat: 'yyyy-mm-dd HH:MM:ss'
	}
};

module.exports.logger = require('tracer')[config.strategy](config.settings);
