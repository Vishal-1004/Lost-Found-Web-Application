const {cloudinaryUpload} = require("../utilities/cloudinaryUpload")
const { users, foundItems, nonRegisteredUser } = require("../models");

async function createFoundItemPost({title,itemImage,date,location,description,personName,personRegistrationNumber,personEmail,personNumber}){
    console.log("inside createFoundItemPost")  
    const newFoundItemPost=await foundItems.create({title:title,itemImage:itemImage,date:date,location:location,description:description,personName:personName,personRegistrationNumber:personRegistrationNumber,personEmail:personEmail,personNumber:personNumber})
    console.log(newFoundItemPost)
    return newFoundItemPost
}

exports.createFoundPost = async(req,res)=>{
    const {itemTitle,itemDescription,itemFoundDate,itemLocation,founderName,founderRegistrationNumber,founderEmail,founderPhoneNumber} = req.body
    if(!itemTitle|| !itemDescription || !itemFoundDate || !itemLocation || !founderName || !founderRegistrationNumber || !founderEmail){
      return res.status(400).json({
        message : "Unfilled details!"
      })
    }
    try{
      // User already existing in our database
      const existingUser=await users.findOne({email:founderEmail,registrationNo:founderRegistrationNumber})
      console.log(existingUser)
      if(existingUser){
        try {
          console.log("inside try")
          //Cloudinary upload returning URL
          const cloudinaryURL = await cloudinaryUpload(`uploads/${req.file.filename}`);
          console.log(cloudinaryURL)
          //Creating new post in found Items
          const newFoundItem = await createFoundItemPost({
            title: itemTitle,
            itemImage: cloudinaryURL,
            date: itemFoundDate,
            location: itemLocation,
            description: itemDescription,
            personName: founderName,
            personRegistrationNumber: founderRegistrationNumber,
            personEmail: founderEmail,
            personNumber: founderPhoneNumber
          });
          console.log(newFoundItem)
          if(newFoundItem){
            //Adding new post id to users foundItemsID array
            const newFoundItemPost =await users.updateOne({_id:existingUser._id},{foundItemsID:[...existingUser.foundItemsID,newFoundItem._id]})
            if(newFoundItemPost){
              res.status(200).json({
                message: "Upload successful!",
              });
            }
          }
        } catch (error) {
          console.log("inside catch")
          res.status(500).json({
            message: "Upload failed!",
            error: error.message
          });
        }
      }
    }catch(err){
      res.status(500).json({
        message: "New post creation failed!",
        error: error.message
      });
    }
}



