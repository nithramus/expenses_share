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
        const users = await knex('users')
            .where("username", "LIKE", `%${username}%`)
            .limit(20)
            .select(['id', 'username']);
        return users;
    }

    static async getGroups(user_id_list) {
        console.log({user_id_list})
        const group = await knex.raw(`SELECT * FROM groups WHERE groups.size = (SELECT COUNT(id) FROM groups_users WHERE groups_users.group_id = groups.id AND groups_users.user_id IN (${user_id_list}))`);
        console.log({group});
        if (group && group[0].length === 0) return [];
        return group[0][0].id;
    }

    static async newExpense(spender_id, amount, group_id, about, created_at = knex.fn.now()) {
        await knex('expenses').insert({
            spender_id,
            amount,
            group_id,
            about,
            created_at
        });
    }

    static async getExpenses(user_id) {
        const expenses = await knex('expenses')
            .innerJoin('groups_users', 'groups_users.id', 'expenses.group_id')
            .where('groups_users.user_id', user_id);
        return expenses;
    }
    
    static async newGroup(size) {
        const id = await knex('groups').insert({
            size
        }).returning('id');
        console.log({ id });
        return id[0];
    }


    static async newGroupsUsers(group_id, user_id) {
        await knex('groups_users').insert({
            group_id,
            user_id
        });
    }

}

module.exports = baseModel;