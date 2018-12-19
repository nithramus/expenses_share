'use strict';

module.exports = function(Expense) {
    Expense.observe('access', async (ctx) => {
        console.log('expense access')
    })
};
