const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const { sendMail } = require("../controllers/nodeMailerController");


const requestPasswordReset = async (email) => {
  const user = await User.findOne({email});
  if (!user) throw new Error("Email does not exist!");

  //check to see if the user already has an associated token. If they do we delete it
  const token = await Token.findOne({userId: user._id});
  if (token) await token.deleteOne();

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hash = bcrypt.hashSync(
    resetToken,
    bcrypt.genSaltSync(10),
    null
  );

  // const userHash = bcrypt.hashSync(
  //   user._id.toString(),
  //   bcrypt.genSaltSync(10),
  //   null
  // );


  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now()
  }).save();

  const link = `https://reduce-waste.herokuapp.com/passwordReset?token=${resetToken}&id=${user._id.toString()}`;
  sendMail(user.email, "Reduce Waste Password Reset Requested", `<h1>We have received your password reset request</h1><p>The link to reset your password is <a href="${link}" target="_blank">here</a></p> `)

  return link
}

const resetPassword = async (userId, token, newPassword) => {
  const passwordReset = await Token.findOne({userId});

  if (!passwordReset.token){
    throw new Error("Invalid or expired password resest token")
  }

  const isValidToken = bcrypt.compareSync(token, passwordReset.token);
  if (!isValidToken){
    throw new Error("Invalid or expired password reset token");
  }

  const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10), null);
  await User.findByIdAndUpdate(
    {_id: userId},
    { $set: {password: hash} },
    { new: true }
  )

  await passwordReset.deleteOne();

  return true
}

module.exports = {
  requestPasswordReset,
  resetPassword
}