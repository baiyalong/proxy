/**
 * Created by bai on 2015/8/4.
 */

Records.attachSchema(new SimpleSchema({
    username: {
        type: String,
        label: "�û���",
    },
    pin: {
        type: String,
        label: 'PIN��'
    },
    apiname: {
        type: String,
        label: '�ӿ�����'
    },
    res: {
        type: String,
        label: "���"
    },
    timeStamp: {
        label: 'ʱ���',
        type: Date
    },
    timeInterval: {
        label: 'ʱ����',
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