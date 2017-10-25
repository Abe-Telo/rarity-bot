const messageConfig = require('../config/simpleMessageConfig.JSON');

const Spacing = messageConfig["Spacing"];
const Seperators = messageConfig["Seperators"];
const SeperatorOccurance = messageConfig["SeperatorOccurance"]["disclaimer"];
const TabSpace = messageConfig["TabSpace"]["disclaimer"];
const SpacesAfterSeperators = messageConfig["SpacesAfterSeperators"]["disclaimer"];

function formatSection(sectionInfo)
{
	let formattedMsg = "";
	formattedMsg = "\n".repeat(Spacing["Before"]["disclaimer"]);
	formattedMsg += "\t".repeat(TabSpace);
	formattedMsg += Seperators["Before"]["disclaimer"].repeat(SeperatorOccurance);
	formattedMsg += " ".repeat(SpacesAfterSeperators);
	formattedMsg += sectionInfo;
	formattedMsg += " ".repeat(SpacesAfterSeperators);
	formattedMsg += Seperators["After"]["disclaimer"].repeat(SeperatorOccurance);
	formattedMsg += "\n".repeat(Spacing["After"]["disclaimer"]);
	return formattedMsg;
}


module.exports = 
{
	"SimpleMessage": function (info = messageConfig.disclaimer)
	{
		return formatSection(info);
	}
}
