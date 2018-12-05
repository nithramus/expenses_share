const baseModel = require('./base_model')

async function sendMessage(res, data) {
    await res.send({ status: "Success", data });
}

async function errorMessage(res, message) {
    await res.status(500).send({ message });
}

class baseController {
    static async signup(req, res) {
        await baseModel.signup(req.body.username, req.body.password);
        await sendMessage(res);
    }

    static async login(req, res) {
        const user = await baseModel.login(req.body.username, req.body.password);
        if (user.length !== 1) {
            return await errorMessage(res, 'wrong user/password');
        }
        req.session.connected = 1;
        req.session.user = user[0];
        await sendMessage(res);
    }

    static async searchUsers(req, res) {
        const users = await baseModel.searchUsers(req.query.username);
        await sendMessage(res, users);
    }

    static async newExpense(req, res) {
        let user_id_list = req.body.users;
        if (!user_id_list.includes(req.session.user.id)) {
            user_id_list.push(req.session.user.id);
        }
        let group = await baseModel.getGroups(user_id_list);
        console.log(group);
        let group_id = (group.length === 1) ? group[0] : null;
        if (group.length === 0) {
            console.log('creation du group')
            group_id = await baseModel.newGroup(user_id_list.length)
            for (let i = 0; i < user_id_list.length; i++) {
                await baseModel.newGroupsUsers(group_id, user_id_list[i]);
            }
        }
        await baseModel.newExpense(
            req.session.user.id,
            req.body.amount,
            group_id,
            req.body.about);
        await sendMessage(res);
    }
    static async getExpenses(req, res) {
        const expenses = await baseModel.getExpenses(req.session.user.id);
        await sendMessage(res, expenses);
    }
    static async deleteExpenses(req, res) {

    }
    static async getGroups(req, res) {
        const groups = await baseModel.getGroups(req.session.user.id);
        await sendMessage(res, groups);
    }
}

module.exports = baseController