"use strict";

const Discord = require('discord.js');
const logger = require('winston');

const https = require('https');

const auth = require('./config/auth.JSON');

let lastM;

// Configure logger settings
logger.remove(logger.transports.Console);

logger.add(logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot

var bot = new Discord.Client();
bot.login(auth.token);

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.username + ' - (' + bot.user.id + ')');
});

bot.on('message', message => {
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
        var unparsedJSON;
        var unitsJSON;
        var msg;
       
        args = args.splice(1);

        
        switch(cmd) {
            case 'rarity':
       var character = args[0].toUpperCase();
         if(!args[0]){
                    bot.sendMessage({
                        to: channelID,
                        message: '\n===============INCORRECT FORMAT:===============\n\n' +
                                 '\t\t\t\tUSAGE: !rarity (CHARACTER_NAME) [STAR_LVL]\n\n' +
                                 '==============================================\n'
                    });
                } else {

                    https.get('https://swgoh.gg/api/guilds/17809/units/', (res) => {
                        logger.info('statusCode: ' + res.statusCode);

                        res.setEncoding('utf8');

                        res.on('data', (d) => {
                            unparsedJSON += d;
                        });

                        res.on('end', () => {
                            unitsJSON = JSON.parse(unparsedJSON.substring(9));

                            if(!unitsJSON[character] || args.length > 2){

                                let testCharacter;

                                if(args.length > 2) {
                                    for (var x = 0; x < args.length - 1; x++) {
                                        if (x === 0) {
                                            testCharacter = args[x];
                                        } else {
                                            testCharacter = testCharacter + " " + args[x];
                                        }
                                    }
                                } else {
                                    testCharacter = args[0];
                                }

                                if(searchForUnit(testCharacter) == "_Not-Found_"){
                                    testCharacter = testCharacter + " " + args[args.length-1];
                                    character = searchForUnit(testCharacter);
                                    if(unitsJSON[character]){
                                        unitsJSON[character].sort(function(a, b){
                                            var keyA = a.player.toUpperCase(),
                                                keyB = b.player.toUpperCase();
                                            // Compare the 2 dates
                                            if(keyA < keyB) return -1;
                                            if(keyA > keyB) return 1;
                                            return 0;
                                        });

                                        msg = topDisplay(character, "=");

                                        for(var i = 0; i < unitsJSON[character].length; i++){
                                            msg += '\t\t\t' + unitsJSON[character][i]['player'] + ': ' + unitsJSON[character][i]['rarity'] + '\n';
                                        }

                                        msg = msg + topDisplay(character, "=");

                                        bot.sendMessage({
                                            to: channelID,
                                            message: msg
                                        });

                                    } else {
                                        bot.sendMessage({
                                            to: channelID,
                                            message: '\n===========INCORRECT CHARACTER:===========\n\n' +
                                            '\t\t\t\t\t\t Cannot find character specified\n\n' +
                                            '=========================================\n'
                                        });
                                    }
                                } else {
                                    character = searchForUnit(testCharacter);
                                    if(unitsJSON[character]){
                                        unitsJSON[character].sort(function(a, b){
                                            var keyA = a.player.toUpperCase(),
                                                keyB = b.player.toUpperCase();
                                            // Compare the 2 dates
                                            if(keyA < keyB) return -1;
                                            if(keyA > keyB) return 1;
                                            return 0;
                                        });

                                        msg = topDisplay(character, "=");

                                        for(var t = 0; t < unitsJSON[character].length; t++){
                                            if(args.length == 1){
                                                msg += '\t\t\t' + unitsJSON[character][t]['player'] + ': ' + unitsJSON[character][t]['rarity'] + '\n';
                                            } else {
                                                if(unitsJSON[character][t]['rarity'] >= args[args.length-1]){
                                                    msg += '\t\t\t' + unitsJSON[character][t]['player'] + ': ' + unitsJSON[character][t]['rarity'] + '\n';
                                                }
                                            }
                                        }

                                        msg = msg + topDisplay(character, "=");

                                        bot.sendMessage({
                                            to: channelID,
                                            message: msg
                                        });
                                    }
                                }

                            } else {
                                unitsJSON[character].sort(function(a, b){
                                    var keyA = a.player.toUpperCase(),
                                        keyB = b.player.toUpperCase();
                                    // Compare the 2 dates
                                    if(keyA < keyB) return -1;
                                    if(keyA > keyB) return 1;
                                    return 0;
                                });

                                msg = topDisplay(character, "=");

                                for(var i = 0; i < unitsJSON[character].length; i++){
                                    if(!args[1]){
                                        msg += '\t\t\t' + unitsJSON[character][i]['player'] + ': ' + unitsJSON[character][i]['rarity'] + '\n';
                                    } else {
                                        if(unitsJSON[character][i]['rarity'] >= args[1]){
                                            msg += '\t\t\t' + unitsJSON[character][i]['player'] + ': ' + unitsJSON[character][i]['rarity'] + '\n';
                                        }
                                    }
                                }

                                msg = msg + topDisplay(character, "=");

                                bot.sendMessage({
                                    to: channelID,
                                    message: msg
                                }, (err, message)=>{
									lastM = message;
								});

                            }
                        });

                    }).on('error', (e) => {
                        console.error(e);
                    });

                }
                break;
			case 'delete':
				lastM.delete();
				break;
			case 'hold':
				lastM = message;
				break;
        }
     }
});

function searchForUnit(testCharacter){

    var character = require('./data/Units.JSON')[testCharacter]  || "_Not-Found_";

    return character;
}

