"use strict;"

const messageConfig = require('../config/simpleMessageConfig.JSON');

const Spacing = messageConfig["Spacing"];
const Seperators = messageConfig["Seperators"];
const SeperatorOccurance = messageConfig["SeperatorOccurance"]["footer"];
const TabSpace = messageConfig["TabSpace"]["footer"];
const SpacesAfterSeperators = messageConfig["SpacesAfterSeperators"]["footer"];

function formatSection(sectionInfo)
{
	let formattedMsg = "";
	formattedMsg = "\n".repeat(Spacing["Before"]["footer"]);
	formattedMsg += "\t".repeat(TabSpace);
	formattedMsg += "**";
	formattedMsg += Seperators["Before"]["footer"].repeat(SeperatorOccurance);
	formattedMsg += " ".repeat(SpacesAfterSeperators);
	formattedMsg += '`';
	formattedMsg += sectionInfo;
	formattedMsg += '`';
	formattedMsg += " ".repeat(SpacesAfterSeperators);
	formattedMsg += Seperators["After"]["footer"].repeat(SeperatorOccurance);
	formattedMsg += "**";
	formattedMsg += "\n".repeat(Spacing["After"]["footer"]);
	return formattedMsg;
}


module.exports = 
{
	"SimpleMessage": function (info = "END")
	{
		return formatSection(info);
	}
}
