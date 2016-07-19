'use strict';

const tracer = require('tracer'),
	responseTime = require('response-time'),
	clc = require('cli-color'),
	uncolor = require('uncolor'),
	devHTTPloggerOpts = {
		format: '{{timestamp}} {{message}}',
		dateformat: 'yyyy-mm-dd HH:MM:ss'
	},
	logger = tracer.colorConsole({
		dateformat: 'yyyy-mm-dd HH:MM:ss'
	});

if (typeof process.stdin.isTTY === 'undefined' && process.platform === 'linux') {
	devHTTPloggerOpts.filters = [uncolor]
}

const devHTTPLogger = tracer.colorConsole(devHTTPloggerOpts);

module.exports.logger = logger;

module.exports.dev = responseTime(function(req, res, time) {
	const contentLength = typeof res.get('Content-Length') === 'undefined' ? '' : '- ' + res.get('Content-Length') + ' o',
		status = res.statusCode,
		statusColor = status >= 500 ? clc.redBright // red
		:
		status >= 400 ? clc.yellowBright // yellow
		:
		status >= 300 ? clc.cyanBright // cyan
		:
		status >= 200 ? clc.greenBright // green
		:
		clc.white // no color

	devHTTPLogger.log(req.method, req.path, statusColor(res.statusCode), time.toFixed(3), 'ms', contentLength);
});
