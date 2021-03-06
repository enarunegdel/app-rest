const User = require("../models/User");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");

// register
exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = user.getJsonWebToken();

  res.status(200).json({
    success: true,
    token,
    user: user,
  });
});

// login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Оролт шалгах
  if (!email || !password) {
    throw new MyError("Имэйл болон нууц үгээ дамжуулна уу", 400);
  }

  // Тухайн хэрэглэгчийг хайна
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new MyError("Имэйл болон нууц үгээ дамжуулна уу", 401);
  }

  const ok = await user.checkPassword(password);
  if (!ok) {
    throw new MyError("Имэйл болон нууц үгээ дамжуулна уу", 401);
  }

  res.status(200).json({
    success: true,
    token: user.getJsonWebToken(),
    user: user,
  });
});
