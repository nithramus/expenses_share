const knex = require('../utils/knex.utils');

class baseModel {
    static async signup(username, password) {
        await knex('users').insert({
            username,
            password
        })
    }

    static async login(username, password) {
        const user = await knex('users').where({
            username,
            password
        });
        return user
    }

    static async searchUsers(username) {
        const users = await knex('users').where("username", "LIKE", `%${username}%`).limit(20);
        return users;
    }

    static async getGroups(user_id_list) {
        const group = await knex.raw(`SELECT * FROM groups WHERE EXIST (SELECT * FROM groups_users WHERE groups_users.group_id = groups.id WHERE groups_users.user_id IN (${user_id_list})`);
        return group;
    }

    static async newExpense(creator, amount, group, about, created_ad = knex.now()) {
        await knex('expenses').insert({
            creator,
            amount,
            group,
            about,
            created_ad
        });
    }

    static async getExpenses(user_id) {
        const expenses = await knex('expenses')
            .innerJoin('groups_users', 'groups_users.id', 'expenses.group_id')
            .where('groups_users.user_id', user_id);
        return expenses;
    }
    
    static async newGroup(size) {
        await knex('groups').insert({
            size
        }).returning('id');
    }


    static async newGroupsUsers(group_id, user_id) {
        await knex('groups_users').insert({
            group_id,
            user_id
        });
    }

}

module.exports = baseModel;