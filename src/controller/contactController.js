const Contact = require("../models/Contact");


exports.getContacts = async(req, res) => {
    const contacts = await Contact.find({ });
    return res.send(contacts.reverse());
}

exports.addContact = (req, res) => {
    const {   
            name, 
            email, 
            phone,
            message
        } = req.body;

        const _contact = new Contact({
            name, 
            email, 
            phone,
            message
      })
  
      _contact.save((error, contact) => {
          if (error) {
            return res.status(400).json({
              error,
              message: "Something went wrong",
            });
          }
  
          if(contact){
              return res.status(201).json({
                success: true,
                message: "Message submitted"
              });
          }
      });
};


// exports.editItem = (req, res) =>{
//     const { _id } = req.query;
//     const {
//         itemName, 
//         studentName, 
//         cost, 
//         description,
//     } = req.body;

//     const updates = {
//         itemName, 
//         studentName, 
//         cost, 
//         description,
//     };
    
//     // if(req.file){
//     //     updates.image = req.file.filename
//     // }

//     Need.findOneAndUpdate(
//         { _id }, 
//         { $set: updates },
//         { returnOriginal: false },
//         (err, need)=>{
//             if(err){
//                 return res.status(400).json({
//                     err,
//                     message: "Something went wrong",
//                 });
//             }

//             if(need){
//                 return res.status(201).json({
//                     success: true,
//                     item: need,  
//                     message: "Updated"
//                 });
//             }
//         }
//     )
// }


exports.removeContact = async(req, res) => {
    const { _id } = req.query;
    const _contact = await Contact.findOneAndDelete({ _id });
    if (_contact) {
        return res.status(201).json({
            success: true,
            message: "Deleted successfully"
        });
    }
}

