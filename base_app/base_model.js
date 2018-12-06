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
        const group = await knex.raw(`SELECT id FROM groups WHERE groups.size = (SELECT COUNT(id) FROM groups_users WHERE groups_users.group_id = groups.id AND groups_users.user_id IN (${user_id_list}))`);
        console.log({group}, group[0].length);
        if (group && group[0].length === 0) return null;
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
        let expenses = await knex.raw(`SELECT expenses.id, spender_id, expenses.group_id, amount, about, (SELECT GROUP_CONCAT(JSON_OBJECT('content', expense_comment.content, 'user_id', expense_comment.user_id)) FROM expense_comment WHERE expense_comment.expense_id = expenses.id) AS comments FROM expenses INNER JOIN groups_users ON groups_users.group_id = expenses.group_id WHERE groups_users.user_id = ${user_id}`);
        expenses = expenses[0];
        expenses.forEach(expense => {
            expense.comments = JSON.parse("[" + expense.comments + "]");
        })
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

    static async getMyGroups(user_id) {
        let groups = await knex('groups_users')
            .select('group_id')
            .where('user_id', user_id);
        console.log(groups);
        groups = groups.map(group => group.group_id);
        return groups;
    }

    static async getUsersOfGroup(groups_list) {
        if (groups_list.length === 0) return [];
        let groups = await knex.raw(`SELECT id, (SELECT GROUP_CONCAT(JSON_OBJECT('username', users.username,'id', users.id)) FROM users INNER JOIN groups_users ON groups_users.user_id = users.id WHERE groups_users.group_id = groups.id ) AS users FROM groups WHERE groups.id IN (${groups_list})`)
        groups = groups[0];
        groups.forEach(group => {
            console.log(group.users);
            group.users = JSON.parse("[" + group.users + "]");
        })
        console.log(groups);
        return groups;
    }

    static async addComment(user_id, expense_id, content) {
        await knex('expense_comment').insert({
            user_id,
            expense_id,
            content
        })
    }
}

module.exports = baseModel;

