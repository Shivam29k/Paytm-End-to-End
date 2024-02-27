const express = require('express');
const mongoose =  require('mongoose');
const { Account } = require('../db');
const { authMiddleware } = require('../middleware/middleware');

const router  = express.Router();

router.get('/balance', authMiddleware, async (req, res)=>{
    const account  = await Account.findOne({
        userID: req.userID 
    })

    res.status(200).json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res)=>{

    console.log("authenticated");

    const session = await mongoose.startSession();

    const {amount, receiverID} = req.body;
    console.log(amount, receiverID);

    session.startTransaction();

    // fetching the accounts within the transaction.
    const fromAccount = await Account.findOne({userID: req.userID}).session(session);
    console.log(fromAccount);
    if (!fromAccount) {
        return res.status(400).json({
            message: "Internal server error in fetching account."
        });
    }
    if (fromAccount.balance < amount) {
        return res.status(400).json({
            message: "Insufficient Balance."
        });
    }

    const toAccount = await Account.findOne({userID: receiverID}).session(session);
    console.log(toAccount);
    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid Account."
        });
    }

    // performing trtanscations 
    await Account.updateOne({ userID: req.userID },{ $inc: { balance: -amount}}).session(session);
    await Account.updateOne({ userID: receiverID },{ $inc: { balance: amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transaction successful"
    })
    
})

module.exports = router;