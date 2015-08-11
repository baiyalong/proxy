/**
 * Created by bai on 2015/8/4.



 Meteor.users.attachSchema(new SimpleSchema({
    username: {
        type: String,

    },
    password: {
        type: String,
        optional:true
    },
    roles:{
        type:[String],
        optional:true
    }
}));



 Meteor.users.allow({
    remove: function () {
        return true
    },
    update: function () {
        return true
    }
})

 Meteor.roles.allow({
    remove: function () {
        return true
    },
    update: function () {
        return true
    }
})

 */


Meteor.publish("users", function () {
    return Meteor.users.find({}, {
        fields: {
            services: false
        }
    });
});

Meteor.methods({
    newUser: function (user) {
        var userId = Accounts.createUser(user);
    },
    deleteUser: function (id) {
        Meteor.users.remove({_id: id});
    },
    editUser: function (user) {
        Accounts.setPassword(user._id, user.password);
    }
});