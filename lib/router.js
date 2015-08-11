/**
 * Created by bai on 2015/8/11.
 */

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'login'});
Router.route('/user');
Router.route('/cert');
Router.route('/record');



Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
        this.render('login');
    } else {
        this.next();
    }
});