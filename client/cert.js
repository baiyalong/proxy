/**
 * Created by bai on 2015/8/4.
 */

Template.cert.helpers({
    title: '证书管理',
    certs: function () {
        return Certs.find({}, {limit: Session.get('limit')});
    },
    getPath: function (url) {
        return url.substring(0, url.indexOf('?'));
    }
});

Template.cert.events({
    'change input:file': function (event, template) {
        var file = event.target.files[0];
        fileS = file;
        $('input.file-path').val(file.name);
    },
    'click #save': function () {
        var username = $('#username').val().trim();
        var pin = $('#pin').val().trim();
        var file = fileS;
        var id = $('#topic').attr('_id');

        if (username == '') {
            alert('用户名不能为空！');
            return;
        }
        if (pin == '') {
            alert('PIN码不能为空！');
            return;
        }

        if (!id) {
            if (file == null) {
                alert('证书文件不能为空！');
                return;
            }
            Meteor.call('checkCert', username, function (err, res) {
                if (err)alert(err);
                else {
                    if (res != null) {
                        alert('用户名重复！');
                        return;
                    } else {
                        var newFile = new FS.File(file);
                        newFile.metadata = {
                            username: username,
                            pin: pin
                        };
                        Certs.insert(newFile, function (err, fileObj) {
                            if (err)alert(err);
                            else
                                Materialize.toast(' 添加成功！', 4000)
                            //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                        });
                    }
                }
            });
        } else {
            if (file != null) {
                Certs.remove({_id: id}, function (err) {
                    if (err)alert(err);
                    else {
                        var newFile = new FS.File(file);
                        newFile.metadata = {
                            username: username,
                            pin: pin
                        };
                        Certs.insert(newFile, function (err, fileObj) {
                            if (err)alert(err);
                            else
                                Materialize.toast(' 修改成功！', 4000)
                            //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                        });
                    }
                });
            }
            else {
                Certs.update({_id: id}, {
                    $set: {'metadata.pin': pin}
                }, function (err) {
                    if (err) alert(err);
                    else
                        Materialize.toast(' 修改成功！', 4000)
                });
            }
        }
    },
    'click .add': function () {
        fileS = null;
        $('#username').val('');
        $('#username').attr('disabled', false);
        $('#pin').val('');
        $('#topic').text('添加证书');
        $('#topic').attr('_id', null);
        $('input.file-path').val('');
    },
    'click .edit': function () {
        fileS = null;
        $('#topic').text('修改证书');
        $('#topic').attr('_id', this._id);
        $('#username').val(this.metadata.username);
        $('#username').attr('disabled', true);
        $('#pin').val(this.metadata.pin);
        $('input.file-path').val(this.name());
        $('#modal1').openModal();
    },
    'click .remove': function () {
        Certs.remove({_id: this._id}, function (err) {
            if (err)alert(err);
            else
                Materialize.toast(' 删除成功！', 4000)
        });
    }
});

Template.cert.onCreated(function () {
    Session.setDefault('limit', 10);

    Tracker.autorun(function () {
        Meteor.subscribe('getCerts', Session.get('limit'));
    });

    fileS = null;
});

Template.cert.onRendered(function () {
    $('.modal-trigger').leanModal();
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            newLimit = Session.get('limit') + 10;
            Session.set('limit', newLimit);
        }
    });
});