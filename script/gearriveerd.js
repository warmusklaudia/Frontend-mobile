let btnKleedkamer, btnSportscube

const options = {
    keepalive: 60,
    clean: true,
    rejectUnauthorized: false,
    checkServerIdentity: false
}
  
const client = mqtt.connect("mqtt://13.81.105.139", options);

function sendMessage(){
    client.publish("F2B/locatie", JSON.stringify({ status: 'gearriveerd' }));
}

document.addEventListener("DOMContentLoaded", function(){
  console.log("DOMContent loaded");

  sendMessage();
})