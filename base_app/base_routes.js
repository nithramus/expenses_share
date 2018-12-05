const express = require('express');
const router = express.Router();
const baseAppController = require('./base_controller');
// signup
router.post('/signup', baseAppController.signup);
// login
router.post('/login', baseAppController.login);

// add expense
router.post('/expense', baseAppController.newExpense);
// get depenses
router.get('/expenses', baseAppController.getExpenses);

// delete depenses
router.delete('/expenses', baseAppController.deleteExpenses);

// search users
router.get('/search/users', baseAppController.searchUsers);

// get groups
router.get('/groups', baseAppController.getGroups);