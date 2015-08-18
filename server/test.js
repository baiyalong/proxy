/**
 * Created by bai on 2015/8/13.

 var words = "hello word!";
 console.log('words ', words)

 var enc = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(words));
 console.log('enc ', enc)

 var dec = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(enc));
 console.log('dec ', dec)

 /*
 var password = 'github';

 openssl.exec('genrsa', {des3: true, passout: 'pass:' + password, '2048': false}, function (err, buffer) {
 console.log(buffer.toString());
 });



var base64 = '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'

var b = new Buffer(base64, 'base64');


var newFile = new FS.File();
newFile.metadata = {
    username: 'username',
    pin: 'pin',
    certSN: 'certSN'
};
newFile.attachData(b, {type: 'application/pkcs-12'});
newFile.name('certSN.p12');
var res = Certs.insert(newFile)


console.log(res._id)

 */