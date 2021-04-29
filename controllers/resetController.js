const resetService = require("../utils/resetAuth");

module.exports = {
  sendResetEmail: async (req, res) => {
    const requestPasswordResetResult = await resetService.requestPasswordReset(req.body.email);
    return res.json(requestPasswordResetResult)
  } 
}