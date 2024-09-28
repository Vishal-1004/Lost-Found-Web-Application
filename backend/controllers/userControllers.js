const { cloudinary } = require("../utilities/cloudinaryUpload");
const {
  users,
  foundItems,
  nonRegisteredUser,
  lostItems,
  returnedItems,
} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vitcseguide@gmail.com",
    pass: "gvdt kqqs zzvr vfib",
  },
});

// function to send email notification to all the users who have subscribed to our website
async function sendNotificationEmails(type, title, description, location) {
  try {
    // Find all users with notification set to true
    const usersToNotify = await users.find({ notifications: true });

    // If users are found, send emails
    if (usersToNotify.length > 0) {
      usersToNotify.forEach(async (user) => {
        const mailOptions = {
          from: "vitcseguide@gmail.com",
          to: user.email,
          subject:
            type == "LOST"
              ? `New Lost Item: ${title}`
              : `New Found Item: ${title}`,
          text: `Hello ${user.name},

We wanted to inform you that a new item has been ${
            type === "LOST" ? "lost" : "found"
          }.

Title: ${title}
Description: ${description}
Location: ${location}

Please check our platform for more details.

Best regards,
VIT Lost & Found Team`,
        };

        await transporter.sendMail(mailOptions);
      });
    }
  } catch (error) {
    console.log("Error sending notification emails:", error.message);
  }
}

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

// Creating found post API
exports.createFoundPost = async (req, res) => {
  let upload;
  let isPostCreated = false;
  if (req.file) {
    upload = await cloudinary.uploader.upload(req.file.path);
  } else {
    // Set a default image URL or path
    upload = {
      secure_url:
        "https://res.cloudinary.com/dcmqniwwc/image/upload/v1721453179/nwygugtii3lpwt7xnqgn.jpg",
    };
  }
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
      // console.log(existingUser);
      if (existingUser.status === "BLOCKED") {
        return res.status(400).json({
          message: "You are Blocked by Admin!",
        });
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
            isPostCreated = true;

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
      } finally {
        if (isPostCreated) {
          await sendNotificationEmails(
            "LOST",
            itemTitle,
            itemDescription,
            itemLocation
          );
        }
      }
    } else {
      // User not in our database
      const existingNonRegisteredUser = await nonRegisteredUser.findOne({
        email: founderEmail,
        registrationNo: founderRegistrationNumber,
      });
      try {
        //Adding new post id to an existing non registered users foundItemsID array
        if (existingNonRegisteredUser) {
          if (existingNonRegisteredUser.status === "BLOCKED") {
            return res.status(400).json({
              message: "You are Blocked by Admin!",
            });
          }
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
          const newFoundItemPost = await nonRegisteredUser.updateOne(
            {
              email: existingNonRegisteredUser.email,
              registrationNo: existingNonRegisteredUser.registrationNo,
            },
            {
              foundItemsID: [
                ...existingNonRegisteredUser.foundItemsID,
                newFoundItem._id,
              ],
            }
          );
          if (newFoundItemPost) {
            isPostCreated = true;

            return res.status(200).json({
              message: "Found Post Created Successful!",
              registered: false,
            });
          }
        } else {
          // Creating new post in found Items
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
          // User NOT in nonRegisteredUser
          const newFoundItemPostwithNonRegisteredUser =
            await nonRegisteredUser.create({
              email: founderEmail,
              registrationNo: founderRegistrationNumber,
              foundItemsID: [newFoundItem._id],
            });
          if (newFoundItemPostwithNonRegisteredUser) {
            isPostCreated = true;

            return res.status(200).json({
              message: "Found Post Created Successful!",
              registered: false,
            });
          }
        }
      } catch (error) {
        return res.status(500).json({
          message: "Found Post Creation Failed!",
          error: error.message,
        });
      } finally {
        if (isPostCreated) {
          await sendNotificationEmails(
            "LOST",
            itemTitle,
            itemDescription,
            itemLocation
          );
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Found Post Creation Failed!",
      error: error.message,
    });
  }
};

async function createLostItemPost({
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
  const newLostItemPost = await lostItems.create({
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
  return newLostItemPost;
}

// Creating lost post by a user
exports.createLostPost = async (req, res) => {
  let isLostPostCreated = false;
  let upload;
  if (req.file) {
    upload = await cloudinary.uploader.upload(req.file.path);
  } else {
    // Set a default image URL or path
    upload = {
      secure_url:
        "https://res.cloudinary.com/dcmqniwwc/image/upload/v1721453179/nwygugtii3lpwt7xnqgn.jpg",
    };
  }
  const {
    itemTitle,
    itemDescription,
    itemLostDate,
    itemLocation,
    loserName,
    loserRegistrationNumber,
    loserEmail,
    loserDayScholarORhosteler,
    loserStatus,
    loserPhoneNumber,
  } = req.body;
  if (
    !itemTitle ||
    !itemDescription ||
    !itemLostDate ||
    !itemLocation ||
    !loserName ||
    !loserRegistrationNumber ||
    !loserEmail ||
    !loserDayScholarORhosteler ||
    !loserStatus
  ) {
    return res.status(400).json({
      message: "Enter all the details!",
    });
  }
  try {
    const existingUser = await users.findOne({
      email: loserEmail,
      registrationNo: loserRegistrationNumber,
    });
    if (existingUser) {
      // console.log(existingUser);
      if (existingUser.status === "BLOCKED") {
        return res.status(400).json({
          message: "You are Blocked by Admin!",
        });
      }
      // User already existing in our database
      try {
        //Creating new post in lost Items
        const newLostItem = await createLostItemPost({
          title: itemTitle,
          itemImage: upload.secure_url,
          date: itemLostDate,
          location: itemLocation,
          description: itemDescription,
          personName: loserName,
          personRegistrationNumber: loserRegistrationNumber,
          personEmail: loserEmail,
          personDayScholarORhosteler: loserDayScholarORhosteler,
          personStatus: loserStatus,
          personNumber: loserPhoneNumber,
        });

        //Adding new post id to user's foundItemsID array
        if (newLostItem) {
          const newLostItemPost = await users.updateOne(
            { _id: existingUser._id },
            { lostItemsID: [...existingUser.lostItemsID, newLostItem._id] }
          );
          if (newLostItemPost) {
            isLostPostCreated = true;

            return res.status(200).json({
              message: "Lost Post Created Successful!",
              registered: true,
            });
          }
        }
      } catch (error) {
        //console.log("inside catch");
        return res.status(500).json({
          message: "Lost Post Creation Failed!",
          error: error.message,
        });
      } finally {
        if (isLostPostCreated) {
          await sendNotificationEmails(
            "LOST",
            itemTitle,
            itemDescription,
            itemLocation
          );
        }
      }
    } else {
      //User not in our database
      const existingNonRegisteredUser = await nonRegisteredUser.findOne({
        email: loserEmail,
        registrationNo: loserRegistrationNumber,
      });
      try {
        //Adding new post id to an existing non registered users foundItemsID array
        if (existingNonRegisteredUser) {
          if (existingNonRegisteredUser.status === "BLOCKED") {
            return res.status(400).json({
              message: "You are Blocked by Admin!",
            });
          }
          //Creating new post in found Items
          const newLostItem = await createLostItemPost({
            title: itemTitle,
            itemImage: upload.secure_url,
            date: itemLostDate,
            location: itemLocation,
            description: itemDescription,
            personName: loserName,
            personRegistrationNumber: loserRegistrationNumber,
            personEmail: loserEmail,
            personDayScholarORhosteler: loserDayScholarORhosteler,
            personStatus: loserStatus,
            personNumber: loserPhoneNumber,
          });
          const newLostItemPost = await nonRegisteredUser.updateOne(
            {
              email: existingNonRegisteredUser.email,
              registrationNo: existingNonRegisteredUser.registrationNo,
            },
            {
              lostItemsID: [
                ...existingNonRegisteredUser.lostItemsID,
                newLostItem._id,
              ],
            }
          );
          if (newLostItemPost) {
            isLostPostCreated = true;

            return res.status(200).json({
              message: "Lost Post Created Successfully!",
              registered: false,
            });
          }
        } else {
          //Creating new post in lost Items
          const newLostItem = await createFoundItemPost({
            title: itemTitle,
            itemImage: upload.secure_url,
            date: itemLostDate,
            location: itemLocation,
            description: itemDescription,
            personName: loserName,
            personRegistrationNumber: loserRegistrationNumber,
            personEmail: loserEmail,
            personDayScholarORhosteler: loserDayScholarORhosteler,
            personStatus: loserStatus,
            personNumber: loserPhoneNumber,
          });
          // User NOT in nonRegisteredUser
          const newLostItemPostwithNonRegisteredUser =
            await nonRegisteredUser.create({
              email: loserEmail,
              registrationNo: loserRegistrationNumber,
              lostItemsID: [newLostItem._id],
            });
          if (newLostItemPostwithNonRegisteredUser) {
            isLostPostCreated = true;

            return res.status(200).json({
              message: "Lost Post Created Successful!",
              registered: false,
            });
          }
        }
      } catch (error) {
        return res.status(500).json({
          message: "Lost Post Creation Failed!",
          error: error.message,
        });
      } finally {
        if (isLostPostCreated) {
          await sendNotificationEmails(
            "LOST",
            itemTitle,
            itemDescription,
            itemLocation
          );
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Lost Post Creation Failed!",
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

    const stayDetailUpdateForLostSchema = await lostItems.updateMany(
      { personEmail: email },
      { personDayScholarORhosteler: dayScholarORhosteler }
    );

    if (
      !stayDetailUpdate ||
      !stayDetailUpdateForFoundSchema ||
      !stayDetailUpdateForLostSchema
    ) {
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

    // Updating day scholar or hosteler details for lost item schema
    const phoneNumberUpdateForLostSchema = await lostItems.updateMany(
      { personEmail: email },
      { personNumber: phoneNumber }
    );

    if (
      !phoneNumberUpdate ||
      !phoneNumberUpdateForFoundSchema ||
      !phoneNumberUpdateForLostSchema
    ) {
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

//getting all lost items
exports.fetchLostItems = async (req, res) => {
  try {
    const {
      all,
      count,
      page = 1,
      search = "",
      sortOrder = -1,
      limit = 6,
    } = req.query;

    if (all === "true" || all === "1") {
      const skip = (page - 1) * limit;

      const searchFilter = {
        $or: [
          { title: new RegExp(search, "i") },
          { description: new RegExp(search, "i") },
        ],
      };

      const lostItemsAll = await lostItems
        .find(searchFilter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: parseInt(sortOrder, 10) });

      const totalLostItemsPost = await lostItems.countDocuments(searchFilter);

      return res.status(200).json({
        message: "All Lost Post Fetched Successfully!",
        data: lostItemsAll,
        totalPages: Math.ceil(totalLostItemsPost / limit),
        currentPage: page,
        limit: limit,
        sortOrder: sortOrder,
      });
    } else if (count) {
      const countValue = parseInt(count, 10);
      if (isNaN(countValue)) {
        return res.status(400).json({ message: "Invalid count value" });
      }
      const lostItemsCount = await lostItems
        .find()
        .sort({ createdAt: -1 })
        .limit(countValue);
      return res.status(200).json({
        message: "Lost Items Fetched Successfully!",
        data: lostItemsCount,
      });
    } else {
      return res.status(400).json({ message: "Invalid parameter" });
    }
  } catch (error) {
    console.error("Error fetching lost items:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// getting all found items
exports.fetchFoundItems = async (req, res) => {
  try {
    const {
      all,
      count,
      page = 1,
      search = "",
      sortOder = -1,
      limit = 6,
    } = req.query;

    if (all === "true" || all === "1") {
      // Set pagination variables
      const skip = (page - 1) * limit;

      // Create the search filter
      const searchFilter = {
        $or: [
          { title: new RegExp(search, "i") },
          { description: new RegExp(search, "i") },
        ],
      };

      // Handle request for all found items
      const foundItemsAll = await foundItems
        .find(searchFilter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: parseInt(sortOder, 10) });

      // Count total found item post after search filter
      const totalFoundItemsPost = await foundItems.countDocuments(searchFilter);

      return res.status(200).json({
        message: "All Found Post Fetched Successfully!",
        data: foundItemsAll,
        totalPages: Math.ceil(totalFoundItemsPost / limit),
        currentPage: page,
        limit: limit,
        sortOrder: sortOder,
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

// Deleting user account and associated found items & lost items
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
    // Deleting associated lost items
    const lostItemsDeletion = await lostItems.deleteMany({
      personEmail: email,
    });

    return res.status(200).json({
      message: `${userDeletion.deletedCount} user account(s), ${foundItemsDeletion.deletedCount} and ${lostItemsDeletion.deletedCount}found item(s) deleted successfully!`,
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

//getting lost items by user
exports.getLostItemsByUser = async (req, res) => {
  const { email, registrationNumber, sortingOrder } = req.body;
  const { search = "" } = req.query;

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
        message: "User not found in the Database",
      });
    }

    const searchFilter = {
      personEmail: user.email,
      $or: [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ],
    };

    const lostItemsList = await lostItems
      .find(searchFilter)
      .sort({ createdAt: parseInt(sortingOrder, 10) });

    if (lostItemsList.length === 0) {
      return res.status(404).json({
        message: "No lost items posted by user",
        metaData: "0",
      });
    }

    return res.status(200).json({
      message: "Lost items fetched successfully",
      data: lostItemsList,
      metaData: lostItemsList.length,
    });
  } catch (error) {
    console.error("Error fetching lost items:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Getting Found Items By User
exports.getFoundItemsByUser = async (req, res) => {
  const { email, registrationNumber, sortingOrder } = req.body;
  const { search = "" } = req.query;

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
        message: "User not found in the Database",
      });
    }

    const searchFilter = {
      personEmail: user.email,
      $or: [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ],
    };

    const foundItemsList = await foundItems
      .find(searchFilter)
      .sort({ createdAt: parseInt(sortingOrder, 10) });

    if (foundItemsList.length === 0) {
      return res.status(404).json({
        message: "No found items posted by user",
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

// edit found post
exports.editFoundItem = async (req, res) => {
  const {
    email,
    foundItemId,
    title,
    description,
    date,
    location,
    founderPhoneNumber,
    itemImage,
  } = req.body;

  //console.log(founderPhoneNumber);

  const updateFields = {
    title,
    description,
    date,
    location,
    itemImage,
    personNumber:
      founderPhoneNumber === undefined ? undefined : founderPhoneNumber,
  };

  if (!email || !foundItemId) {
    return res.status(400).json({
      message: "Email and foundItemId are required!",
      givenEmail: email,
      givenId: foundItemId,
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
      "personNumber",
    ];
    const updateData = {};
    allowedFields.forEach((field) => {
      updateData[field] = updateFields[field];
    });
    //console.log(updateData);

    const data = await foundItems.updateOne(
      { _id: foundItemId },
      { $set: updateData }
    );

    return res.status(200).json({
      message: "Found item updated successfully.",
      data: data,
    });
  } catch (error) {
    console.error("Error updating found item:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete a found item post by a user
exports.deleteFoundItem = async (req, res) => {
  const { email, foundItemId } = req.body;

  if (!email || !foundItemId) {
    return res.status(400).json({
      message: "Email and foundItemId are required!",
    });
  }

  try {
    const userIsAdmin = await isAdmin(email);

    if (!userIsAdmin) {
      const foundItem = await foundItems.findOne({
        _id: foundItemId,
        personEmail: email,
      });
      if (!foundItem) {
        return res.status(403).json({
          message: "No such found post exist",
        });
      }
    } else {
      const foundItem = await foundItems.findOne({ _id: foundItemId });
      if (!foundItem) {
        return res.status(404).json({
          message: "Found post not found.",
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

// Edit a lost item post by a user
exports.editLostItem = async (req, res) => {
  const {
    email,
    lostItemId,
    title,
    description,
    date,
    location,
    ownerPhoneNumber,
    itemImage,
  } = req.body;

  const updateFields = {
    title,
    description,
    date,
    location,
    itemImage,
    ownerNumber: ownerPhoneNumber === undefined ? undefined : ownerPhoneNumber,
  };

  if (!email || !lostItemId) {
    return res.status(400).json({
      message: "Email and lostItemId are required!",
      givenEmail: email,
      givenId: lostItemId,
    });
  }

  try {
    const userIsAdmin = await isAdmin(email);

    let lostItem;
    if (!userIsAdmin) {
      lostItem = await lostItems.findOne({
        _id: lostItemId,
        ownerEmail: email,
      });
      if (!lostItem) {
        return res.status(403).json({
          message: "You do not have permission to edit this lost item.",
        });
      }
    } else {
      lostItem = await lostItems.findById(lostItemId);
      if (!lostItem) {
        return res.status(404).json({
          message: "Lost item not found.",
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
      "ownerNumber",
    ];
    const updateData = {};
    allowedFields.forEach((field) => {
      updateData[field] = updateFields[field];
    });

    const data = await lostItems.updateOne(
      { _id: lostItemId },
      { $set: updateData }
    );

    return res.status(200).json({
      message: "Lost item updated successfully.",
      data: data,
    });
  } catch (error) {
    console.error("Error updating lost item:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete a lost item post by a user
exports.deleteLostItem = async (req, res) => {
  const { email, lostItemId } = req.body;

  if (!email || !lostItemId) {
    return res.status(400).json({
      message: "Email and foundItemId are required!",
    });
  }

  try {
    const userIsAdmin = await isAdmin(email);

    if (!userIsAdmin) {
      const lostItem = await lostItems.findOne({
        _id: lostItemId,
        personEmail: email,
      });
      if (!lostItem) {
        return res.status(403).json({
          message: "No such lost post exist",
        });
      }
    } else {
      const lostItem = await lostItems.findOne({ _id: lostItemId });
      if (!lostItem) {
        return res.status(404).json({
          message: "Lost post not found.",
        });
      }
    }

    await lostItems.deleteOne({ _id: lostItemId });

    await users.updateOne(
      { email: email },
      { $pull: { lostItemsID: new mongoose.Types.ObjectId(lostItemId) } }
    );

    return res.status(200).json({
      message: "Lost item deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting lost item:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// getting profile data
exports.getProfileData = async (req, res) => {
  const { authToken } = req.body;
  if (!authToken) {
    return res.status(400).json({
      message: "Auth token not provided!",
    });
  }
  try {
    const decoded = await jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(400).json({
        message: "Invalid auth token",
      });
    }
    const userId = decoded._id;
    const existingUser = await users.findById(userId);
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found!",
      });
    }
    res.status(200).json({
      profile: existingUser,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

// Getting profile graph
exports.getProfileGraphData = async (req, res) => {
  const { authToken } = req.body;
  if (!authToken) {
    return res.status(400).json({
      message: "Auth token not provided!",
    });
  }
  try {
    // console.log("inside try")
    const decoded = await jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    // console.log(decoded)
    if (!decoded) {
      return res.status(400).json({
        message: "Unable to decode",
      });
    }
    const userId = decoded._id;
    const existingUser = await users.findById(userId);
    // console.log(existingUser)
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found!",
      });
    }
    const foundPostsByAdmins = await foundItems.find({ personStatus: "ADMIN" });
    const lostPostsByAdmins = await lostItems.find({ personStatus: "ADMIN" });
    const totalFoundPosts = (await foundItems.find()).length;
    const totalLostPosts = (await lostItems.find()).length;
    let foundPostsByOtherUsers;
    let lostPostsByOtherUsers;
    if (existingUser.status === "ADMIN") {
      foundPostsByOtherUsers = totalFoundPosts - foundPostsByAdmins.length;
      lostPostsByOtherUsers = totalLostPosts - lostPostsByAdmins.length;
    } else {
      foundPostsByOtherUsers =
        totalFoundPosts -
        foundPostsByAdmins.length -
        existingUser.foundItemsID.length;

      lostPostsByOtherUsers =
        totalLostPosts -
        lostPostsByAdmins.length -
        existingUser.lostItemsID.length;
    }
    return res.status(200).json({
      allPostsData: {
        noOfLostPosts: totalLostPosts,
        noOfFoundPosts: totalFoundPosts,
      },
      foundPostsData: {
        currentUserFoundPosts: existingUser.foundItemsID.length,
        adminFoundPosts: foundPostsByAdmins.length,
        otherUsersFoundPost: foundPostsByOtherUsers,
      },
      lostPostsData: {
        currentUserLostPosts: existingUser.lostItemsID.length,
        adminLostPosts: lostPostsByAdmins.length,
        otherUsersLostPost: lostPostsByOtherUsers,
      },
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

// Geting some graph data to show in the home page of our website
exports.getUserGraphData = async (req, res) => {
  try {
    const totalRegisteredUsers = await users.countDocuments();
    const totalNonRegisteredUsers = await nonRegisteredUser.countDocuments();
    const totalFoundPosts = await foundItems.countDocuments();
    const totalLostPosts = await lostItems.countDocuments();

    return res.status(200).json({
      allUsersData: {
        noOfRegisteredUsers: totalRegisteredUsers,
        noOfNonRegisteredUsers: totalNonRegisteredUsers,
      },
      postsData: {
        noOfLostPosts: totalLostPosts,
        noOfFoundPosts: totalFoundPosts,
      },
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

// API to send email to the admin regarding the contact us message given by a user
exports.userSendsMessage = async (req, res) => {
  const { email, name, message } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Please Enter Your Email" });
  }

  try {
    const mailOptions = {
      from: "vitcseguide@gmail.com",
      to: "vitcseguide@gmail.com",
      subject: `${name} is contacting you regarding some issues`,
      html: `
        <p>A user named <strong>${name}</strong> is trying to contact you through the email <strong>${email}</strong>.</p>
        <p>The message looks as follows:</p>
        <p><strong>${message}</strong></p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
        return res.status(400).json({ message: "Message not sent" });
      } else {
        console.log("Email sent", info.response);
        return res.status(200).json({ message: "Message Sent Successfully" });
      }
    });
  } catch (error) {
    return res.status(400).json({ message: "Invalid details", error });
  }
};

// API to send OTP to a receiver who is trying to collect back his lost item from a person
exports.sendOTPToReceiverOfFoundItem = async (req, res) => {
  const { senderEmail, receiverEmail, foundItemID, receiverName } = req.body;

  if (!senderEmail || !receiverEmail || !foundItemID || !receiverName) {
    return res.status(400).json({ message: "Please enter all input fields" });
  }

  try {
    // First look for the found item
    const foundItem = await foundItems.findOne({
      _id: foundItemID,
      personEmail: senderEmail,
    });

    if (foundItem) {
      // Generating a random OTP
      const OTP = Math.floor(100000 + Math.random() * 900000);
      foundItem.otp = OTP;
      await foundItem.save();

      // Constructing the email content
      const mailOptions = {
        from: "vitcseguide@gmail.com",
        to: receiverEmail,
        subject: "OTP for Item Collection Verification",
        text: `Hello ${receiverName},

The person with email ${senderEmail} is returning your lost item. Here are the details of the item:

Title: ${foundItem.title}
Description: ${foundItem.description}
Location Found: ${foundItem.location}
Date Found: ${new Date(foundItem.date).toLocaleDateString()}

Please use the following OTP to verify your identity and collect the item:

OTP: ${OTP}

Thank you,
Lost & Found Team`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          return res.status(400).json({ message: "Email not sent" });
        } else {
          console.log("Email sent", info.response);
          return res.status(200).json({ message: "Email sent successfully" });
        }
      });
    } else {
      return res.status(400).json({ message: "This found item doesn't exist" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Invalid details", error });
  }
};

// API to verify OTP given by the receiver who is trying to colleck back his lost item from a person
exports.verifyOTPByReceiver = async (req, res) => {
  const {
    otpToVerify,
    senderEmail,
    foundItemID,
    receiverEmail,
    receiverName,
    receiverRegNo,
    receiverPhoneNo,
  } = req.body;

  if (
    !otpToVerify ||
    !senderEmail ||
    !foundItemID ||
    !receiverEmail ||
    !receiverName ||
    !receiverPhoneNo ||
    !receiverRegNo
  ) {
    return res.status(400).json({ message: "Please enter all input fields" });
  }

  try {
    // First look for the found item
    const foundItem = await foundItems.findOne({
      _id: foundItemID,
      personEmail: senderEmail,
    });

    if (foundItem) {
      if (foundItem.otp == otpToVerify) {
        const newReturnedItem = new returnedItems({
          title: foundItem.title,
          itemImage: foundItem.itemImage,
          location: foundItem.location,
          description: foundItem.description,
          personName: foundItem.personName,
          personRegistrationNumber: foundItem.personRegistrationNumber,
          personEmail: foundItem.personEmail,
          personDayScholarORhosteler: foundItem.personDayScholarORhosteler,
          personStatus: foundItem.personStatus,
          personNumber: foundItem.personNumber,
          returnedPersonName: receiverName,
          returnedPersonEmail: receiverEmail,
          returnedPersonRegNo: receiverRegNo,
          returnedPersonPhoneNo: receiverPhoneNo,
        });
        await newReturnedItem.save();

        await foundItems.deleteOne({ _id: foundItemID });

        await users.updateOne(
          { email: senderEmail },
          { $pull: { foundItemsID: new mongoose.Types.ObjectId(foundItemID) } }
        );

        return res.status(200).json({ message: "Item returned successfully" });
      } else {
        return res.status(400).json({ message: "Wrong OTP entered" });
      }
    } else {
      return res.status(400).json({ message: "No such found item exists" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Invalid details", error });
  }
};
