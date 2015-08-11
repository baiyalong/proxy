/**
 * Created by bai on 2015/8/11.
 */

Certs = new FS.Collection('certs', {
    stores: [new FS.Store.GridFS('certs', {})]
});


Records = new Mongo.Collection('records');