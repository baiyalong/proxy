/**
 * Created by bai on 2015/8/4.
 */

Template.record.helpers({
    title: '�ӿ���־',
    records: function () {
        return Records.find({}, {limit: Session.get('limit')});
    }
});

Template.record.events({});

Template.record.onCreated(function () {
    Session.setDefault('limit', 10);

    Tracker.autorun(function () {
        Meteor.subscribe('getRecord', Session.get('limit'));
    });
});

Template.record.onRendered(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            newLimit = Session.get('limit') + 10;
            Session.set('limit', newLimit);
        }
    });
});