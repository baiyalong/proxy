/**
 * Created by bai on 2015/8/4.
 */

Records.attachSchema(new SimpleSchema({
    username: {
        type: String,
        label: "用户名",
    },
    pin: {
        type: String,
        label: 'PIN码'
    },
    apiname: {
        type: String,
        label: '接口名称'
    },
    res: {
        type: String,
        label: "结果"
    },
    timeStamp: {
        label: '时间戳',
        type: Date
    },
    timeInterval: {
        label: '时间间隔',
        type: Number
    }
}));


Meteor.publish("records", function (limit) {
    if (limit > Records.find().count()) {
        limit = 0;
    }
    return Records.find({}, {limit: limit});
});

Records.allow({
    insert: function () {
        return true
    }
})