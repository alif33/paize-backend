const Student = require("../models/Student");
const { generateJwtToken } = require("../helpers");
const Need = require("../models/Need");

exports.permission = async(req, res) => {
    const { _id, status } = req.query;
  
    const update = await Student.updateOne(
        { _id }, 
        { $set: { "status": status.toUpperCase() } }
      )
  
    if(update.modifiedCount){
        res.send({
            success: true,
            message: `Successfully ${status}`
        })
    }
  
}

exports.getItems = async(req, res) => {
    const { _id } = req.user;
    const { _school, status } = req.query;
    const actives = await Need.find({ _school, status });
    const paids = await Need.find({ _school, status: "PAID", student: _id });

    return res.send({
        actives,
        paids
    });  
}


exports.profile = async(req, res) => {
    const { _id } = req.user;
    const { 
            firstName, 
            lastName, 
            phoneNumber,
            image
         } = req.body;

    const updates = {
        firstName, 
        lastName, 
        phoneNumber,
        image
    };

    Student.findOneAndUpdate(
        { _id }, 
        { $set: updates },
        { returnOriginal: false },
        (err, student)=>{
            if(err){
                return res.status(400).json({
                    err,
                    message: "Something went wrong",
                });
            }

            if(student){
                
                const { _id, firstName, lastName, email, phoneNumber, image, status } = student;
                const token = generateJwtToken(_id, email);
                  return res.status(201).json({
                    success: true,
                    token,
                    status,
                    role: "STUDENT",
                    info: { _id, firstName, lastName, email, phoneNumber, image, status },
                    message: "Profile updated"
                  });
            }
        }
    )
}