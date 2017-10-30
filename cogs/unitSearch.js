"use strict";

const UnitsAlias = require("../data/UnitsAlias.JSON"); 
const Units = require("../data/Units.JSON");
 
function unitExists(unit) {
	return (Units[unit.toUpperCase()] !== undefined || UnitsAlias[unit.toLowerCase()] !== undefined);
}

function parseCommand(command, assumeStar = false) {
	let unit = "";
	let star = 0;

	if (assumeStar && command.length > 1) {
		star = command.pop();
	} 

	unit = command.join(" ").toLowerCase();

	return {"unit": unit, "star":star};
}

module.exports = function (command) {
	if (Units[command[0]]) {
		return { "unit": command[0], "star":command[1] };
	}
	
	let results = parseCommand(command);

	if (!unitExists(results["unit"])) {

		results = parseCommand(command, true);
		if (!unitExists(results["unit"])) {
			return {"error": "Unit Not Found."};
		}
	
	}

	if (UnitsAlias[results["unit"].toLowerCase()]) {
		results["unit"] = UnitsAlias[results["unit"].toLowerCase()];
	} else if (Units[results["unit"].toUpperCase()]) {
		results["unit"] = results["unit"].toUpperCase(); 
	}

	return results;
};
