const {cloudinaryUpload} = require("../utilities/cloudinaryUpload")
const { users, foundItems, nonRegisteredUser } = require("../models");

async function createFoundItemPost({title,itemImage,date,location,description,personName,personRegistrationNumber,personEmail,personNumber}){
    const newFoundItemPost=await foundItems.create({title:title,itemImage:itemImage,date:date,location:location,description:description,personName:personName,personRegistrationNumber:personRegistrationNumber,personEmail:personEmail,personNumber:personNumber})
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
      const existingUser=await users.findOne({email:founderEmail,registrationNo:founderRegistrationNumber})
      if(existingUser){
        // User already existing in our database
        try {

          //Cloudinary upload returning URL
          const cloudinaryURL = await cloudinaryUpload(`uploads/${req.file.filename}`);

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

          //Adding new post id to user's foundItemsID array
          if(newFoundItem){
            const newFoundItemPost =await users.updateOne({_id:existingUser._id},{foundItemsID:[...existingUser.foundItemsID,newFoundItem._id]})
            if(newFoundItemPost){
              return res.status(200).json({
                message: "Upload successful!",
                registered:true
              });
            }
          }
        } catch (error) {
          console.log("inside catch")
          return res.status(500).json({
            message: "Upload failed!",
            error: error.message,
          });
        }
      }else{
        //User not in our database
        const existingNonRegisteredUser=await nonRegisteredUser.findOne({email:founderEmail,registrationNumber:founderRegistrationNumber})
        try {
          //Cloudinary upload returning URL
          const cloudinaryURL = await cloudinaryUpload(`uploads/${req.file.filename}`);

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
          
          if(newFoundItem){
            //Adding new post id to users foundItemsID array
            console.log(existingNonRegisteredUser)
            if(existingNonRegisteredUser){
              //User in nonRegisteredUser already
              const newFoundItemPost =await nonRegisteredUser.updateOne({email:existingNonRegisteredUser.email,registrationNumber:existingNonRegisteredUser.registrationNumber},{foundItemsIds:[...existingNonRegisteredUser.foundItemsIds,newFoundItem._id]})
              if(newFoundItemPost){
                return res.status(200).json({
                  message: "Upload successful!",
                  registered:false
                });
              }
            }else{
              //User NOT in nonRegisteredUser
              const newFoundItemPostwithNonRegisteredUser=await nonRegisteredUser.create({email:founderEmail,registrationNumber:founderRegistrationNumber,foundItemsIds:[newFoundItem._id]})
              if(newFoundItemPostwithNonRegisteredUser){
                return res.status(200).json({
                  message: "Upload successful!",
                  registered:false
                });
              }
            }
          }
        }catch(err){
          return res.status(500).json({
            message: "New post creation failed!",
            error: error.message
          });
        }
      }
    }catch(err){
      return res.status(500).json({
        message: "New post creation failed!",
        error: error.message
      });
    }
}

// update hosteler or day scholar information
exports.updateHostelerOrDayScholar = async(req,res)=>{
  const {email,dayScholarORhosteler} = req.body

  //Checking if email was filled
  if(!email){
    return res.status(400).json({
      message : "Email not filled!"
    })
  }

  //Checking whether stayDetail is either Day Scholar or Hosteler
  if(dayScholarORhosteler!=="Day Scholar" && dayScholarORhosteler!=="Hosteler"){
    return res.status(400).json({
      message:"Wrong Stay Detail!"
    })
  }

  try{
    //Checking whether user exists
    const existingUser=await users.find({email:email})
    if(existingUser.length<1){
      return res.status(400).json({
        message : "User not found!"
      })
    }

    //Updating day scholar or hosteler detail
    const stayDetailUpdate=await users.updateOne({email:email},{dayScholarORhosteler:dayScholarORhosteler})
    if(!stayDetailUpdate){
      return res.status(400).json({
        message:"Error updating detail!"
      })
    }
   return  res.status(200).json({
      message : `Stay detail updated to ${dayScholarORhosteler}`
    })
  }catch(error){
      return res.status(400).json({
      message : 'Error connecting to db!',
      error : error
    })
  }
}

// updating phone number
exports.updatePhoneNumber = async(req,res)=>{
  const {email,phoneNumber} = req.body
  
  //Checking if email was filled
  if(!email){
    return res.status(400).json({
      message : "Email not filled!"
    })
  }

  //Checking if phone number was filled
  if(!phoneNumber){
    return res.status(400).json({
      message:"Phone Number not filled!"
    })
  }

  try{
    //checking for existing user
    const existingUser=await users.find({email:email})
    if(existingUser.length<1){
      return res.status(400).json({
        message : "User not found!"
      })
    }
    //updating phone number
    const phoneNumberUpdate=await users.updateOne({email:email},{phoneNumber:phoneNumber})
    if(!phoneNumberUpdate){
      return res.status(400).json({
        message:"Error updating phone number!"
      })
    }
   return res.status(200).json({
     message: "Phone Number updated successfully!",
   });
  }catch(error){
      return res.status(400).json({
      message : 'Error connecting to db!',
      error : error
    })
  }
}



