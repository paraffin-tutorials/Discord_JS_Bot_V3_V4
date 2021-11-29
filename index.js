
const Discord = require('discord.js')
const fs = require('fs')
const db = require('quick.db')

const { 
    token,
    prefix
 } = require('./index-settings.json')

const app = new Discord.Client()

app.commands = new Discord.Collection();
app.aliases = new Discord.Collection();

app.on('ready', () => {
    console.log(`| ${app.user.tag} is online !!!`)

setInterval(function() {
    app.user.setActivity('Discord JS app 1', { type: "WATCHING" })
    app.user.setActivity('Discord JS app 2', { type: "WATCHING" })
    app.user.setActivity('Discord JS app 3', { type: "WATCHING" })
},4000)
    
})

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Couldn't find commands.");
      return;
    }
    
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`| --------Commands-------- `);
      console.log(`| ✅ ${f} loaded! `);
      app.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => { 
        app.aliases.set(alias, props.help.name);
      });
    });
  })

app.on("message", async message => {

    let prefixbot = db.fetch(`${message.guild.id}_prefix`) || prefix;
    
    let messageArray = message.content.split(" ");
    let args = message.content.slice(prefixbot.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile;
  
    if (app.commands.has(cmd)) {
      commandfile = app.commands.get(cmd);
  } else if (app.aliases.has(cmd)) {
    commandfile = app.commands.get(app.aliases.get(cmd));
  }
  
      if (!message.content.startsWith(prefixbot)) return;
  
          
  try {
    commandfile.run(app, message, args);
  
  } catch (e) {
  }}
  )

app.login(token)