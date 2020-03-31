const { client, clientSecret, refreshToken } = require("./.secrets.js");
const functions = require("firebase-functions");

// const express = require("express");

// const app = express();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

exports.sendInvite = functions.https.onRequest(async (req, res) => {
  console.log("In sendInvite");
  try {
    const {
      friendName,
      friendEmail,
      senderName,
      link,
      message = "Hi"
    } = req.body;

    let email = `<div>
        <h4>Codenames Invite</h4>
        <p>Hey ${friendName} Your friend ${senderName} wants to invite you to play Codenames</p>
        <p>${message}</p>
        <a href=${link}>Click here to play!</a>
      </div>`;

    const oauth2Client = new google.auth.OAuth2(
      client,
      clientSecret,
      "https://developers.google.com/oauthplayground"
    );

    await oauth2Client.setCredentials({
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
        console.log(response);
        res.status(200).send({
          message: "success"
        });
      }
      smtpTransport.close();
    });
    console.log("after smtpTransport");
  } catch (error) {
    console.error("ERROR", error.message);
    res.send(`Error: ${error.message}`);
  }
});
