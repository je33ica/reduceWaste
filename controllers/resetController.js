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

  } 
}