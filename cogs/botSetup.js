"use strict;"

const Discord = require('discord.js');

const config = require('../config/botConfig.JSON');
const TOKEN = require('../config/auth.JSON')["token"];

const BotLogger = require('../cogs/botLogger.js');

let Bot = class Bot {

	constructor ()
	{
		this.client = new Discord.Client();
		this.logger = new BotLogger(config.LoggerLevel);
	}

	on()
	{
		return this.client.login(TOKEN);
	}

	off()
	{
		return this.client.destroy();
	}

	set client(client)
	{
		this.botclient = client;
	}

	get client()
	{
		return this.botclient;
	}

	set logger(logger)
	{
		this.botlogger = logger;
	}

	get logger()
	{
		return this.botlogger;
	}

	log(msg)
	{
		this.logger.write(msg);
		return this.logger.mode;
	}

	sendMessage(command, type = config.MessageType)
	{
		let msg = "";

		this.client.user.sendMessage(msg, config.MessageOptions);
	}

}

let x = new Bot();

x.logger.write("Hello World");

module.exports = Bot;
