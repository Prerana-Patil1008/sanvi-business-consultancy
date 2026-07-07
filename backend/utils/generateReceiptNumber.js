const Payment = require("../models/Payment");

module.exports = async () => {

    const today = new Date();

    const y = today.getFullYear();

    const m = String(
        today.getMonth()+1
    ).padStart(2,"0");

    const d = String(
        today.getDate()
    ).padStart(2,"0");

    const prefix =
    `RCPT-${y}${m}${d}`;

    const count =
    await Payment.countDocuments({

        receiptNumber:{
            $regex:`^${prefix}`
        }

    });

    return `${prefix}${String(count+1).padStart(4,"0")}`;

};