const Credentials = require('../../../../Crédentials.config.json');
const twilio = require('twilio');
const accountSID = Credentials.twilio.accountSid;
const authToken = Credentials.twilio.authToken;
const myPhoneNumber = "+18309992355";
const client = twilio(accountSID, authToken);

const sendSMS = (phoneNumber, message) => {
    return client.messages.create({
        to: phoneNumber,
        from: myPhoneNumber,
        body: message
    })
    .then(message => {
        console.log('SMS envoyé avec succès. SID du message :', message.sid);
        return message;
    })
    .catch(error => {
        console.log('Une erreur s\'est produite lors de l\'envoi du SMS :', error);
        throw error;
    });
}

module.exports = { sendSMS };