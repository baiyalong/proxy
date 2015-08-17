/**
 * Created by bai on 2015/8/13.

var words = "hello word!";
console.log('words ', words)

var enc = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(words));
console.log('enc ', enc)

var dec = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(enc));
console.log('dec ', dec)


var password = 'github';

openssl.exec('genrsa', {des3: true, passout: 'pass:' + password, '2048': false}, function (err, buffer) {
    console.log(buffer.toString());
});

*/