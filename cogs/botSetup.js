"use strict";

const Events = require("events");
const Discord = require("discord.js");

const config = require("../config/botConfig.JSON");
const TOKEN = require("../config/auth.JSON")["token"];

const Logger = require("../cogs/botLogger.js");
const InfoGrabber = require("../cogs/unitInfoRetrieval");
const Message = require("../cogs/botMessages.js");
const MessageEmitter = new Events.EventEmitter();

let Bot = class Bot {

	constructor ()
	{
		this.client = new Discord.Client();
		this.logger = new Logger(config.LoggerLevel);
		this.logger.write("Bot has been initialized!");
		this.on();
	}

	on()
	{
		this.client.login(TOKEN);
		this.logger.write("Bot is now on!");
		this.client.on("ready", evt => {
			this.user = this.client.user;
			this.logger.write("Logged in as: ");
			this.logger.write(this.user.username + " - (" + this.user.id + ")");
		});
	}

	off()
	{
		this.client.destroy();
		this.logger.write("Bot is now off!");
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

	set user(user)
	{
		this.clientUser = user;
	}

	get user()
	{
		return this.clientUser;
	}

	log(msg)
	{
		this.logger.write(msg);
		return this.logger.mode;
	}

	sendMessage(user, message, command, type = config.MessageType)
	{
		MessageEmitter.once("MESSAGE_RECIEVED", function (type, msgInfo) {
			let msg = new Message(type, msgInfo);
			
			message.channel.send(msg.message.fullMessage, config.MessageOptions)
				.then( function(sentMessage) {
					if (type === "ERROR" && config["DeleteError"]) {
						message.delete(config["DeleteWait"] * 1000);
						sentMessage.delete(config["DeleteWait"] * 1000);
					}
				});
		});

		InfoGrabber(command, type, MessageEmitter);
	}

};


module.exports = Bot;
