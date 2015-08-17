/**
 * Created by bai on 2015/8/17.
 */

var setting = JSON.parse(Assets.getText("setting.json"));

var getResFromXML = function (xml, tag) {
    return xml.substring(xml.indexOf(tag) + tag.length, xml.indexOf(tag.replace('<', '</')));
}
var call_RA_CertApply = function (req) {
    var xml = "<body><paperType></paperType><paperNum></paperNum><userName>username</userName><certPasscode>pin</certPasscode></body>";
    var message = xml.replace('username', req.username).replace('pin', req.pin);
    var addr = setting.RA_CertApply_Addr;
    var query = setting.RA_CertApply_Param + '=' + message;
    var method = setting.RA_CertApply_Method;
    var result = HTTP.call(method, addr + '?' + query, {
        npmRequestOptions: {rejectUnauthorized: false},
    });

    console.log(result)

    var resp = {};
    if (result != null && result.statusCode == 200) {
        var content = result.content;
        resp.code = getResFromXML(content, '<resultCode>');
        if (resp.code == '1') {
            resp.cert = getResFromXML(content, '<cert>');
            resp.certSN = getResFromXML(content, '<certSN>');
        } else {
            resp.errorDesc = getResFromXML(content, '<errorDesc>');
        }
    }

    return resp;
}


var cert = call_RA_CertApply({username: 'guogaolei', pin: '123'})

console.log(cert)