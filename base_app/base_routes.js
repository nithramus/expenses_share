const express = require('express');
const router = express.Router();
const baseAppController = require('./base_controller');
// signup
/**
 * @api {get} /login
 * @apiName loginUser
 * @apiGroup User
 * 
 * @apiParam {String} username username
 * @apiParam {String} password password
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *        "ok"
 */
router.post('/signup', baseAppController.signup);
/**
 * @api {get} /signup
 * @apiName signupUser
 * @apiGroup User
 * 
 * @apiParam {String} username username
 * @apiParam {String} password password
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *        "ok"
 */

router.post('/login', baseAppController.login);
/**
 * @api {get} /search/users
 * @apiName searchUsers
 * @apiGroup User
 * 
 * @apiParam {String} username username
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *        {
    "status": "Success",
    "data": [
        {
            "id": 6,
            "username": "jean-pierre"
        }
    ]
}
 */
router.get('/search/users', baseAppController.searchUsers);

/**
 * @api {get} /expense
 * @apiName expense
 * @apiGroup Expenses
 * 
 * @apiParam {Integer} amount amount
 * @apiParam [Integers] users array of users ids
 * @apiParam {String} about about the paiement
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *        "ok"
 */



router.post('/expense', baseAppController.newExpense);
/**
 * @api {get} /expenses
 * @apiName expenses
 * @apiGroup Expenses
 * 
 * @apiParam {Integer} amount amount
 * @apiParam [Integers] users array of users ids
 * @apiParam {String} about about the paiement
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *   {
    "status": "Success",
    "data": [
        {
            "id": 4,
            "spender_id": 5,
            "group_id": 2,
            "amount": 50,
            "about": "ta maman",
            "created_at": "2018-12-05T12:28:47.000Z",
            "user_id": 5
        },
    ]
}
*/
router.get('/expenses', baseAppController.getExpenses);



// get groups
router.get('/groups', baseAppController.getGroups);

router.delete('/expenses', baseAppController.deleteExpenses);
module.exports = router;