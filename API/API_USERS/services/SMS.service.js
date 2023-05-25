const adb = require('adbkit');
const client = adb.createClient();

async function sendSMS(phoneNumber, message) {
  try {
    const devices = await client.listDevices();
    
    if (devices.length > 0) {
      const device = devices[0]; // Utilisez le premier périphérique de la liste

      const deviceId = device.id;

      const path = await client.getDevicePath(deviceId);
      if (path) {
        await client.shell(deviceId, `am start -a android.intent.action.SENDTO -d sms:${phoneNumber} --es sms_body "${message}"`);
        console.log('SMS envoyé avec succès !');
      } else {
        console.error('Impossible d\'obtenir le chemin de l\'appareil.');
      }
    } else {
      console.error('Aucun appareil Android n\'est connecté.');
    }
  } catch (err) {
    console.error('Erreur lors de l\'envoi du SMS :', err);
  }
}

module.exports = {sendSMS};

