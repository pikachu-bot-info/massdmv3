/*jshint esversion: 6 */

const Discord = require('discord.js');
const figlet = require('figlet');
const colors = require('colors');
const readline = require('readline');
const commando = require(`discord.js-commando`);

const config = require('./config.json');
const bot = new commando.Client({
    commandPrefix:'mass!',
    owner: config.id
});

const cmdsArray = [
    "dmall <message>",
    "dmrole <role> <message>"
];

bot.on("ready", () => {
    clear();
    console.log('______');
    bot.user.setActivity('from GitHub', { url: "https://github.com/alexlyee/massdm", type: 'PLAYING' })
        .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
        .catch(console.error);
    
});


bot.on("error", (error) => {
    bot.login(config.token);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

bot.registry.registerGroup('dms', 'help');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

if (process.env.TESTING) process.exit();

try {
    if (process.env.BOT_TOKEN) bot.login(process.env.BOT_TOKEN);
    else bot.login(config.token);
}
catch (e) {
    console.log(e);
    console.log("Failed to login to Discord!");
}



function clear() {
    console.clear();
    console.log(figlet.textSync("MassDM v3.4.0b").green); // just in case it wasn't obvious, this is a beta
    console.log("\n\nMass DM bot for Discord. \n Sends DMs to selected members of guild.\n  Forked and improved by Alex.");
    console.log("\n     Don't forget to apply the proper permissions in Discord. Use https://github.com/alexlyee/massdm/issues to report issues. Suport server: https://discord.gg/mMWQaDx");
    console.log("\n     After someone by the name of \"6669\" double-crossed me, \n(assuring me that I would be paid for working on the project, but once I did most of the work and proved it was fixed, blocked me) \n    I will be abandoning this project, please do not contact me to report bugs. I am aware that there are some. ");
    console.log(`\nRandom send time set @ 0.01-${config.wait}s`);
    console.log(` Type  ${config.prefix}help  in a chat.\n\n`);
}

/************      NOTES */

/*
The only values that are not truthy in JavaScript are the following (a.k.a. falsy values):

null
undefined
0
"" (the empty string)
false
NaN

*/

/* 
.jshintrc
{
  "esversion": 6
}
*/

/*
https://stackoverflow.com/questions/14274293/show-current-state-of-jenkins-build-on-github-repo
https://docs.travis-ci.com/user/tutorial/   https://travis-ci.org/github/alexlyee/massdm/jobs/689535155
https://app.snyk.io/org/alexlyee
https://inch-ci.org/github/alexlyee/massdm?branch=master
https://hits.dwyl.com/
https://david-dm.org/?success
https://github.com/dwyl/goodparts#why

https://shields.io/
https://github.com/badges/shields/blob/master/README.md

https://github.com/dwyl/learn-tdd
*/