// code = 'c78be457-1e1c-49ec-9271-4dc05b3da335';
var arrayCode = ['c78be457-1e1c-49ec-9271-4dc05b3da335', 'aa4fddf5-fe6f-4036-ae87-c16f4439d81c', '451c5279-f4ff-4b27-ab6c-d1d13044a67a', 'af1b5fdd-3293-4f4c-bb38-a1890c882512', 'a03917bc-811d-42a4-9796-5ff4eeb8940c', '123456789']

var randomCode = arrayCode[Math.floor(Math.random()*arrayCode.length)];

const qrcode = (code) => {
  console.log(code);
  new QRCode(document.getElementById('qrcode'), {
    text: code,
    width: 150,
    height: 150,
    colorDark: '#282829',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
    image: 'Logo.png',
  });
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM geladen');
  qrcode(randomCode);
});
