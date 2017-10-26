"use strict;"

const logger = require('winston');

logger.remove(logger.transports.Console);

logger.add(logger.transports.Console,{
	colorize: true
});

let Logger = class Logger {

	constructor(level = "info")
	{		
		this.mode = level;
	}

	set mode(level)
	{
		logger.level = level;
		this.level = level;
	}

	get mode()
	{
		return this.level;
	}

	error(msg)
	{
		logger.log('error', msg);
	}

	warning(msg)
	{
		logger.log('warn', msg);
	}

	info(msg)
	{
		logger.log('info', msg);
	}

	verbose(msg)
	{
		logger.log('verbose', msg);
	}

	debug(msg)
	{
		logger.log('debug', msg);
	}

	silly(msg)
	{
		logger.log('silly', msg);
	}

	write(msg, mode = undefined)
	{
		logger.log(mode || this.mode, msg);
	}

}

module.exports = Logger;
