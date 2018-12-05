const baseModel = require('./base_model')

async function sendMessage(res, data) {
    await res.send({ status: "Success", data });
}

async function errorMessage(res, message) {
    await res.status(500).send({ message });
}

class baseController {
    static async signup(req, res) {
        await baseModel.signup(req.params.username, req.params.password);
        await sendMessage(res);
    }
    static async login(req, res) {
        const user = await baseModel.login(req.params.username, req.params.password);
        if (user.length !== 1) {
            await errorMessage(res, 'wrong user/password');
        }
        req.session.connected = 1;
        req.session.user = user[0];
        await sendMessage(res);
    }
    static async newExpense(req, res) {
        user_id_list = req.params.users
        let group = await baseModel.getGroups(user_id_list)
        let group_id = (group.length === 1) ? group[0] : null; 
        if (group.length === 0) {
            group_id = await baseModel.newGroup(user_id_list.length)
            for (let i = 0; i < user_id_list.length; i++) {
                await baseModel.newGroupsUsers(group_id, user_id_list[i]);
            }
        }
        await baseModel.newExpense(
            req.session.user.id,
            req.params.amount,
            group_id);
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