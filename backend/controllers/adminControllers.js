// Importing models/schemas
const { users } = require("../models");

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
