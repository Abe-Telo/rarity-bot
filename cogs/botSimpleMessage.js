"use strict;"

const headerTemplate = require('../templates/header')["SimpleMessage"];
const bodyTemplate = require('../templates/body')["SimpleMessage"];
const footerTemplate = require('../templates/footer')["SimpleMessage"];
const disclaimerTemplate = require('../templates/disclaimer')["SimpleMessage"];

let SimpleMessage = class SimpleMesssage {

	constructor(client, title, message, footer = "")
	{
		this.client       = client;
		this.header       = headerTemplate(title); 
		this.body         = bodyTemplate(message);
		this.footer       = footerTemplate(footer);
		this.disclaimer   = disclaimerTemplate();
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

	get fullMessage()
	{
		return `${this.header}${this.body}${this.footer}${this.disclaimer}`;
	}

}

module.exports = SimpleMessage;
