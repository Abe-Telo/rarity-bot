"use strict";

const config = require("../config/simpleMessageConfig.JSON"); 

const headerTemplate = require("../templates/header")["SimpleMessage"];
const bodyTemplate = require("../templates/body")["SimpleMessage"];
const footerTemplate = require("../templates/footer")["SimpleMessage"];
const disclaimerTemplate = require("../templates/disclaimer")["SimpleMessage"];

let SimpleMessage = class SimpleMesssage {

	constructor(title, message, footer, disclaimerToggle = config["ShowDisclaimer"])
	{
		this.header           = headerTemplate(title); 
		this.body             = bodyTemplate(message);
		this.footer           = footerTemplate(footer || "END");
		this.disclaimer       = disclaimerTemplate();
		this.disclaimerToggle = disclaimerToggle;
	}

	set header(title)
	{
		this.title = title;
	}

	get header()
	{
		return this.title;
	}

	set body(message)
	{
		this.message = message;
	}

	get body()
	{
		return this.message;
	}

	set footer(fTitle) 
	{
		this.endMessage = fTitle; 	
	}

	get footer()
	{
		return this.endMessage;
	}

	set disclaimerToggle(disclaimerToggle)
	{
		this.dt = disclaimerToggle;
	}

	get disclaimerToggle()
	{
		return this.dt;
	}

	toggleDisclaimer()
	{
		this.disclaimerToggle = !this.disclaimerToggle;
	}

	get fullMessage()
	{
		let msg = `${this.header}${this.body}${this.footer}`;
		if (this.disclaimerToggle) {
			msg += this.disclaimer;
		}
		return msg;
	}

};

module.exports = SimpleMessage;
