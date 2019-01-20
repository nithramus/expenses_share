'use strict';

module.exports = function(Group) {
    Group.createNew = async (options) => {
       const obj = await Group.find({ include: "groupUsers", where: { user_id: options.accessToken.userId } })
       console.log(obj)
        return obj
    }
    Group.remoteMethod(
        'createNew',
        {
            http: {path: '/', verb: 'get'},
            accepts: [
                {arg: "options", type: "object", http: "optionsFromRequest"}
            ],
            returns: {arg: 'groups', type: 'string'}
        }
    );


    Group.newExpense = async (data, options) => {
        console.log(data.users, data.about);
        // console.log(Group.app.models.group_user);
        data.users.push(options.accessToken.userId);
        let group = await Group.find({ include: "groupUsers", where: { user_id: {in: [data.users]}, size: data.users.length } })
        if (group.length === 0) {
            group = await Group.create({
                size: data.users.length
            });
            for (let i = 0; i < data.users.length; i++) {
                await Group.app.models.GroupUser.create({
                    user_id: data.users[i],
                    group_id: group.id
                });
            }
        }
        else {
            group = group[0];
        }
        const expense = await Group.app.models.expense.create({
            amount: data.amount,
            about: data.about,
            groupId: group.id
        });
        return [ expense, group.id, data.users ]
    }

    Group.remoteMethod(
        'newExpense',
        {
            http: {path: '/newExpense', verb: 'post'},
            accepts: [
                {arg: 'data', type: 'object', required: true, http: { source: 'body' } },
                // {arg: 'amount', type: "number", required: true},
                // {arg: 'about', type: "string", required: true,  http: { source: 'query' }},
                {arg: "options", type: "object", http: "optionsFromRequest"}
            ],  
            returns: [
                { arg: "expense", type:'object' },
                {arg: 'groupId', type: "number"},
                {arg: 'users', type: ['number']},
            ]
        }
    );

    // Group.observe('access', async(ctx) => {
    //     console.log("access");
    //     console.log(ctx.query);
    //     ctx.query.where = Object.assign(ctw.query.where, { user_id: ctx.options.accessToken.userId })
    // });

    Group.disableRemoteMethod('__create__groupUsers', false);
    Group.disableRemoteMethod('__upsert__groupUsers', false);
    Group.disableRemoteMethod('__delete__groupUsers', false);
    Group.disableRemoteMethod('__destroyById__groupUsers', false);
    Group.disableRemoteMethod('__updateAll__groupUsers', false);
    Group.disableRemoteMethod('__updateById__groupUsers', false);
    Group.disableRemoteMethod('____groupUsers', false);


};
