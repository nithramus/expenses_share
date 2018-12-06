const express = require('express');
const router = express.Router();
const baseAppController = require('./base_controller');
// signup
/**
 * @api {post} /login
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
 * @api {post} /signup
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
 * @api {post} /expense
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
            "id": 3,
            "spender_id": 4,
            "group_id": 1,
            "amount": 50,
            "about": "ta maman",
            "comments": [
                {
                    "content": "test",
                    "user_id": 4
                }
            ]
        },
        {
            "id": 4,
            "spender_id": 4,
            "group_id": 2,
            "amount": 50,
            "about": "ta maman",
            "comments": [
                null
            ]
        }
    ]
}
*/
router.get('/expenses', baseAppController.getExpenses);
/**
 * @api {get} /groups
 * @apiName GetGroups
 * @apiGroup Groups
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *   {
    "status": "Success",
    "data": [
        {
            "id": 1,
            "users": [
                {
                    "id": 1,
                    "username": "jean-pierre"
                },
                {
                    "id": 2,
                    "username": "jean-pierre2"
                }
            ]
        },
        {
            "id": 2,
            "users": [
                {
                    "id": 3,
                    "username": "jean-pierre3"
                },
                {
                    "id": 4,
                    "username": "jean-michel"
                }
            ]
        }
    ]
}
*/

router.get('/groups', baseAppController.getMyGroups);
/**
 * @api {post} /expense/:expenseId/comment
 * @apiName PostComment
 * @apiGroup Comments
 * 
 * @apiParam {Integer} expenseId expenseId
 * @apiParam {String} Content content
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *        "ok"
 */
router.post('/expense/:expenseId/comment', baseAppController.setComment);



// router.delete('/expenses', baseAppController.deleteExpenses);
module.exports = router;