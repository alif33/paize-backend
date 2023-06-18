const Need = require("../models/Need");
const School = require("../models/School");
const Student = require("../models/Student");
const Payment = require("../models/Payment");
const Stripe = require('stripe')(process.env.SECRET_KEY);


exports._Payment = async(req, res) => {
  const { _id } = req.query;
  // return res.send(_id);
  const payment = await Payment.findOne({ _id })
                .populate("needs", { Need })
                .populate("student", { Student })
                .populate("school", { School });
    return res.send(payment);
}

exports.PaymentsByStudent = async(req, res) => {
  const { _id } = req.user;
  const payments = await Payment
                .find({ student: _id })
                  .populate("needs", { Need })
                  .populate("student", { Student })
                  .populate("school", { School });
            return res.send(payments);
}

exports.PaymentsInSchool = async(req, res) => {
  const { _id } = req.user;
  const payments = await Payment
        .find({ school: _id })
          .populate("needs", { Need })
          .populate("student", { Student })
          .populate("school", { School });
        return res.send(payments);
}

exports._Payments = async(req, res) => {
  const { _id } = req.user;
  const payments = await Payment
        .find({})
          .populate("needs", { Need })
          .populate("student", { Student })
          .populate("school", { School });
        return res.send(payments);
}


exports.makePayment = (req, res) => {
    const { _id } = req.user;
    const { 
            _stripe,
            amount, 
            needs, 
            school
        } = req.body;
    const { id, email, card } = _stripe;

    Need.updateMany(
      {_id: { $in: needs }}, 
      { $set: { status: "PAID", student: _id }},
      {multi: true},
      function(err, _needs){
        if (err) {
            return false;
        }
        const _payment = new Payment({
          amount,
          school,
          needs,
          student: _id
        })

        _payment.save((error, payment) => {
          if (error) {
            return res.status(400).json({
              error,
              message: "Something went wrong",
            });
          }
  
          if(payment){
              return res.status(201).json({
                success: true,
                _id: payment._id, 
                message: "Paid successfully"
              });
          }
        });
      }  
    )
};


