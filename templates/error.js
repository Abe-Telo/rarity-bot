"use strict";

const errorConfig = require("../config/errorMessageConfig.JSON");

const Spacing = errorConfig["Spacing"];
const Seperators = errorConfig["Seperators"];
const SeperatorOccurance = errorConfig["SeperatorOccurance"]["header"];
const TabSpace = errorConfig["TabSpace"]["header"];
const SpacesAfterSeperators = errorConfig["SpacesAfterSeperators"];

function formatError(sectionTitle, sectionMessage)
{
	let formattedMsg = "";
	formattedMsg = "\n".repeat(Spacing["Before"]["header"]);
	formattedMsg += "\t".repeat(TabSpace);
	formattedMsg += "**";
	formattedMsg += Seperators["Before"]["header"].repeat(SeperatorOccurance);
	formattedMsg += " ".repeat(SpacesAfterSeperators["header"]);
	formattedMsg += "`";
	formattedMsg += sectionTitle;
	formattedMsg += "`";
	formattedMsg += " ".repeat(SpacesAfterSeperators["header"]);
	formattedMsg += Seperators["After"]["header"].repeat(SeperatorOccurance);
	formattedMsg += "**";
	formattedMsg += "\n".repeat(Spacing["After"]["header"]);
	formattedMsg += "\t".repeat(TabSpace);
	formattedMsg += Seperators["Before"]["messageItem"].repeat(SeperatorOccurance);
	formattedMsg += " ".repeat(SpacesAfterSeperators["messageItem"]);
	formattedMsg += "```";
	formattedMsg += sectionMessage;
	formattedMsg += "```";
	formattedMsg += " ".repeat(SpacesAfterSeperators["messageItem"]);
	formattedMsg += Seperators["After"]["messageItem"].repeat(SeperatorOccurance);
	formattedMsg += "\n".repeat(Spacing["After"]["messageItem"]);
	formattedMsg += "\t".repeat(TabSpace);
	formattedMsg += "**";
	formattedMsg += Seperators["Before"]["header"].repeat(SeperatorOccurance);
	formattedMsg += " ".repeat(SpacesAfterSeperators);
	formattedMsg += "`";
	formattedMsg += "END";
	formattedMsg += "`";
	formattedMsg += " ".repeat(SpacesAfterSeperators);
	formattedMsg += Seperators["After"]["header"].repeat(SeperatorOccurance);
	formattedMsg += "**";
	return formattedMsg;
}

module.exports = 
{
	"ErrorMessage": function(title, message)
	{
		return formatError(title, message);
	}
};
