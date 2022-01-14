code = 'c78be457-1e1c-49ec-9271-4dc05b3da335';

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
  qrcode(code);
});
