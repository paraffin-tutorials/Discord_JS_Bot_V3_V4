const db = require('quick.db')

module.exports.run = async (app, message, args) => {


    let adminperm = message.member.hasPermission("ADMINISTRATOR")
    if(!adminperm) return message.channel.send('شما پریمیشن ادمینی ندارید')

    let Args0 = args[0]
    if(!Args0) return message.channel.send('لطفا پریفیکس مورد نظر خود را بعد از کامند بنویسید')

    db.set(`${message.guild.id}_prefix`, Args0)

    message.delete();
    message.channel.send(`پریفیکس بات تغییر یافت به ${Args0}`)
}

module.exports.help = {
    name : "prefix",
    aliases : ["p"]
}