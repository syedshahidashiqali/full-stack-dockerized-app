const User = require("../models/User");
const { apiSuccessWithData, apiError } = require("../utils/apiHelpers");

exports.getMyProfile = async (req, res) => {
  try {
    let email = req.user.email;

    const user = await User.findOne({ where: { email } });

    res.status(200).json(apiSuccessWithData("My Profile", user));

  } catch (err) {
    res.status(500).json(apiError(err.message));
  }
};