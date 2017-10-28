"use strict";

const Bot = require("./cogs/botSetup");
const BotConfig = require("./config/botConfig.JSON");

const Commands = BotConfig["Commands"];

let bot = new Bot();

bot.client.on("message", message => {
	if (message.content.substring(0, 1) === BotConfig["WakeSymbol"]) {
		var args = message.content.substring(1).split(" ");
		var command = args[0];

		args = args.splice(1);

		switch (command)
		{
		case Commands["default"]:
			bot.sendMessage(bot.user, message, args);
			break;
		case Commands["server-setup"]:
			break;
		case Commands["user-prefs"]:
			break;
		case Commands["global-user-prefs"]:
			break;
		default:
			bot.sendMessage(bot.user, message, ["Error", "Command Not Found"], "ERROR");
			break;
		}
        
	}
});

