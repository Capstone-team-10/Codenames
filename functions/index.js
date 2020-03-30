const functions = require("firebase-functions");
// const express = require("express");

// const app = express();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const cors = require("cors")({
  origin: true
});

exports.sendInvite = functions.https.onRequest((request, response) => {
  const { friendName, friendEmail, senderName, link, message } = req.body;
  response.send("Hello from Firebase!");
  return cors(req, res, () => {
    let email = `<div>
      <h4>Codenames Invite</h4>
      <p>Hey ${friendName} Your friend ${senderName} wants to invite you to play Codenames</p>
      ${message ? `<p>${message}</p>` : ""}
      <a href=${link}>Click here to play!</a>
    </div>`;
    let sesAccessKey = undefined; //sending email address;
    let sesSecretKey = undefined; //password;

    let transporter = nodemailer.createTestAccount(
      smtpTransport({
        service: "gmail",
        auth: {
          user: sesAccessKey,
          pass: sesSecretKey
        }
      })
    );
    const mailOptions = {
      to: friendEmail,
      from: "no-reply@team10.com",
      subject: `${senderName} wants to play Codenames with you`,
      text: email,
      html: email
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error.message);
      }
      res.status(200).send({
        message: "success"
      });
    });
  }).catch(() => {
    res.status(500).send("error");
  });
});
