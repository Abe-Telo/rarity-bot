"use strict";

const messageConfig = require("../config/simpleMessageConfig.JSON");

const Spacing = messageConfig["Spacing"];
const Seperators = messageConfig["Seperators"];
const SeperatorOccurance = messageConfig["SeperatorOccurance"]["messageItem"];
const TabSpace = messageConfig["TabSpace"]["messageItem"];
const SpacesAfterSeperators = messageConfig["SpacesAfterSeperators"]["messageItem"];

function formatSection(sectionInfo)
{
	let formattedMsg = "";
	formattedMsg = "\n".repeat(Spacing["Before"]["messageItem"]);
	formattedMsg += "\t".repeat(TabSpace);
	formattedMsg += Seperators["Before"]["messageItem"].repeat(SeperatorOccurance);
	formattedMsg += " ".repeat(SpacesAfterSeperators);
	formattedMsg += sectionInfo;
	formattedMsg += " ".repeat(SpacesAfterSeperators);
	formattedMsg += Seperators["After"]["messageItem"].repeat(SeperatorOccurance);
	formattedMsg += "\n".repeat(Spacing["After"]["messageItem"]);
	return formattedMsg;
}


module.exports = 
{
	"SimpleMessage": function (info = [""])
	{
		let body = "\n```\n";
		for(let currentIndex = 0; currentIndex < info.length; currentIndex++){
			body += formatSection(info[currentIndex]);
		}
		body += "```";
		return body;
	}
};
