const functions = require("firebase-functions");

// const express = require("express");

// const app = express();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const cors = require("cors")({
  origin: true
});

exports.sendInvite = functions.https.onRequest(async (req, res) => {
  console.log("In sendInvite");
  try {
    const {
      friendName = "AAron",
      friendEmail = "orson108@gmail.com",
      senderName = "Dave",
      link = "http://seemorebutts.com",
      message = "Hi"
    } = req.body;
    // response.send("Hello from Firebase!");
    // return cors(req, res, () => {
    let email = `<div>
        <h4>Codenames Invite</h4>
        <p>Hey ${friendName} Your friend ${senderName} wants to invite you to play Codenames</p>
        <p>${message}</p>
        <a href=${link}>Click here to play!</a>
      </div>`;

    const oauth2Client = new google.auth.OAuth2(
      "632107391975-8p3cnl1a7rq7ma93c9e0la8bif67r4nb.apps.googleusercontent.com",
      "YVrjq1QqD90l_ZXcxgds1hoT",
      "https://developers.google.com/oauthplayground"
    );

    await oauth2Client.setCredentials({
      refreshToken:
        "1//040nQrFR9zJ5TCgYIARAAGAQSNwF-L9IrnTsyKtkifPO5WhC8s9emlJ0aJ50NLjqfq71MC6M0pDOzPhVND0pH344ce9DkPWmO7M8"
    });

    const accessToken = await oauth2Client.getAccessToken();
    console.log("accessToken is now: ", accessToken);

    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "codenamemailer",
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken
      }
    });

    const mailOptions = {
      to: friendEmail,
      from: "no-reply@team10.com",
      subject: `${senderName} wants to play Codenames with you`,
      generateTextFromHTML: true,
      html: email
    };

    await smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.error(error.message);
      } else {
        console.log(response);
        res.status(200).send({
          message: "success"
        });
      }
      smtpTransport.close();
    });
  } catch (error) {
    console.error("ERROR", error.message);
    res.send(`Error: ${error.message}`);
  }
});
// .catch(() => {
//   res.status(500).send("error");
// });
// });

// exports.sendInvite = functions.https.onRequest((request, response) => {
//   const { friendName, friendEmail, senderName, link, message } = req.body;
//   // response.send("Hello from Firebase!");
//   return cors(req, res, () => {
//     let email = `<div>
//       <h4>Codenames Invite</h4>
//       <p>Hey ${friendName} Your friend ${senderName} wants to invite you to play Codenames</p>
//       ${message ? `<p>${message}</p>` : ""}
//       <a href=${link}>Click here to play!</a>
//     </div>`;
//     let sesAccessKey = undefined; //sending email address;
//     let sesSecretKey = undefined; //password;

//     let transporter = nodemailer.createTestAccount(
//       smtpTransport({
//         service: "gmail",
//         auth: {
//           user: sesAccessKey,
//           pass: sesSecretKey
//         }
//       })
//     );

//     const mailOptions = {
//       to: friendEmail,
//       from: "no-reply@team10.com",
//       subject: `${senderName} wants to play Codenames with you`,
//       text: email,
//       html: email
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error.message);
//       }
//       res.status(200).send({
//         message: "success"
//       });
//     });
//   }).catch(() => {
//     res.status(500).send("error");
//   });
// });
