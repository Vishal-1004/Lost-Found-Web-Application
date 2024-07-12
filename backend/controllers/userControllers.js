const { cloudinary } = require("../utilities/cloudinaryUpload");
const { users, foundItems, nonRegisteredUser } = require("../models");
const bcrypt = require("bcryptjs");
const multer = require("multer");

async function createFoundItemPost({
  title,
  itemImage,
  date,
  location,
  description,
  personName,
  personRegistrationNumber,
  personEmail,
  personDayScholarORhosteler,
  personStatus,
  personNumber,
}) {
  const newFoundItemPost = await foundItems.create({
    title,
    itemImage,
    date,
    location,
    description,
    personName,
    personRegistrationNumber,
    personEmail,
    personDayScholarORhosteler,
    personStatus,
    personNumber,
  });
  return newFoundItemPost;
}

exports.createFoundPost = async (req, res) => {
  const upload = await cloudinary.uploader.upload(req.file.path);

  const {
    itemTitle,
    itemDescription,
    itemFoundDate,
    itemLocation,
    founderName,
    founderRegistrationNumber,
    founderEmail,
    founderDayScholarORhosteler,
    founderStatus,
    founderPhoneNumber,
  } = req.body;
  if (
    !itemTitle ||
    !itemDescription ||
    !itemFoundDate ||
    !itemLocation ||
    !founderName ||
    !founderRegistrationNumber ||
    !founderEmail ||
    !founderDayScholarORhosteler ||
    !founderStatus
  ) {
    return res.status(400).json({
      message: "Enter all the details!",
    });
  }
  try {
    const existingUser = await users.findOne({
      email: founderEmail,
      registrationNo: founderRegistrationNumber,
    });
    if (existingUser) {
      if(existingUser.status==="BLOCKED"){
        return res.status(400).json({
          message : "User Blocked by Admin!"
        })
      }
      // User already existing in our database
      try {
        //Creating new post in found Items
        const newFoundItem = await createFoundItemPost({
          title: itemTitle,
          itemImage: upload.secure_url,
          date: itemFoundDate,
          location: itemLocation,
          description: itemDescription,
          personName: founderName,
          personRegistrationNumber: founderRegistrationNumber,
          personEmail: founderEmail,
          personDayScholarORhosteler: founderDayScholarORhosteler,
          personStatus: founderStatus,
          personNumber: founderPhoneNumber,
        });

        //Adding new post id to user's foundItemsID array
        if (newFoundItem) {
          const newFoundItemPost = await users.updateOne(
            { _id: existingUser._id },
            { foundItemsID: [...existingUser.foundItemsID, newFoundItem._id] }
          );
          if (newFoundItemPost) {
            return res.status(200).json({
              message: "Found Post Created Successful!",
              registered: true,
            });
          }
        }
      } catch (error) {
        //console.log("inside catch");
        return res.status(500).json({
          message: "Found Post Creation Failed!",
          error: error.message,
        });
      }
    } else {
      //User not in our database
      const existingNonRegisteredUser = await nonRegisteredUser.findOne({
        email: founderEmail,
        registrationNumber: founderRegistrationNumber,
      });
      try {
        //Creating new post in found Items
        const newFoundItem = await createFoundItemPost({
          title: itemTitle,
          itemImage: upload.secure_url,
          date: itemFoundDate,
          location: itemLocation,
          description: itemDescription,
          personName: founderName,
          personRegistrationNumber: founderRegistrationNumber,
          personEmail: founderEmail,
          personDayScholarORhosteler: founderDayScholarORhosteler,
          personStatus: founderStatus,
          personNumber: founderPhoneNumber,
        });

        if (newFoundItem) {
          //Adding new post id to users foundItemsID array
          //console.log(existingNonRegisteredUser);
          if (existingNonRegisteredUser) {
            //User in nonRegisteredUser already
            const newFoundItemPost = await nonRegisteredUser.updateOne(
              {
                email: existingNonRegisteredUser.email,
                registrationNumber:
                  existingNonRegisteredUser.registrationNumber,
              },
              {
                foundItemsIds: [
                  ...existingNonRegisteredUser.foundItemsIds,
                  newFoundItem._id,
                ],
              }
            );
            if (newFoundItemPost) {
              return res.status(200).json({
                message: "Found Post Created Successful!",
                registered: false,
              });
            }
          } else {
            //User NOT in nonRegisteredUser
            const newFoundItemPostwithNonRegisteredUser =
              await nonRegisteredUser.create({
                email: founderEmail,
                registrationNumber: founderRegistrationNumber,
                foundItemsIds: [newFoundItem._id],
              });
            if (newFoundItemPostwithNonRegisteredUser) {
              return res.status(200).json({
                message: "Found Post Created Successful!",
                registered: false,
              });
            }
          }
        }
      } catch (err) {
        return res.status(500).json({
          message: "Found Post Creation Failed!",
          error: error.message,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: "Found Post Creation Failed!",
      error: error.message,
    });
  }
};

// update hosteler or day scholar information
exports.updateHostelerOrDayScholar = async (req, res) => {
  const { email, dayScholarORhosteler } = req.body;

  //Checking if email was filled
  if (!email) {
    return res.status(400).json({
      message: "Email not filled!",
    });
  }

  //Checking whether stayDetail is either Day Scholar or Hosteler
  if (
    dayScholarORhosteler !== "Day Scholar" &&
    dayScholarORhosteler !== "Hosteler"
  ) {
    return res.status(400).json({
      message: "Wrong Stay Detail!",
    });
  }

  try {
    //Checking whether user exists
    const existingUser = await users.find({ email: email });
    if (existingUser.length < 1) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    //Updating day scholar or hosteler detail for user schema
    const stayDetailUpdate = await users.updateOne(
      { email: email },
      { dayScholarORhosteler: dayScholarORhosteler }
    );

    // Updating day scholar or hosteler details for found item schema
    const stayDetailUpdateForFoundSchema = await foundItems.updateMany(
      { personEmail: email },
      { personDayScholarORhosteler: dayScholarORhosteler }
    );

    if (!stayDetailUpdate || !stayDetailUpdateForFoundSchema) {
      return res.status(400).json({
        message: "Error updating detail!",
      });
    }
    return res.status(200).json({
      message: `Stay detail updated to ${dayScholarORhosteler}`,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error connecting to db!",
      error: error,
    });
  }
};

// updating phone number
exports.updatePhoneNumber = async (req, res) => {
  const { email, phoneNumber } = req.body;

  //Checking if email was filled
  if (!email) {
    return res.status(400).json({
      message: "Email not filled!",
    });
  }

  //Checking if phone number was filled
  if (!phoneNumber) {
    return res.status(400).json({
      message: "Phone Number not filled!",
    });
  }

  try {
    //checking for existing user
    const existingUser = await users.find({ email: email });
    if (existingUser.length < 1) {
      return res.status(400).json({
        message: "User not found!",
      });
    }
    //updating phone number
    const phoneNumberUpdate = await users.updateOne(
      { email: email },
      { phoneNumber: phoneNumber }
    );

    // Updating day scholar or hosteler details for found item schema
    const phoneNumberUpdateForFoundSchema = await foundItems.updateMany(
      { personEmail: email },
      { personNumber: phoneNumber }
    );
    if (!phoneNumberUpdate || !phoneNumberUpdateForFoundSchema) {
      return res.status(400).json({
        message: "Error updating phone number!",
      });
    }
    return res.status(200).json({
      message: "Phone Number updated successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error connecting to db!",
      error: error,
    });
  }
};

// getting all found items
exports.fetchFoundItems = async (req, res) => {
  try {
    const { all, count } = req.query;

    if (all === "true" || all === "1") {
      // Handle request for all found items
      const foundItemsAll = await foundItems.find().sort({ createdAt: -1 });
      return res.status(200).json({
        message: "All Found Post Fetched Successfully!",
        data: foundItemsAll,
      });
    } else if (count) {
      // Handle request for a specific number of found items
      const countValue = parseInt(count, 10);
      if (isNaN(countValue)) {
        return res.status(400).json({ message: "Invalid count value" });
      }
      const foundItemsCount = await foundItems
        .find()
        .sort({ createdAt: -1 })
        .limit(countValue);
      return res.status(200).json({
        message: "All Found Post Fetched Successfully!",
        data: foundItemsCount,
      });
    } else {
      return res.status(400).json({ message: "Invalid parameter" });
    }
  } catch (error) {
    console.error("Error fetching found items:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// updating your password
exports.updatePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    // Find user by email
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare oldPassword with stored hashed password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// user personally deleting his/her account
exports.deleteAccount = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Find the user by email
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve the foundItemsIds array from the user document
    const foundItemsIds = user.foundItemsIds;

    // Delete all found items with IDs in this array from the foundItemSchema
    await FoundItem.deleteMany({ _id: { $in: foundItemsIds } });

    // Delete the user from the users collection
    await users.deleteOne({ _id: user._id });

    return res.status(200).json({
      message: "User account and associated found items deleted successfully",
    });
  } catch (error) {
    console.error("Error during account deletion:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", specificError: error.message });
  }
};

// Deleting user account and associated found items
exports.deleteUser = async (req, res) => {
  const { email } = req.body;
  //console.log(email)
  // Checking if email was filled
  if (!email) {
    return res.status(400).json({
      message: "Email not filled!",
    });
  }

  try {
    // Checking for existing users
    const existingUsers = await users.find({ email: email });
    if (existingUsers.length < 1) {
      return res.status(400).json({
        message: "No users found!",
      });
    }

    // Deleting user accounts
    const userDeletion = await users.deleteMany({ email: email });
    if (userDeletion.deletedCount === 0) {
      return res.status(400).json({
        message: "This user doesn't exist!",
      });
    }

    // Deleting associated found items
    const foundItemsDeletion = await foundItems.deleteMany({
      personEmail: email,
    });
    /*if (foundItemsDeletion.deletedCount === 0) {
      return res.status(400).json({
        message: "Error deleting found items!"
      });
    }
*/
    return res.status(200).json({
      message: `${userDeletion.deletedCount} user account(s) and ${foundItemsDeletion.deletedCount} found item(s) deleted successfully!`,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error connecting to db!",
      error: error,
    });
  }
};

// Updating user password
exports.updatePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  // Checking if email, currentPassword, and newPassword were filled
  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({
      message: "Email, current password, and new password are required!",
    });
  }

  try {
    // Checking for existing user
    const existingUser = await users.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    // Verifying current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      existingUser.password
    );
    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect!",
      });
    }

    // Updating password
    existingUser.password = newPassword;
    await existingUser.save();

    return res.status(200).json({
      message: "Password updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error connecting to db!",
      error: error,
    });
  }
};

// Getting Found Items By User
exports.getFoundItemsByUser = async (req, res) => {
  const { email, registrationNumber } = req.body;

  if (!email && !registrationNumber) {
    return res.status(400).json({
      message: "Email or Registration Number is required!",
    });
  }

  try {
    let user;
    if (email) {
      user = await users.findOne({ email: email });
    } else if (registrationNumber) {
      user = await users.findOne({ registrationNo: registrationNumber });
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found in the DB",
      });
    }

    const foundItemsList = await foundItems
      .find({
        personEmail: user.email,
      })
      .sort({ createdAt: -1 });

    if (foundItemsList.length === 0) {
      return res.status(404).json({
        message: "No found items posted by this user",
        metaData: "0",
      });
    }

    return res.status(200).json({
      message: "Found items fetched successfully",
      data: foundItemsList,
      metaData: foundItemsList.length,
    });
  } catch (error) {
    console.error("Error fetching found items:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

async function isAdmin(email) {
  const user = await users.findOne({ email: email });
  return user && user.status === "ADMIN";
}

exports.editFoundItem = async (req, res) => {
  const { email, foundItemId, ...updateFields } = req.body;

  if (!email || !foundItemId) {
    return res.status(400).json({
      message: "Email and foundItemId are required!",
    });
  }

  try {
    const userIsAdmin = await isAdmin(email);

    let foundItem;
    if (!userIsAdmin) {
      foundItem = await foundItems.findOne({
        _id: foundItemId,
        personEmail: email,
      });
      if (!foundItem) {
        return res.status(403).json({
          message: "You do not have permission to edit this found item.",
        });
      }
    } else {
      foundItem = await foundItems.findById(foundItemId);
      if (!foundItem) {
        return res.status(404).json({
          message: "Found item not found.",
        });
      }
    }

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      updateFields.itemImage = upload.secure_url;
    }

    const allowedFields = [
      "title",
      "description",
      "date",
      "location",
      "itemImage",
      "personDayScholarORhosteler",
    ];
    const updateData = {};
    allowedFields.forEach((field) => {
      if (updateFields[field] !== undefined) {
        updateData[field] = updateFields[field];
      }
    });

    await foundItems.updateOne({ _id: foundItemId }, { $set: updateData });

    return res.status(200).json({
      message: "Found item updated successfully.",
    });
  } catch (error) {
    console.error("Error updating found item:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.deleteFoundItem = async (req, res) => {
  const { email, foundItemId } = req.body;

  if (!email || !foundItemId) {
    return res.status(400).json({
      message: "Email and foundItemId are required!",
    });
  }

  try {
    const userIsAdmin = await isAdmin(email);

    let foundItem;
    if (!userIsAdmin) {
      foundItem = await foundItems.findOne({
        _id: foundItemId,
        personEmail: email,
      });
      if (!foundItem) {
        return res.status(403).json({
          message: "You do not have permission to delete this found item.",
        });
      }
    } else {
      foundItem = await foundItems.findById(foundItemId);
      if (!foundItem) {
        return res.status(404).json({
          message: "Found item not found.",
        });
      }
    }

    await foundItems.deleteOne({ _id: foundItemId });

    await users.updateOne(
      { email: email },
      { $pull: { foundItemsID: new mongoose.Types.ObjectId(foundItemId) } }
    );

    return res.status(200).json({
      message: "Found item deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting found item:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
