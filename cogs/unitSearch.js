"use strict;"

const UnitsAlias = require('../data/UnitsAlias.JSON'); 
const Units = require('../data/Units.JSON');
const InfoRetrieval = require('./unitsInfoRetrieval.js');

let find = function (command) {
	return null;
}

function unitExists(unit) {
	return (Units[unit] !== undefined || UnitsAlias[unit] !== undefined);
}

function parseCommand(command, assumeStar = false) {
	let unit = "";
	let star = 0;

	if (assumeStar) {
		star = command.pop();
	} 

	unit = command.join(' ').toLowerCase();

	return {"unit": unit, "star":star};
}

console.log(unitExists(parseCommand(["raid", "HAN"])["unit"]));

module.exports = find;
