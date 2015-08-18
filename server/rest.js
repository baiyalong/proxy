/**
 * Created by bai on 2015/8/3.
 */

var api = new Restivus({
    apiPath: 'api/',
    prettyJson: true,
    useDefaultAuth: true
});

api.addRoute('certApply', {
    post: function () {
        var req = {
            username: this.bodyParams.username,
            pin: this.bodyParams.pin
        }

        if (req.username === undefined || req.pin === undefined)
            return {
                code: 103,
                description: '参数解析错误',
                certSN: '',
                certUrl: ''
            }

        var file = undefined;
        try {
            file = Certs.findOne({
                $query: {'metadata.username': req.username}
            })
        } catch (err) {
            return {
                code: 201,
                description: err.message,
                certSN: '',
                certUrl: ''
            }
        }

        if (file != undefined && file.metadata.pin != req.pin)
            return {
                code: 104,
                description: 'PIN码错误',
                certSN: '',
                certUrl: ''
            }

        if (file != undefined)
            return {
                code: 0,
                description: "申请成功(服务器证书副本)",
                certSN: file.metadata.certSN,
                certUrl: file.url()
            };

        if (file === undefined) {
            var resp = null;
            try {
                resp = call_RA_CertApply(req);
            } catch (err) {
                return {
                    code: 202,
                    description: err.message,
                    certSN: '',
                    certUrl: ''
                }
            }
            if (resp.code == '1') {
                var res = null;
                try {
                    var buffer = new Buffer(resp.cert, 'base64');
                    var newFile = new FS.File();
                    newFile.metadata = {
                        username: req.username,
                        pin: req.pin,
                        certSN: resp.certSN
                    };
                    newFile.attachData(buffer, {type: 'application/pkcs-12'});
                    newFile.name(resp.certSN + '.p12');
                    res = Certs.insert(newFile)
                } catch (err) {
                    return {
                        code: 203,
                        description: err.message,
                        certSN: '',
                        certUrl: ''
                    }
                }
                return {
                    code: 0,
                    description: "申请成功(同步向RA申请)",
                    certSN: resp.certSN,
                    certUrl: '/cfs/files/certs/' + res._id + '/' + resp.certSN + '.p12'
                }
            } else if (resp.code == '2176') {
                return {
                    code: 101,
                    description: "该用户没有权限",
                    certSN: '',
                    certUrl: ''
                }
            } else {
                return {
                    code: 102,
                    description: "RA其他错误",
                    certSN: '',
                    certUrl: ''
                }
            }
        }
    }
});


api.addRoute('certStatus', {
    post: function () {
        var req = {
            username: this.bodyParams.username,
            certSN: this.bodyParams.certSN
        };

        if (req.username === undefined || req.certSN === undefined)
            return {
                code: 104,
                description: '参数解析错误'
            }

        var file = undefined;
        try {
            file = Certs.findOne({
                $query: {'metadata.username': req.username}
            })
        } catch (err) {
            return {
                code: 201,
                description: err.message
            }
        }

        if (file === undefined)
            return {
                code: 101,
                description: '没有该用户的证书'
            }

        if (file.metadata.certSN != req.certSN)
            return {
                code: 102,
                description: '证书序号不一致'
            }

        //TODO  103 证书过期

        return {
            code: 0,
            description: "状态正常"
        };
    }
})
;
