const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();
const gooogleClient = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_OAUTH_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;

const oauth2Client = new OAuth2(
  gooogleClient, // ClientID
  googleSecret, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: refreshToken,
});
const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "hello.reduceWaste@gmail.com",
    clientId: gooogleClient,
    clientSecret: googleSecret,
    refreshToken: refreshToken,
    accessToken: accessToken,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// const mailOptions = {
//   from: "hello.reduceWaste@gmail.com",
//   to: "je331687@gmail.com, rossmci90@hotmail.co.uk",
//   subject: "Node.js Email with Secure OAuth",
//   generateTextFromHTML: true,
//   html: "<b>test</b>",
// };

module.exports = {
  sendMail: (mailOptions) => {
    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? console.log(error) : console.log(response);
      smtpTransport.close();
    });
  },
};
