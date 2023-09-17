
const User = require("../models/User");
const { generateHash } = require("../services/generate_hash");
const { generateToken } = require("../services/generate_token");
const { apiSuccessWithData, apiError, apiValidationErrors } = require("../utils/apiHelpers");

const {
  userExists,
  validateEmail,
  verifyPassword,
} = require("../validations/index");

// User sign-up
exports.signup = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      email,
      password
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(403).json(apiValidationErrors("Email is not valid. Please input the correct email."));
    }

    if (await userExists(email)) {
      return res.status(403).json(apiError(`User with email: '${email}' already exist!`));
    };

    const hashedPassword = await generateHash(password);

    const user = await User.create({
      first_name,
      last_name,
      phone_number,
      email,
      password: hashedPassword,
    });

    return res.status(201).json(apiSuccessWithData("User created successfully", user));

  } catch (error) {
    return res.status(500).json(apiError(error.message));
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(403).json(apiValidationErrors("Email is not valid. Please input the correct email."));
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "You are not registered. Please sign up first!" });
    }

    const result = await verifyPassword(password, user.password);

    if (!result) {
      return res.status(401).json({ message: "Your password is incorrect. Please try again!" });
    }

    const token = generateToken(email, user.id, "1h");

    res.status(200).json(apiSuccessWithData("User Logged in!", { token, user }));

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
