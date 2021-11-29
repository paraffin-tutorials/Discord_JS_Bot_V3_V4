const axios = require('axios')

module.exports.run = async (app, message, args) => {


    let getInfo = async () => {

        let api = await axios.get('http://gahshomar-api.herokuapp.com/date/jalali')
        let info = api.data;

        return info;
    };

    let resp = await getInfo();



    message.delete();
    message.channel.send(resp)
}

module.exports.help = {
    name : "date",
    aliases : ["d"]
}