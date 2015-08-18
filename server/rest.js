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
        var username = this.bodyParams.username;
        var pin = this.bodyParams.pin;

        var file = Certs.findOne({
            $query: {'metadata.username': username}
        })

        return {
            code: 0,
            description: "申请成功",
            certSN: "0000001",
            certUrl: file.url()
        };
    }
});


api.addRoute('certStatus', {
    post: function () {
        var username = this.bodyParams.username;
        var certSN = this.bodyParams.certSN;

        var file = Certs.findOne({
            $query: {'metadata.username': username}
        })

        return {
            code: 0,
            description: "状态正常"
        };
    }
});
