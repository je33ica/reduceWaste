const resetService = require("../utils/resetAuth");

module.exports = {
  sendResetEmail: async (req, res) => {
    try {
      const requestPasswordResetResult = await resetService.requestPasswordReset(req.body.email);
      return res.json(requestPasswordResetResult)
    } catch (error) {
      res.status(400)
      res.send(error)
    }
  },
  resetPassword: async (req, res) => {
    try {
      const resetPasswordResult = await resetService.resetPassword(req.body.userId, req.body.token, req.body.password)
      return res.json(resetPasswordResult)
    } catch (error) {
      res.status(400)
      res.send(error)
    }
  }
}