"use strict";

const ErrorMessage = require("./botErrorMessage.js");
const SimpleMessage = require("./botSimpleMessage.js");
const EmbeddedMessage = require("./botEmbeddedMessage.js");
const DefaultType = require("../config/botConfig.JSON")["MessageType"];

let Message = class Message {

	constructor (type, message)
	{
		this.type = type;
		this.message = message;
	}

	set type(type)
	{
		switch (type) 
		{
		case "SIMPLE":
		case "EMBEDDED":
		case "ERROR":
			this.messageType = type;
			break;
		default:
			this.messageType = DefaultType;
			break;
		}
	}

	get type()
	{
		return this.messageType;
	}

	set message(message)
	{
		switch (this.type)
		{
		case "SIMPLE":
			this.msg = new SimpleMessage(message[0], message[1], message[2]);
			break;
		case "EMBEDDED":
			this.msg = new EmbeddedMessage(message[0], message[1], message[2]);
			break;
		case "ERROR":
			this.msg = new ErrorMessage(message[0], message[1]);
			break;
		}
	}

	get message()
	{
		return this.msg;
	}

};

module.exports = Message;
