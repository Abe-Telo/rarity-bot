"use strict;"

const messageConfig = require('../config/simpleMessageConfig.JSON');
const DisplayNames = require('../data/DisplayNames.JSON');

const Spacing = messageConfig["Spacing"];
const Seperators = messageConfig["Seperators"];
const SeperatorOccurance = messageConfig["SeperatorOccurance"]["header"];
const TabSpace = messageConfig["TabSpace"]["header"];
const SpacesAfterSeperators = messageConfig["SpacesAfterSeperators"]["header"];

function formatSection(sectionInfo)
{
	let formattedMsg = "";
	formattedMsg = "\n".repeat(Spacing["Before"]["header"]);
	formattedMsg += "\t".repeat(TabSpace);
	formattedMsg += "**";
	formattedMsg += Seperators["Before"]["header"].repeat(SeperatorOccurance);
	formattedMsg += " ".repeat(SpacesAfterSeperators);
	formattedMsg += '`';
	formattedMsg += sectionInfo;
	formattedMsg += '`';
	formattedMsg += " ".repeat(SpacesAfterSeperators);
	formattedMsg += Seperators["After"]["header"].repeat(SeperatorOccurance);
	formattedMsg += "**";
	formattedMsg += "\n".repeat(Spacing["After"]["header"]);
	formattedMsg += "`User` | `Rarity` | `Power`\n";
	return formattedMsg;
}


module.exports = 
{
	"SimpleMessage": function (info = "")
	{
		return formatSection(DisplayNames[info] || info);
	}
}
