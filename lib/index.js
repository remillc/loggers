'use strict';

const tracer = require('tracer');
const responseTime = require('response-time');
const clc = require('cli-color');

const strategy = process.stdin.isTTY
	? 'colorConsole'
	: 'console';
const loggerSettings = {
	dateformat: 'yyyy-mm-dd HH:MM:ss'
};
const devSettings = {
	format: '{{timestamp}} {{message}}',
	dateformat: 'yyyy-mm-dd HH:MM:ss'
};

const logger = tracer[strategy](loggerSettings);
const devHTTPLogger = tracer[strategy](devSettings);

logger.setLevel = tracer.setLevel;

module.exports.logger = logger;

module.exports.dev = responseTime(function(req, res, time) {
	const contentLength = typeof res.get('Content-Length') === 'undefined'
			? ''
			: '- ' + res.get('Content-Length') + ' o',
		status = res.statusCode,
		statusColor = status >= 500
			? clc.redBright // red
			: status >= 400
				? clc.yellowBright // yellow
				: status >= 300
					? clc.cyanBright // cyan
					: status >= 200
						? clc.greenBright // green
						: clc.white // no color

	devHTTPLogger.log(req.method, req.path, statusColor(res.statusCode), time.toFixed(3), 'ms', contentLength);
});
