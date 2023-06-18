const bcrypt = require("bcrypt");
const { generate } = require("shortid");
const School = require("../models/School");
const Student = require("../models/Student");
const { generateJwtToken } = require("../helpers");
const { sendMail } = require("../utils/Mailer");

exports.enroll = async(req, res) => {

  const { firstName, 
          lastName, 
          email, 
          password, 
          schoolName,
          schoolAddress,
          principleName,
          relation,
          phoneNumber,
          bankName,
          routingNumber,
          accountName,
          accountNumber
        } = req.body;

  const student = await Student.findOne({email});
  if(student){
    return res.status(500).json({
      student,
      message: "Email already registered",
    });
  }

  School.findOne({ email }).exec(async (error, school) => {
    if (school){
      return res.status(500).json({
        error,
        school,
        message: "Email already registered",
      });
    }
    const hash_password = await bcrypt.hash(password, 10);
    const _school = new School({
          firstName,
          lastName, 
          email, 
          userName: generate(),
          password: hash_password, 
          schoolName,
          schoolAddress,
          principleName,
          relation,
          phoneNumber,
          bankName,
          routingNumber,
          accountName,
          accountNumber
    })

    _school.save( async(error, school) => {
        if (error) {
          return res.status(400).json({
            error,
            message: "Something went wrong",
          });
        }

        if(school){
          const { _id, firstName, lastName, email, phoneNumber, status } = school;
          const token = generateJwtToken(_id, email);
            return res.status(201).json({
              success: true,
              token,
              status,
              role: "AUTHOR",
              info: { _id, firstName, lastName, email, phoneNumber },
            });
        }
    })
  });
};


exports.join = async(req, res) => {

  const { firstName, 
          lastName, 
          email, 
          phoneNumber,
          password, 
          _school,
          graduationYear
          
        } = req.body;

  const school = await School.findOne({email});
  if(school){
    return res.status(500).json({
      error,
      message: "Email already registered",
    });
  }

  Student.findOne({ email }).exec(async (error, student) => {
    if (student){
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hash_password = await bcrypt.hash(password, 10);
    const _student = new Student({
      firstName, 
      lastName, 
      userName: generate(),
      email, 
      phoneNumber,
      password: hash_password, 
      _school,
      graduationYear
    })

    _student.save( async(error, student) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
            error
          });
        }

        if(student){
          const { _id, firstName, lastName, email, phoneNumber, status } = student;
          const token = generateJwtToken(_id, email);
            return res.status(201).json({
              success: true,
              token,
              status,
              role: "STUDENT",
              info: { _id, firstName, lastName, email, phoneNumber },
            });
        }
    })

  });
};


exports.profileUpdate = (req, res) =>{
  res.send(req.user);
}


exports.signin = async(req, res) => {
  const { email, password } = req.body;

  const school = await School.findOne({email});
  if(school){
    if(bcrypt.compareSync(password, school.password)){
      const { 
        _id, 
        firstName, 
        lastName, 
        email, 
        phoneNumber, 
        status, 
        image,
        accountName,
        accountNumber,
        bankName,
        routingNumber 
       } = school;
  
      const token = generateJwtToken(_id, email);
  
      return res.status(200).json({
          success: true,
          token,
          status,
          role: "AUTHOR",
          info: { _id, 
                  firstName, 
                  lastName, 
                  email, 
                  phoneNumber,
                  image,
                  accountName,
                  accountNumber,
                  bankName,
                  routingNumber  
                }
        });
    }else{
      return res.status(200).json({ 
        invalid: true,
        message: "Invalid Credentials" 
      });
    }
  }


  const student = await Student.findOne({email});
  if(student){
    if(bcrypt.compareSync(password, student.password)){
      const { 
        _id, 
        firstName, 
        lastName, 
        email, 
        phoneNumber, 
        status, 
        image, 
        _school 
      } = student;
      const token = generateJwtToken(_id, email);
      return res.status(200).json({
          success: true,
          token,
          status,
          role: "STUDENT",
          info: { _id, 
                  firstName, 
                  lastName, 
                  email, 
                  phoneNumber,
                  image,
                  _school
                }
        });
    }else{
      return res.status(200).json({ 
        invalid: true,
        message: "Invalid Credentials" 
      });
    }
  }

  if(!school && !student){
    return res.status(200).json({ 
      invalid: true,
      message: "Invalid Credentials" 
    });
  }
};



exports.signinStudent = async(req, res) => {
  const { email, password } = req.body;

  Student.findOne({ email }).exec(async (error, student) => {
    if (error) return res.status(400).json({ error });

    if (student && bcrypt.compareSync(password, student.password)) {
      const { _id, firstName, lastName, email, phoneNumber, status, image, _school } = student;
      const token = generateJwtToken(_id, email);
        res.status(200).json({
          success: true,
          token,
          status,
          role: "STUDENT",
          info: { _id, 
                  firstName, 
                  lastName, 
                  email, 
                  phoneNumber,
                  image,
                  _school
                }
        });

    } else {
        return res.status(200).json({ 
            invalid: true,
            message: "Invalid Credentials" 
        });
    }
  });
};

exports.refreshAuthor = (req, res) => {
  const { email } = req.user;

  School.findOne({ email }).exec(async (error, school) => {
    if (error) return res.status(400).json({ error });

    if (school) {
      const { 
        _id, 
        firstName, 
        lastName, 
        email, 
        phoneNumber, 
        status, 
        image,
        accountName,
        accountNumber,
        bankName,
        routingNumber  
       } = school;
      const token = generateJwtToken(_id, email);
        res.status(200).json({
          success: true,
          token,
          status,
          role: "AUTHOR",
          info: { _id, 
                  firstName, 
                  lastName, 
                  email, 
                  phoneNumber,
                  image,
                  accountName,
                  accountNumber,
                  bankName,
                  routingNumber   
                }
        });

    } else {
        return res.status(200).json({ 
          invalid: true,
          message: "Invalid Credentials" 
        });
    }
  });
};

exports.refreshStudent = async(req, res) => {
  const { email } = req.user;

  Student.findOne({ email }).exec(async (error, student) => {
    if (error) return res.status(400).json({ error });

    if (student) {
      const { _id, firstName, lastName, email, phoneNumber, status, image, _school } = student;
      const token = generateJwtToken(_id, email);
        res.status(200).json({
          success: true,
          token,
          status,
          role: "STUDENT",
          info: { _id, 
                  firstName, 
                  lastName, 
                  email, 
                  phoneNumber,
                  image,
                  _school 
                }
        });

    } else {
        return res.status(200).json({ 
            invalid: true,
            message: "Invalid Credentials" 
        });
    }
  });
};


exports.forgetAuthor = async(req, res) => {
  const { email } = req.query;
  const school = await School.findOne({ email });

  if(school){
      const { _id, email } = school;
      const token = generateJwtToken(_id, email);
      const href = `http://localhost:3000/update-password/author/${ token }`
        await sendMail({
            from: process.env.SENDER_MAIL,
            to: email,
            subject: `Recovery your password`,
            text: 'test text',
            html: `<h1>Reset your password. <a href=${ href }>link</a></h1>`
        });

        return res.send({
            success: true,
            message: "Please check your Email",
        });
  }

  res.send({
    success: false,
    message: "Please register first."
  })
};


exports.setAuthorPassword = async(req, res) => {
  const { _id } = req.user;
  const { password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const _password = await bcrypt.hash(password, salt);

  School.findOneAndUpdate(
    { _id }, 
    { $set: { password: _password } },
    { returnOriginal: false },
    (err, school)=>{
        if(err){
            return res.status(400).json({
                err,
                message: "Something went wrong",
            });
        }

        if(school){
          return res.send({
            success: true,
            message: "Password updated successfully",
          });
        }
    }
  )
};



exports.forgetStudent = async(req, res) => {
  const { email } = req.query;
  const student = await Student.findOne({ email });

  if(student){
      const { _id, email } = student;
      const token = generateJwtToken(_id, email);
      const href = `http://localhost:3000/update-password/student/${ token }`
        await sendMail({
            from: process.env.SENDER_MAIL,
            to: email,
            subject: `Recovery your password`,
            text: 'test text',
            html: `<h1>Reset your password. <a href=${ href }>link</a></h1>`
        });

        return res.send({
            success: true,
            message: "Please check your Email",
        });
  }

  res.send({
    success: false,
    message: "Please register first."
  })
};


