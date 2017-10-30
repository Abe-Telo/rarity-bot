"use strict";

const fs = require("fs");

function unitExists(unit, Units, UnitsAlias) {
	return (Units[unit.toUpperCase()] !== undefined || UnitsAlias[unit.toLowerCase()] !== undefined);
}

function parseCommand(command, Units, UnitsAlias, assumeStar = false) {
	let unit = "";
	let star = 0;

	if (assumeStar && command.length > 1) {
		star = command.pop();
	} 

	unit = command.join(" ").toLowerCase();

	return {"unit": unit, "star":star};
}

module.exports = function (command) {
	let Units = JSON.parse(fs.readFileSync("./data/Units.JSON", "utf8"));
	let UnitsAlias = JSON.parse(fs.readFileSync("./data/UnitsAlias.JSON", "utf8"));

	if (Units[command[0]]) {
		return { "unit": command[0], "star":command[1] };
	}
	
	let results = parseCommand(command, Units, UnitsAlias);

	if (!unitExists(results["unit"], Units, UnitsAlias)) {

		results = parseCommand(command, Units, UnitsAlias, true);
		if (!unitExists(results["unit"], Units, UnitsAlias)) {
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
