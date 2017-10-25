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
	formattedMsg += Seperators["Before"]["footer"].repeat(SeperatorOccurance);
	formattedMsg += " ".repeat(SpacesAfterSeperators);
	formattedMsg += sectionInfo;
	formattedMsg += " ".repeat(SpacesAfterSeperators);
	formattedMsg += Seperators["After"]["footer"].repeat(SeperatorOccurance);
	formattedMsg += "\n".repeat(Spacing["After"]["footer"]);
	return formattedMsg;
}


module.exports = 
{
	"SimpleMessage": function (info = "")
	{
		return formatSection(info);
	}
}
