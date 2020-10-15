const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

let token = getToken();

const PREFIX = '-';
const HELPMSG = "Invalid Arguments, use -help <command> for help"
const VERSION = "0.0.1";

const userData = require('./data/user-data.json');
const { version } = require('os');

console.log("Bot logging in...")
bot.login(token)
console.log("Login successful!")

bot.on('ready', () =>{
    console.log('Hello World!')
})

bot.on('message', message=>{
    if(message.author.id !== "750833421252689930") {
        var prefix = message.content.substring(0, PREFIX.length);
        if(prefix.startsWith(PREFIX)) {
            if(message.content !== "") {
                let args = message.content.substring(PREFIX.length).split(" ");
                if (!userData[message.author.id]) {
                    //userData[message.author.id] = newUser() //TODO
                }
                CLI(message, args)
            }
        }

        fs.writeFileSync("./data/user-data.json", JSON.stringify(userData, null, 2), console.error)

    }
})

function rollDie(sides) {
    return Math.round(Math.random() * sides);
}

function createEmbed(title, description, url=null, thumbnail=null) {
    let embed = new Discord.MessageEmbed()
    .setTitle(videoTitle)
    .setDescription(videoDescription)
    .setImage(videoThumbnailURL)
    .setURL(videoURL);
    return embed
}

function getToken() {    
    try {
        let data = fs.readFileSync('../Tokens/SharkPogBot.txt', 'utf8');
        return data
    } 
    catch(e) {
        console.log('Error:', e.stack);
    }
}

function checkBalance(UID, amount) {
    try {
        let data = fs.readFileSync('data/user-data.json', 'utf8');
        if(data[UID] != null) {
            return data[UID].walletBalance >= amount
        }
        return data
    } 
    catch(e) {
        console.log('Error:', e.stack);
    }
}

function getAmount(rawAmount) { //TODO
    return
}

function CLI(message, args) {
    switch (args[0]) {
        case "ping":
            message.channel.send("pong");
            return;
        case "roll":
            if(args[1] && !isNaN(args[1])) {
                let roll = "Your Roll: ";
                let rNum = parseInt(args[1]);
                if(rNum > 0 && rNum < 20) {
                    for(let i = 0; i < rNum; i++) {
                        roll += rollDie(6) + " ";
                    }
                    message.reply(roll);
                }
                else {
                    message.reply("Please use a valid number of die (1-20)!")
                }
            }
            else {
                message.reply(HELPMSG);
            }
            return;
        case "clear":
            if(args[1] && !isNaN(args[1]) && args[1] > 0) {
                message.channel.bulkDelete(args[1]);
                message.channel.send("Cleared **" + args[1] + "** messages.");
            }
            else { message.reply(HELPMSG); }
            return;
        case "stats":
            if(userData[message.author.id]) {
                //nothing yet...
            }
            else {
                message.reply("No stats to display...");
            }
            return;
        case "gamble":
            if(args.length > 1) {
                getAmount(args[1])
                checkBalance(message.author.id, amount)
            }
            let title = "**" + message.author.username + "'s gambling game**"
            let description = ""
            let playerScore = rollDie(6) + rollDie(6)
            let botScore = rollDie(6) + rollDie(6)
            if(playerScore > botScore) {
                description = ""
            }
            createEmbed()
        case "blackjack":
            return;
        case "version":
            embedOutput = "The current version is " + VERSION;
            return;
        case "help":
            return;
        default:
            return;
    }
}


