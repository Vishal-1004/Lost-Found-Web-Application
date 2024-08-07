// Importing models/schemas
const {
  users,
  nonRegisteredUser,
  foundItems,
  lostItems,
} = require("../models");
const jwt = require("jsonwebtoken");

// getting all user data
exports.getAllUsers = async (req, res) => {
  const { email } = req.body;
  const { page = 1, search = "", limit = 5 } = req.query;

  try {
    // Check if the user is an admin
    const adminUser = await users.findOne({ email });
    if (!adminUser || adminUser.status !== "ADMIN") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Set pagination variables
    const skip = (page - 1) * limit;

    // Create the search filter
    const searchFilter = {
      $or: [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ],
    };

    // Find users with pagination and search
    const getUsers = await users
      .find(searchFilter)
      .skip(skip)
      .limit(limit)
      .select("-password -authToken"); // Exclude password and authToken fields

    // Get total user count for pagination
    const totalUsers = await users.countDocuments(searchFilter);

    return res.json({
      getUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      limit: limit,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//change status for registered users
exports.changeStatus = async (req, res) => {
  const { userId, userToken, newStatus } = req.body;
  //console.log(userId, userToken, newStatus);
  try {
    const decoded = await jwt.verify(userToken, process.env.JWT_SECRET_KEY);

    //Checking if admin exists
    const existingAdmin = await users.findById(decoded._id);
    if (!existingAdmin || existingAdmin.status !== "ADMIN") {
      return res.status(400).json({
        message: "Admin not found!",
      });
    }

    //Checking if user exists
    const existingUser = await users.findById(userId);
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    //Checking if user's email is admin's email
    if (existingAdmin.email == existingUser.email) {
      return res.status(400).json({
        message: "Cannot perform operation on self",
      });
    }

    //Checking newStatus
    if (
      newStatus !== "ADMIN" &&
      newStatus !== "USER" &&
      newStatus !== "BLOCKED"
    ) {
      return res.status(400).json({
        message: "Status provided is wrong!",
      });
    }

    //changing status of user
    try {
      const updatingStatus = await users.updateOne(
        { _id: userId },
        { status: newStatus }
      );
      // console.log(updatingStatus)
      const changedUser = await users.findById(userId);
      // console.log(changedUser)
      const updatingStatusInFoundItems = await foundItems.updateMany(
        { personRegistrationNumber: changedUser.registrationNo },
        { personStatus: newStatus }
      );
      const updatingStatusInLostItems = await lostItems.updateMany(
        { personRegistrationNumber: changedUser.registrationNo },
        { personStatus: newStatus }
      );
      // console.log(updatingStatusInFoundItems)
      if (
        updatingStatus.acknowledged &&
        updatingStatusInFoundItems.acknowledged &&
        updatingStatusInLostItems.acknowledged
      ) {
        return res.status(200).json({
          message: "Updated Successfully!",
        });
      } else {
        return res.status(400).json({
          message: "Unable to update in DB!",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: "Unable to update in DB!",
        error: err,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Invalid admin token",
      error: err,
    });
  }
};

//change status for nonRegistered users
exports.changeNonRegisteredUserStatus = async (req, res) => {
  const { nonRegisteredUserId, authToken, newStatus } = req.body;
  try {
    const decoded = await jwt.verify(authToken, process.env.JWT_SECRET_KEY);

    //Checking if admin exists
    const existingAdmin = await users.findById(decoded._id);
    if (!existingAdmin || existingAdmin.status !== "ADMIN") {
      return res.status(400).json({
        message: "Admin not found!",
      });
    }

    //Checking if user exists
    const existingNonRegisteredUser = await nonRegisteredUser.findById(
      nonRegisteredUserId
    );
    if (!existingNonRegisteredUser) {
      return res.status(400).json({
        message: "User not found!",
      });
    }

    //Checking if user's email is admin's email
    if (existingAdmin.email == existingNonRegisteredUser.email) {
      return res.status(400).json({
        message: "Cannot perform operation on self",
      });
    }

    //Checking newStatus
    if (newStatus !== "USER" && newStatus !== "BLOCKED") {
      return res.status(400).json({
        message: "Status provided is wrong!",
      });
    }

    //changing status of user
    try {
      const updatingStatus = await nonRegisteredUser.updateOne(
        { _id: nonRegisteredUserId },
        { status: newStatus }
      );
      if (updatingStatus.acknowledged) {
        return res.status(200).json({
          message: "Updated Successfully!",
        });
      } else {
        return res.status(400).json({
          message: "Unable to update in DB!",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: "Unable to update in DB!",
        error: err,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Invalid admin token",
      error: err,
    });
  }
};

// getAll nonregistered users
exports.allNonRegisteredUsers = async (req, res) => {
  const { authToken } = req.body;
  const { page = 1, search = "", limit = 5 } = req.query;
  try {
    const decoded = await jwt.verify(authToken, process.env.JWT_SECRET_KEY);

    //Checking if admin exists
    const existingAdmin = await users.findById(decoded._id);

    if (!existingAdmin || existingAdmin.status !== "ADMIN") {
      return res.status(400).json({
        message: "Admin not found!",
      });
    }

    //set pagination variables
    const skip = (page - 1) * limit;

    // Create the search filter
    const searchFilter = {
      $or: [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ],
    };

    // Find users with pagination and search
    const nonRegisteredUsers = await nonRegisteredUser
      .find(searchFilter)
      .skip(skip)
      .limit(limit);

    // Get total user count for pagination
    const totalUsers = await nonRegisteredUser.countDocuments(searchFilter);
    if (!nonRegisteredUsers) {
      return res.status(400).json({
        message: "Error fetching data!",
      });
    }

    return res.status(200).json({
      message: "Data fetched successfully!",
      nonRegisteredUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      limit: limit,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error",
    });
  }
};
