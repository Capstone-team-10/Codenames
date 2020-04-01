const { client, clientSecret, refreshToken } = require("./.secrets.js");
const functions = require("firebase-functions");

// const express = require("express");

// const app = express();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

exports.sendInvite = functions.https.onRequest(async (req, res) => {
  const invite = JSON.parse(req.body);
  try {
    const { friendName, friendEmail, senderName, link, message } = invite;
    let email = `<div>
        <h4>Codenames Invite</h4>
        <p>Hey ${friendName} Your friend ${senderName} wants to invite you to play Codenames</p>
        <a href="https://codenames-3a350.firebaseapp.com/">
        First click here to signup and login</a>
        <p>${message}</p>
        <a href=${link}>Then click here to play with me!</a>
      </div>`;

    const oauth2Client = new google.auth.OAuth2(
      client,
      clientSecret,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: refreshToken
    });

    const accessToken = await oauth2Client.getAccessToken();

    const smtpTransport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "codenamemailer@gmail.com",
        clientId: client,
        clientSecret,
        refreshToken,
        accessToken
      }
    });

    const mailOptions = {
      from: "codenamemailer@gmail.com",
      to: friendEmail,
      subject: `${senderName} wants to play Codenames with you`,
      generateTextFromHTML: true,
      html: email
    };

    await smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.error("smtp error", error);
        res.send(error.message);
      } else {
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
