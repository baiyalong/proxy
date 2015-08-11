/**
 * Created by bai on 2015/8/4.
 */

Template.user.helpers({
    title: '用户管理',
    users: function () {
        return Meteor.users.find();
    }
});

Template.user.events({
    'click #save': function (event, template) {
        var user = {
            username: $('#username').val(),
            password: $('#password').val()
        }
        var id = $('#topic').attr('_id');
        if (!id) {
            Meteor.call('newUser', user, function (err, res) {
                if (err)alert(err);
                else
                    Materialize.toast(' 添加成功！', 4000)
            });
        } else {
            user._id = id;
            Meteor.call('editUser', user, function (err, res) {
                if (err)alert(err);
                else
                    Materialize.toast(' 修改成功！', 4000)
            });
        }

    },
    'click .add': function (event, template) {
        $('#topic').text('添加用户');
        $('#topic').attr('_id', null);
        $('#username').val('');
        $('#username').attr('disabled', false);
        $('#password').val('');
    },
    'click .edit': function () {
        $('#topic').text('修改用户');
        $('#topic').attr('_id', this._id);
        $('#username').val(this.username);
        $('#username').attr('disabled', true);
        $('#password').val('');
        $('#modal1').openModal();
    },
    'click .remove': function () {
        Meteor.call('deleteUser', this._id, function (err, res) {
            if (err)alert(err);
            else
                Materialize.toast(' 删除成功！', 4000)
        });
    }
});

Template.user.onCreated(function () {
    Meteor.subscribe('users');
});

Template.user.onRendered(function () {
    $('select').material_select();
    $('.modal-trigger').leanModal();
});