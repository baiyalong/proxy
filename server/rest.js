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
            username: username,
            pin: pin,
            url: file.url()
        };
    }
});
