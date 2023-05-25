const adb = require('adbkit');
const client = adb.createClient();
var Promise = require('bluebird')

const checkDeviceStatus = async (deviceId) => {
  const device = await client.getDevice(deviceId);
  const state = await device.getState();

  if (state === 'device') {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('Le périphérique n\'est pas prêt.'));
  }
};

async function sendSMS(deviceSerial, phoneNumber, message) {
    try {
      const path = await client.getDevicePath(deviceSerial);
      if (path) {
        await client.shell(path, `am start -a android.intent.action.SENDTO -d sms:${phoneNumber} --es sms_body "${message}"`);
        console.log('SMS envoyé avec succès !');
      } else {
        console.error('Impossible d\'obtenir le chemin de l\'appareil.');
      }
    } catch (err) {
      console.error('Erreur lors de l\'envoi du SMS :', err);
    }
  }



  


module.exports = {
    sendSMS
};
