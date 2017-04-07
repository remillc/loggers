'use strict';

const tracer = require('tracer');
const responseTime = require('response-time');
const clc = require('cli-color');
const colors = require('colors/safe');
const prettyBytes = require('pretty-bytes');

const strategy = process.stdout.isTTY
	? 'colorConsole'
	: 'console';

const loggerSettings = {
	dateformat: 'yyyy-mm-dd HH:MM:ss'
};

const devSettings = {
	format: '{{timestamp}} {{message}}',
	dateformat: 'yyyy-mm-dd HH:MM:ss',
	filters: [
		{
			log: colors.grey
		}
	]
};

const logger = tracer[strategy](loggerSettings);
const devHTTPLogger = tracer[strategy](devSettings);

logger.setLevel = tracer.setLevel;
logger.getLevel = tracer.getLevel;

module.exports.logger = (level) => {
	if (level) {
		tracer.setLevel(level)
	}
	return logger;
}

module.exports.dev = responseTime(function(req, res, time) {
	const contentLength = typeof res.get('Content-Length') === 'undefined'
			? ''
			: '- ' + prettyBytes(+ res.get('Content-Length')),
		status = res.statusCode,
		statusColor = status >= 500
			? clc.redBright // red
			: status >= 400
				? clc.yellowBright // yellow
				: status >= 300
					? clc.cyanBright // cyan
					: status >= 200
						? clc.greenBright // green
						: clc.white, // no color
		ts = time.toFixed(3) + 'ms';

	devHTTPLogger.log(req.method, req.originalUrl, statusColor(res.statusCode), ts, contentLength);
});
