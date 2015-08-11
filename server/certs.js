/**
 * Created by bai on 2015/8/4.
 */



Meteor.publish("getCerts", function (limit) {
    if (limit > Records.find().count()) {
        limit = 0;
    }
    return Certs.find({}, {limit: limit});
});

Meteor.methods({
    checkCert: function (username) {
        return Certs.findOne({
            $query: {'metadata.username': username}
        })
    }
})

Certs.allow({
    insert: function () {
        return true;
    },
    download: function () {
        return true;
    },
    remove: function () {
        return true;
    },
    update: function () {
        return true;
    }
})