const { generateJwtToken } = require("../helpers");
const Need = require("../models/Need");
const School = require("../models/School");
const Student = require("../models/Student");

exports.addItem = (req, res) => {
    const { _id } = req.user;
    const {   itemName, 
            studentName, 
            cost,
            description,
            studentImage, 
            itemImage
        } = req.body;

        const _need = new Need({
            itemName, 
            studentName, 
            cost, 
            description,
            studentImage, 
            itemImage,
            _school: _id 
        })
  
      _need.save((error, need) => {
          if (error) {
            return res.status(400).json({
              error,
              message: "Something went wrong",
            });
          }
  
          if(need){
              return res.status(201).json({
                success: true,
                message: "Item added successfully"
              });
          }
      });
};


exports.editItem = (req, res) =>{
    const { _id } = req.query;
    const {
        itemName, 
        studentName, 
        cost, 
        description,
        studentImage, 
        itemImage
    } = req.body;

    const updates = {
        itemName, 
        studentName, 
        cost, 
        description,
        studentImage, 
        itemImage
    };
    

    Need.findOneAndUpdate(
        { _id }, 
        { $set: updates },
        { returnOriginal: false },
        (err, need)=>{
            if(err){
                return res.status(400).json({
                    err,
                    message: "Something went wrong",
                });
            }

            if(need){
                return res.status(201).json({
                    success: true,
                    item: need,  
                    message: "Updated"
                });
            }
        }
    )
  }


exports.removeItems = (req, res) => {
    const { _ids } = req.body;
    Need.deleteMany({_id: {
        $in:_ids
    }}, (err, response)=>{
        if(err){
            return res.status(400).json({
                err,
                message: "Something went wrong",
              });
        }
        if(response.acknowledged){
            return res.send({
                success: true,
                message: "Deleted successfully"
            })
        }
    })
}

exports.getItems = async(req, res) => {
    const { _id } = req.user;
    const needs = await Need.find({ _school: _id, status: "UNPAID" });
    const paids = await Need.find({ _school: _id, status: "PAID" });
    
    return res.send({
        needs,
        paids
    });
}

exports.fetchItem = async(req, res) => {
    const { _id } = req.query;
    const item = await Need.findOne({ _id });
    return res.send(item);
}

exports.getStudents = async(req, res) => {
    const { _id } = req.user;
    const students = await Student.find({ _school: _id });
    return res.send(students);
}


exports.getSchools = async(req, res) => {
    // const { _id } = req.user;
    const schools = await School.find({ });
    return res.send(schools.reverse());
};

exports.getApprovedSchools = async(req, res) => {
    // const { _id } = req.user;
    const schools = await School.find({ status: "APPROVED" });
    return res.send(schools.reverse());
};

exports.profile = async(req, res) => {
    const { _id } = req.user;
    const { firstName, 
            lastName, 
            phoneNumber,
            image,
            accountName,
            accountNumber,
            bankName,
            routingNumber
         } = req.body;

    const updates = {
        firstName, 
        lastName, 
        phoneNumber,
        image,
        accountName,
        accountNumber,
        bankName,
        routingNumber
    };

    School.findOneAndUpdate(
        { _id }, 
        { $set: updates },
        { returnOriginal: false },
        (err, school)=>{
            if(err){
                return res.status(400).json({
                    err,
                    message: "Something went wrong",
                });
            }

            if(school){

                const { _id, 
                    firstName, 
                    lastName, 
                    email, 
                    phoneNumber, 
                    image, 
                    status,
                    accountName,
                    accountNumber,
                    bankName,
                    routingNumber } = school;
                const token = generateJwtToken(_id, email);
                    return res.status(201).json({
                    success: true,
                    token,
                    status,
                    role: "AUTHOR",
                    info: { 
                        _id, 
                        firstName, 
                        lastName, 
                        email, 
                        phoneNumber, 
                        image, 
                        status,
                        accountName,
                        accountNumber,
                        bankName,
                        routingNumber 
                    },
                    message: "Profile updated"
                });
            }
        }
    )
}


exports.schoolsGroup = async(req, res) => {
    const schools = await School.aggregate([
        { 
            $group: { 
                _id: "$status", 
                items: { $push: "$$ROOT" }
            }
        }
    ]);

    res.send(schools);
};