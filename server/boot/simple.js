module.exports = function(app) {
    console.log("in");
    app.dataSources.mysql.autoupdate('expense', function(err) {
        if (err) throw err
    });
    app.dataSources.mysql.autoupdate('comment', function(err) {
        if (err) throw err
    });
    app.dataSources.mysql.autoupdate('group', function(err) {
        if (err) throw err
    });
    app.dataSources.mysql.autoupdate('group_user', function(err) {
        if (err) throw err
    });
    app.dataSources.mysql.autoupdate('User', function(err) {
        if (err) throw err
    });
    app.dataSources.mysql.autoupdate('AccessToken', function(err) {
        if (err) throw err
    });
    app.dataSources.mysql.autoupdate('ACL', function(err) {
        if (err) throw err
    });
    app.dataSources.mysql.autoupdate('RoleMapping', function(err) {
        if (err) throw err
    });
    app.dataSources.mysql.autoupdate('Role', function(err) {
        if (err) throw err
    });
}