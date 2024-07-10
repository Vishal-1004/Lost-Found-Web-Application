const { cloudinaryUpload } = require("../utilities/cloudinaryUpload");
const { users, foundItems, nonRegisteredUser } = require("../models");
const bcrypt = require("bcryptjs");

async function createFoundItemPost({
  title,
  itemImage,
  date,
  location,
  description,
  personName,
  personRegistrationNumber,
  personEmail,
  personNumber,
}) {
  const newFoundItemPost = await foundItems.create({
    title: title,
    itemImage: itemImage,
    date: date,
    location: location,
    description: description,
    personName: personName,
    personRegistrationNumber: personRegistrationNumber,
    personEmail: personEmail,
    personNumber: personNumber,
  });
  return newFoundItemPost;
}

exports.createFoundPost = async (req, res) => {
  const {
    itemTitle,
    itemDescription,
    itemFoundDate,
    itemLocation,
    founderName,
    founderRegistrationNumber,
    founderEmail,
    founderPhoneNumber,
  } = req.body;
  if (
    !itemTitle ||
    !itemDescription ||
    !itemFoundDate ||
    !itemLocation ||
    !founderName ||
    !founderRegistrationNumber ||
    !founderEmail
  ) {
    return res.status(400).json({
      message: "Unfilled details!",
    });
  }
  // console.log("file name is: ***********", req.file.filename);
  // console.log("file name is: ***********", req.file.filename);
  try {
    const existingUser = await users.findOne({
      email: founderEmail,
      registrationNo: founderRegistrationNumber,
    });
    if (existingUser) {
      // User already existing in our database
      try {
        //Cloudinary upload returning URL
        const cloudinaryURL = await cloudinaryUpload(
          `uploads/${req.file.filename}`
        );

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
              message: "Upload successful!",
              registered: true,
            });
          }
        }
      } catch (error) {
        console.log("inside catch");
        return res.status(500).json({
          message: "Upload failed!",
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
        //Cloudinary upload returning URL
        const cloudinaryURL = await cloudinaryUpload(
          `uploads/${req.file.filename}`
        );

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
          personNumber: founderPhoneNumber,
        });

        if (newFoundItem) {
          //Adding new post id to users foundItemsID array
          console.log(existingNonRegisteredUser);
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
                message: "Upload successful!",
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
                message: "Upload successful!",
                registered: false,
              });
            }
          }
        }
      } catch (err) {
        return res.status(500).json({
          message: "New post creation failed!",
          error: error.message,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: "New post creation failed!",
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

    //Updating day scholar or hosteler detail
    const stayDetailUpdate = await users.updateOne(
      { email: email },
      { dayScholarORhosteler: dayScholarORhosteler }
    );
    if (!stayDetailUpdate) {
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
    if (!phoneNumberUpdate) {
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

exports.fetchFoundItems = async (req, res) => {
  try {
    const { all, count } = req.query;

    if (all === "true" || all === 1) {
      // Handle request for all found items
      const foundItemsAll = await foundItems.find();
      return res.status(200).json(foundItemsAll);
    } else if (count) {
      // Handle request for a specific number of found items
      const countValue = parseInt(count, 10);
      if (isNaN(countValue)) {
        return res.status(400).json({ message: "Invalid count value" });
      }
      const foundItemsCount = await foundItems.find().limit(countValue);
      return res.status(200).json(foundItemsCount);
    } else {
      return res.status(400).json({ message: "Invalid parameter" });
    }
  } catch (error) {
    console.error("Error fetching found items:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

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
