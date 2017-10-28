"use strict";

const template = require("../templates/error");

let ErrorMessage = class ErrorMessage {

	constructor(title, message)
	{
		this.title   = title; 
		this.message = message;
	}

	set title(title)
	{
		this.header = title;
	}

	get title()
	{
		return this.header;
	}

	set message(message)
	{
		this.body = message;
	}

	get message()
	{
		return this.body;
	}

	get fullMessage()
	{
		return template["ErrorMessage"](this.title, this.message);
	}

};

module.exports = ErrorMessage; 
