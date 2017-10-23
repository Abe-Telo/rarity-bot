var Discord = require('discord.io');
var logger = require('winston');
const https = require('https');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var unparsedJSON;
        var unitsJSON;
        var msg;
       
        args = args.splice(1);

        var character = args[0].toUpperCase();

        switch(cmd) {
            case 'rarity':
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
                                });

                            }
                        });

                    }).on('error', (e) => {
                        console.error(e);
                    });

                }
                break;
        }
     }
});

function searchForUnit(testCharacter){

    var character = "_Not-Found_";

    switch(testCharacter.toLowerCase()){
        case 'aayla':
            character = "AAYLASECURA";
            break;

        case 'lando':
        case 'calrissian':
        case 'lando calrissian':
            character = "ADMINISTRATORLANDO";
            break;

        case 'ackbar':
            character = "ADMIRALACKBAR";
            break;

        case 'ahsoka':
            character = "AHSOKATANO";
            break;

        case 'anakin':
        case 'jka':
        case 'jedi knight anakin':
            character = "ANAKINKNIGHT";
            break;

        case 'arc 170':
            character = "ARC170CLONESERGEANT";
            break;

        case 'rex ship':
            character = "ARC170REX";
            break;

        case 'asajj':
            character = "ASAJVENTRESS";
            break;

        case 'b2':
        case 'super battle droid':
            character = "B2SUPERBATTLEDROID";
            break;

        case 'barriss':
            character = "BARRISSOFFEE";
            break;

        case 'baze':
            character = "BAZEMALBUS";
            break;

        case 'biggs':
            character = "BIGGSDARKLIGHTER";
            break;

        case 'space monkey':
            character = "BISTAN";
            break;

        case 'plo koon ship':
        case 'blade of dorin':
        case 'plo koon starfighter':
            character = "BLADEOFDORIN";
            break;

        case 'boba':
            character = "BOBAFETT";
            break;

        case 'bodhi':
            character = "BODHIROOK";
            break;

        case 'cad':
        case 'bane':
            character = "CADBANE";
            break;

        case 'chimaera':
            character = "CAPITALCHIMAERA";
            break;

        case 'mace ship':
            character = "CAPITALJEDICRUISER";
            break;

        case 'ackbar ship':
            character = "CAPITALMONCALAMARICRUISER";
            break;

        case 'tarkin ship':
            character = "CAPITALSTARDESTROYER";
            break;

        case 'cassian':
            character = "CASSIANANDOR";
            break;

        case 'cody':
        case 'commander cody':
            character = "CC2224";
            break;

        case 'chirpa':
            character = "CHIEFCHIRPA";
            break;

        case 'nebit':
            character = "CHIEFNEBIT";
            break;

        case 'chirrut':
            character = "CHIRRUTIMWE";
            break;

        case 'chopper':
            character = "CHOPPERS3";
            break;

        case 'cs':
        case 'clone sarge':
        case 'clone sergeant':
            character = "CLONESERGEANTPHASEI";
            break;

        case 'chewie':
        case 'chewbacca':
        case 'cw chewie':
            character = "CLONEWARSCHEWBACCA";
            break;

        case 'cls':
        case 'commander luke':
        case 'jedi luke':
            character = "COMMANDERLUKESKYWALKER";
            break;

        case 'kylo ship':
            character = "COMMANDSHUTTLE";
            break;

        case 'cup':
            character = "CORUSCANTUNDERWORLDPOLICE";
            break;

        case 'dooku':
            character = "COUNTDOOKU";
            break;

        case 'echo':
            character = "CT210408";
            break;

        case 'fives':
            character = "CT5555";
            break;

        case 'rex':
            character = "CT7567";
            break;

        case 'old daka':
            character = "DAKA";
            break;

        case 'dn':
        case 'nihilus':
            character = "DARTHNIHILUS";
            break;

        case 'sid':
        case 'ds':
        case 'sidious':
            character = "DARTHSIDIOUS";
            break;

        case 'dt':
            character = "DEATHTROOPER";
            break;

        case 'krennic':
            character = "DIRECTORKRENNIC";
            break;

        case 'eeth koth':
            character = "EETHKOTH";
            break;

        case 'palps':
        case 'emperor':
        case 'palpatine':
            character = "EMPERORPALPATINE";
            break;

        case 'ewok elder':
            character = "EWOKELDER";
            break;

        case 'ewok scout':
            character = "EWOKSCOUT";
            break;

        case 'ezra':
        case 'ezra bridger':
            character = "EZRABRIDGERS3";
            break;

        case 'fn 2187':
            character = "FINN";
            break;

        case 'foo':
        case 'fo officer':
        case 'first order officer':
            character = " FIRSTORDEROFFICERMALE";
            break;

        case 'fotp':
        case 'fo tie pilot':
        case 'first order tie pilot':
            character = "FIRSTORDERTIEPILOT";
            break;

        case 'fost':
        case 'fo Stormtrooper':
        case 'first order Stormtrooper':
            character = "FIRSTORDERTROOPER";
            break;

        case 'fat':
        case 'fulcrum ahsoka':
        case 'fulcrum ahsoka tano':
            character = "FULCRUMAHSOKA";
            break;

        case 'gg':
        case 'gamorrean guard':
            character = "GAMORREANGUARD";
            break;

        case 'gar saxon':
            character = "GARSAXON";
            break;

        case 'gauntlet':
        case 'gauntlet Starfighter':
            character = "GAUNTLETSTARFIGHTER";
            break;

        case 'geonosian soldier':
            character = "GEONOSIANSOLDIER";
            break;

        case 'geonosian spy':
            character = "GEONOSIANSPY";
            break;

        case 'sun fac ship':
        case 'sf ship':
        case 'sun fac starfighter':
            character = "GEONOSIANSTARFIGHTER1";
            break;

        case 'geonosian soldier ship':
        case 'geonosian soldier starfighter':
            character = "GEONOSIANSTARFIGHTER2";
            break;

        case 'geonosian spy ship':
        case 'geonosian spy Starfighter':
            character = "GEONOSIANSTARFIGHTER3";
            break;

        case 'thrawn':
        case 'gat':
            character = "GRANDADMIRALTHRAWN";
            break;

        case 'yoda':
            character = "GRANDMASTERYODA";
            break;

        case 'tarkin':
        case 'gmt':
            character = "GRANDMOFFTARKIN";
            break;

        case 'han':
            character = "HANSOLO";
            break;

        case 'hera':
        case 'hera syndulla':
            character = "HERASYNDULLAS3";
            break;

        case 'hk':
            character = "HK47";
            break;

        case 'hoth han':
        case 'cholo':
            character = "HOTHHAN";
            break;

        case 'hr scout':
        case 'hoth rebel scout':
        case 'hoth scout':
            character = "HOTHREBELSCOUT";
            break;

        case 'hr soldier':
        case 'hoth rebel soldier':
        case 'hoth soldier':
            character = "HOTHREBELSOLDIER";
            break;

        case 'mob enforcer':
            character = "mob enforcer";
            break;

        case 'ig86':
        case 'ig 86':
            character = "IG86SENTINELDROID";
            break;

        case 'ig 88':
            character = "IG88";
            break;

        case 'igd':
            character = "IMAGUNDI";
            break;

        case 'imperial super commando':
        case 'isc':
            character = "IMPERIALSUPERCOMMANDO";
            break;

        case 'jawa engineer':
            character = "JAWAENGINEER";
            break;

        case 'jawa scav':
        case 'js':
        case 'jawa scavenger':
            character = "JAWASCAVENGER";
            break;

        case 'jc':
        case 'jedi consular':
        case 'jedi knight consular':
            character = "JEDIKNIGHTCONSULAR";
            break;

        case 'jedi knight guardian':
        case 'jkg':
        case 'jedi guardian':
            character = "JEDIKNIGHTGUARDIAN";
            break;

        case 'ahsoka ship':
            character = "JEDISTARFIGHTERAHSOKATANO";
            break;

        case 'jc ship':
        case 'jedi consular ship':
            character = "JEDISTARFIGHTERCONSULAR";
            break;

        case 'jyn erso':
        case 'jyn':
        case 'erso':
            character = "JYNERSO";
            break;

        case 'k2':
            character = "K2SO";
            break;

        case 'kanan':
            character = "KANANJARRUSS3";
            break;

        case 'kit fisto':
            character = "KITFISTO";
            break;

        case 'kylo':
        case 'zylo':
        case 'kylo ren':
            character = "KYLOREN";
            break;

        case 'luke':
        case 'farmboy luke':
            character = "LUKESKYWALKER";
            break;

        case 'lumi':
        case 'luminara':
        case 'luminara unduli':
            character = "LUMINARAUNDULI";
            break;

        case 'mace':
        case 'mace windu':
            character = "MACEWINDU";
            break;

        case 'magma':
            character = "MAGMATROOPER";
            break;

        case 'ig 100':
            character = "MAGNAGUARD";
            break;

        case 'darth maul':
        case 'maul':
        case 'zaul':
            character = "MAUL";
            break;


        case 'ns acolyte':
        case 'nightsister acolyte':
            character = "NIGHTSISTERACOLYTE";
            break;

        case 'ns initiate':
        case 'nightsister initiate':
            character = "NIGHTSISTERINITIATE";
            break;

        case 'nute':
            character = "NUTEGUNRAY";
            break;

        case 'old ben':
        case 'ob':
        case 'old ben Kenobi':
            character = "OLDBENKENOBI";
            break;

        case 'phantom 2':
        case 'phantom':
        case 'phantom ii':
            character = "PHANTOM2";
            break;

        case 'plo koon':
            character = "PLOKOON";
            break;

        case 'poggle':
        case 'poggle the lesser':
            character = "POGGLETHELESSER";
            break;

        case 'leia':
        case 'princess leia':
            character = "PRINCESSLEIA";
            break;

        case 'qgj':
        case 'qui gon':
        case 'qui gon jinn':
            character = "QUIGONJINN";
            break;

        case 'r2':
        case 'r2d2':
            character = "R2D2_LEGENDARY";
            break;

        case 'rp':
        case 'resistance pilot':
            character = "RESISTANCEPILOT";
            break;

        case 'rt':
        case 'resistance trooper':
            character = "RESISTANCETROOPER";
            break;

        case 'rg':
        case 'royal guard':
            character = "ROYALGUARD";
            break;

        case 'sabine':
        case 'sabine wren':
            character = "SABINEWRENS3";
            break;

        case 'savage':
        case 'zavage':
            character = "SAVAGEOPRESS";
            break;

        case 'srp':
        case 'scariff rebel pathfinder':
        case 'scariff':
        case 'pathfinder':
            character = "SCARIFREBEL";
            break;

        case 'shore':
        case 'shore trooper':
            character = "SHORETROOPER";
            break;

        case 'sith assassin':
            character = "SITHASSASSIN";
            break;

        case 'sith trooper':
            character = "SITHTROOPER";
            break;

        case 'slave 1':
        case 'slave one':
            character = "SLAVE1";
            break;

        case 'smuggler chewie':
        case 'smuggler Chewbacca':
            character = "SMUGGLERCHEWBACCA";
            break;

        case 'smuggler han':
            character = "SMUGGLERHAN";
            break;

        case 'snow':
        case 'snow trooper':
            character = "SNOWTROOPER";
            break;

        case 'storm':
        case 'storm trooper':
            character = "STORMTROOPER";
            break;

        case 'sth':
        case 'storm trooper han':
        case 'Stormtrooper han':
            character = "STORMTROOPERHAN";
            break;

        case 'sun fac':
            character = "SUNFAC";
            break;

        case 'tie advanced':
            character = "TIEADVANCED";
            break;

        case 'fotp ship':
            character = "TIEFIGHTERFIRSTORDER";
            break;

        case 'tfp ship':
            character = "TIEFIGHTERIMPERIAL";
            break;

        case 'tfp':
        case 'tie fighter pilot':
        case 'tie':
            character = "TIEFIGHTERPILOT";
            break;

        case 'tie reaper':
        case 'dt ship':
        case 'st ship':
            character = "TIEREAPER";
            break;

        case 'tusken raider':
            character = "TUSKENRAIDER";
            break;

        case 'tusken shaman':
            character = "TUSKENSHAMAN";
            break;

        case 'umbaran':
        case 'umbaran Starfighter':
        case 'fives ship':
            character = "UMBARANSTARFIGHTER";
            break;

        case 'bistan u wing':
        case 'bistan ship':
            character = "UWINGROGUEONE";
            break;

        case 'cassian u wing':
        case 'cassian ship':
            character = "UWINGSCARIF";
            break;

        case 'darth vader':
        case 'dv':
        case 'zader':
            character = "VADER";
            break;

        case 'wedge':
            character = "WEDGEANTILLES";
            break;

        case 'poe ship':
        case 'poe xwing':
        case 'poe x wing':
            character = "XWINGBLACKONE";
            break;

        case 'wedge ship':
            character = "XWINGRED2";
            break;

        case 'biggs ship':
            character = "XWINGRED3";
            break;

        case 'resistance x wing':
        case 'resistance xwing':
        case 'rp ship':
            character = "XWINGRESISTANCE";
            break;

        case 'zam':
        case 'zam wesell':
            character = "ZAMWESELL";
            break;

        case 'zeb':
        case 'zeb orrelios':
        case 'garazeb orrelios':
        case 'orrelios':
            character = "ZEBS3";
            break;
    }

    return character;
}

var displayLength = 40;

function topDisplay(character, filler){
    var topLine = "\n";
    let tempLength = displayLength - character.length;
    var fillerLengthSides = Math.floor(tempLength/2);
    for(var side = 0; side < fillerLengthSides * 2; side++){
        topLine += filler;
    }
    topLine += character + ":";
    for(var side = 0; side < fillerLengthSides * 2; side++){
        topLine += filler;
    }
    topLine += "\n\n"
    return topLine;
}


function botDisplay(character, filler){
    var botLine = "\n";
    let tempLength = displayLength + character.length;
    var fillerLengthSides = Math.floor(tempLength/2);
    for(let s = 0; s < tempLength; s++){
        botLine += filler;
    }
    botLine += "\n"
    return botLine;
}