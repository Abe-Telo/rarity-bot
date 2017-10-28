"use strict";

const https = require("https");
const Events = require("events");

const config = require("../config/botConfig.JSON");
const UnitSearch = require("../cogs/unitSearch.js");

function sortJSON(array) {
	return array.sort(function (a, b) {
		let keyA, keyB;
		switch (config["sort"]) {
		case "NAME":
			keyA = a.player.toUpperCase();
			keyB = b.player.toUpperCase();
			break;
		case "POWER":
			keyA = a.power;
			keyB = b.power;
			break;
		case "RARITY":
			keyA = a.rarity;
			keyB = a.rarity;
			break;
		default:
			return 0;
		}

		if (keyA < keyB) return -1;
		if (keyA > keyB) return 1;
		return 0;
	});
}

function grabUnitInfo(unit, rarity, unitsInfo) {
	let usersStats = [];

	if (!unitsInfo[unit]) {
		return ["No Guild Data Yet..."];
	}

	unitsInfo[unit] = sortJSON(unitsInfo[unit]);

	for (var userIdx = 0; userIdx < unitsInfo[unit].length; userIdx++) {
		let user = unitsInfo[unit][userIdx];
		if ((rarity && user["rarity"] >= rarity) || !rarity) {
			usersStats.push(user["player"] + " - " + user["rarity"] + " - " + user["power"]);
		}
	}

	return usersStats;

}

function parseWebsite(unit, rarity, type, EventEmitter) {

	let unparsedJSON = "";

	https.get(config["SWGOH"], (res) => {

		res.setEncoding("utf8");

		res.on("data", (d) => {
			unparsedJSON += d;
		});

		res.on("end", () => {
			let unitsInfo = JSON.parse(unparsedJSON);

			EventEmitter.emit("MESSAGE_RECIEVED", type, [unit, grabUnitInfo(unit, rarity, unitsInfo), "END"]);
		});

	}).on("error", (e) => {
		EventEmitter.emit("MESSAGE_RECIEVED", "ERROR", [ "WEB ERROR", "Could Not Reach SWGOH.gg. Please Try Again Later", e ]);
	});

}

module.exports = function (command, type, EventEmitter) {
	let searchResults = UnitSearch(command);
	
	if (searchResults["error"]) {
		EventEmitter.emit("MESSAGE_RECIEVED", "ERROR", ["ERROR", searchResults["error"]]);
		return;
	}

	parseWebsite(searchResults["unit"], searchResults["star"], type, EventEmitter);
};
