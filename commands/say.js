module.exports.run = async (app, message, args) => {

    message.delete();
    message.channel.send(args.join(" "))
}

module.exports.help = {
    name : "say",
    aliases : ["s"]
}